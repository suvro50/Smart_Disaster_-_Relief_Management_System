-- Stored Procedures for Smart Disaster & Relief Management System
-- Run after schema.sql and seed_data.sql

DELIMITER //

-- 1. Get dashboard statistics
CREATE PROCEDURE IF NOT EXISTS sp_get_dashboard_stats()
BEGIN
    SELECT
        (SELECT COUNT(*) FROM disasters WHERE status = 'active') AS active_disasters,
        (SELECT COUNT(*) FROM disasters) AS total_disasters,
        (SELECT COUNT(*) FROM alerts WHERE is_active = 1) AS active_alerts,
        (SELECT COUNT(*) FROM alerts WHERE is_active = 1 AND severity = 'critical') AS critical_alerts,
        (SELECT COUNT(*) FROM aid_requests WHERE status = 'pending') AS pending_requests,
        (SELECT COUNT(*) FROM aid_requests WHERE status = 'in_progress') AS in_progress_requests,
        (SELECT COUNT(*) FROM rescue_teams WHERE status = 'available') AS available_teams,
        (SELECT COUNT(*) FROM rescue_teams WHERE status = 'deployed') AS deployed_teams,
        (SELECT COUNT(*) FROM resources WHERE status = 'depleted') AS depleted_resources,
        (SELECT COUNT(*) FROM resources WHERE status = 'low_stock') AS low_stock_resources,
        (SELECT COUNT(*) FROM volunteers WHERE status = 'approved') AS approved_volunteers,
        (SELECT COUNT(*) FROM evacuation_zones WHERE is_active = 1) AS active_evacuation_zones;
END //

-- 2. Get disasters by district
CREATE PROCEDURE IF NOT EXISTS sp_get_disasters_by_district(IN p_district VARCHAR(100))
BEGIN
    SELECT id, title, type, severity, status, affected_population, casualties, injuries,
           location_lat, location_lng, started_at, created_at
    FROM disasters
    WHERE district = p_district
    ORDER BY
        FIELD(severity, 'critical', 'high', 'medium', 'low'),
        FIELD(status, 'active', 'monitoring', 'resolved', 'false_alarm'),
        created_at DESC;
END //

-- 3. Get active alerts for a district
CREATE PROCEDURE IF NOT EXISTS sp_get_active_alerts_by_district(IN p_district VARCHAR(100))
BEGIN
    SELECT id, title, message, severity, alert_type, district, expires_at, created_at
    FROM alerts
    WHERE district = p_district AND is_active = 1
    ORDER BY FIELD(severity, 'critical', 'high', 'medium', 'low'), created_at DESC;
END //

-- 4. Auto-deactivate expired alerts
CREATE PROCEDURE IF NOT EXISTS sp_deactivate_expired_alerts()
BEGIN
    UPDATE alerts
    SET is_active = 0, updated_at = NOW()
    WHERE is_active = 1 AND expires_at < NOW();

    SELECT ROW_COUNT() AS deactivated_count;
END //

-- 5. Get resource inventory summary
CREATE PROCEDURE IF NOT EXISTS sp_get_resource_summary()
BEGIN
    SELECT
        category,
        COUNT(*) AS item_count,
        SUM(quantity) AS total_quantity,
        SUM(CASE WHEN status = 'available' THEN quantity ELSE 0 END) AS available_quantity,
        SUM(CASE WHEN status = 'low_stock' THEN quantity ELSE 0 END) AS low_stock_quantity,
        SUM(CASE WHEN status = 'depleted' THEN 1 ELSE 0 END) AS depleted_items
    FROM resources
    GROUP BY category
    ORDER BY total_quantity DESC;
END //

