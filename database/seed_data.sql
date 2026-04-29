USE smart_disaster_db;

INSERT INTO users (full_name, email, password_hash, role, phone, district, is_active)
VALUES
  ('System Admin', 'admin@disaster.com', '$2a$12$k15A2gokN8L8YjWv2cew0Om0aDjlQ8nPYd.KQAn24fYLPAhYxQF5e', 'super_admin', '+8801000000000', 'Dhaka', 1)
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), role = VALUES(role), is_active = VALUES(is_active);

INSERT INTO disasters (title, type, severity, status, description, location_lat, location_lng, district, affected_population, casualties, injuries, reported_by)
SELECT 'Jamuna River Flood Alert', 'flood', 'high', 'active', 'Heavy monsoon flooding affecting low-lying villages.', 24.3745, 89.6789, 'Sirajganj', 12000, 4, 35, u.id
FROM users u
WHERE u.email = 'admin@disaster.com'
LIMIT 1;

INSERT INTO resources (name, category, quantity, unit, location, warehouse_name, district, minimum_stock, managed_by)
SELECT 'Drinking Water Bottles', 'water', 5000, 'bottles', 'Central Storage A', 'Main Warehouse', 'Dhaka', 1000, u.id
FROM users u
WHERE u.email = 'admin@disaster.com'
LIMIT 1;