-- 6. Get resource low stock rate
CREATE PROCEDURE IF NOT EXISTS sp_get_low_stock_rate(OUT p_rate DECIMAL(5,2))
BEGIN
    DECLARE total_items INT;
    DECLARE low_or_depleted INT;

    SELECT COUNT(*) INTO total_items FROM resources;
    SELECT COUNT(*) INTO low_or_depleted FROM resources WHERE status IN ('low_stock', 'depleted');

    IF total_items > 0 THEN
        SET p_rate = (low_or_depleted / total_items) * 100;
    ELSE
        SET p_rate = 0;
    END IF;
END //

-- 7. Assign rescue team to aid request
CREATE PROCEDURE IF NOT EXISTS sp_assign_rescue_team(
    IN p_request_id INT,
    IN p_team_id INT
)
BEGIN
    DECLARE v_district VARCHAR(100);

    START TRANSACTION;

    -- Update aid request
    UPDATE aid_requests
    SET assigned_team = p_team_id, status = 'assigned', updated_at = NOW()
    WHERE id = p_request_id AND status = 'pending';

    -- Update rescue team status
    UPDATE rescue_teams
    SET status = 'deployed', updated_at = NOW()
    WHERE id = p_team_id AND status = 'available';

    COMMIT;

    SELECT
        ar.id AS request_id,
        ar.status AS request_status,
        rt.name AS team_name,
        rt.status AS team_status
    FROM aid_requests ar
    JOIN rescue_teams rt ON rt.id = p_team_id
    WHERE ar.id = p_request_id;
END //

-- 8. Complete rescue mission
CREATE PROCEDURE IF NOT EXISTS sp_complete_mission(
    IN p_request_id INT,
    IN p_team_id INT
)
BEGIN
    START TRANSACTION;

    UPDATE aid_requests SET status = 'completed', updated_at = NOW() WHERE id = p_request_id;
    UPDATE rescue_teams SET status = 'available', updated_at = NOW() WHERE id = p_team_id;

    COMMIT;

    SELECT 'Mission completed successfully' AS message;
END //

-- 9. Get disaster impact summary
CREATE PROCEDURE IF NOT EXISTS sp_get_disaster_impact(IN p_disaster_id INT)
BEGIN
    SELECT
        d.title,
        d.type,
        d.severity,
        d.status,
        d.affected_population,
        d.casualties,
        d.injuries,
        (SELECT COUNT(*) FROM aid_requests WHERE disaster_id = p_disaster_id) AS aid_requests_count,
        (SELECT COUNT(*) FROM aid_requests WHERE disaster_id = p_disaster_id AND status = 'pending') AS pending_aid,
        (SELECT COUNT(*) FROM aid_requests WHERE disaster_id = p_disaster_id AND status = 'completed') AS completed_aid,
        (SELECT COUNT(*) FROM evacuation_zones WHERE district = d.district AND is_active = 1) AS evacuation_zones_count
    FROM disasters d
    WHERE d.id = p_disaster_id;
END //

-- 10. Allocate resource to disaster
CREATE PROCEDURE IF NOT EXISTS sp_allocate_resource(
    IN p_resource_id INT,
    IN p_disaster_id INT,
    IN p_quantity INT,
    IN p_allocated_by INT
)
BEGIN
    DECLARE v_available INT;

    SELECT quantity INTO v_available FROM resources WHERE id = p_resource_id;

    IF v_available >= p_quantity THEN
        START TRANSACTION;

        INSERT INTO resource_allocations (resource_id, disaster_id, quantity, allocated_by, created_at, updated_at)
        VALUES (p_resource_id, p_disaster_id, p_quantity, p_allocated_by, NOW(), NOW());

        UPDATE resources
        SET quantity = quantity - p_quantity,
            status = CASE
                WHEN quantity - p_quantity = 0 THEN 'depleted'
                WHEN quantity - p_quantity < 10 THEN 'low_stock'
                ELSE status
            END,
            updated_at = NOW()
        WHERE id = p_resource_id;

        COMMIT;
        SELECT 'Resource allocated successfully' AS message;
    ELSE
        SELECT CONCAT('Insufficient stock. Available: ', v_available) AS error;
    END IF;
END //

DELIMITER ;
