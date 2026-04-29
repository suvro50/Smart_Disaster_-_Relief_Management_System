CREATE DATABASE IF NOT EXISTS smart_disaster_db;
USE smart_disaster_db;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('super_admin','relief_manager','rescue_team','volunteer','public') DEFAULT 'public',
  phone VARCHAR(20),
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8),
  district VARCHAR(100),
  profile_image VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS disasters (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  type ENUM('flood','earthquake','cyclone','fire','landslide','drought','tsunami','other') NOT NULL,
  severity ENUM('low','medium','high','critical') NOT NULL,
  status ENUM('active','monitoring','resolved','false_alarm') DEFAULT 'active',
  description TEXT,
  location_lat DECIMAL(10,8) NOT NULL,
  location_lng DECIMAL(11,8) NOT NULL,
  affected_area VARCHAR(200),
  district VARCHAR(100),
  affected_population INT DEFAULT 0,
  casualties INT DEFAULT 0,
  injuries INT DEFAULT 0,
  reported_by INT,
  verified_by INT,
  image_url VARCHAR(255),
  started_at TIMESTAMP NULL,
  ended_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (reported_by) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS aid_requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  disaster_id INT,
  victim_id INT,
  request_type ENUM('food','water','medicine','shelter','rescue','clothing','other') NOT NULL,
  urgency ENUM('low','medium','high','critical') DEFAULT 'medium',
  status ENUM('pending','assigned','in_progress','completed','cancelled') DEFAULT 'pending',
  description TEXT,
  people_count INT DEFAULT 1,
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8),
  address TEXT,
  assigned_team_id INT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (disaster_id) REFERENCES disasters(id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (victim_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS rescue_teams (
  id INT PRIMARY KEY AUTO_INCREMENT,
  team_name VARCHAR(100) NOT NULL,
  leader_id INT,
  team_type ENUM('search_rescue','medical','fire','logistics','water_rescue') NOT NULL,
  capacity INT DEFAULT 10,
  current_members INT DEFAULT 0,
  status ENUM('available','deployed','standby','off_duty') DEFAULT 'available',
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8),
  base_district VARCHAR(100),
  contact_number VARCHAR(20),
  equipment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (leader_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS resources (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  category ENUM('food','water','medicine','shelter','equipment','vehicle','clothing') NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  unit VARCHAR(50),
  location VARCHAR(200),
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8),
  warehouse_name VARCHAR(100),
  district VARCHAR(100),
  expiry_date DATE,
  minimum_stock INT DEFAULT 10,
  managed_by INT,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (managed_by) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS alerts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  disaster_id INT,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  alert_type ENUM('warning','evacuation','shelter','all_clear','update','critical') NOT NULL,
  severity ENUM('info','warning','danger','critical') DEFAULT 'warning',
  target_district VARCHAR(100),
  is_broadcast BOOLEAN DEFAULT FALSE,
  sent_by INT,
  sent_via JSON,
  is_active BOOLEAN DEFAULT TRUE,
  expires_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (disaster_id) REFERENCES disasters(id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (sent_by) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS evacuation_zones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  disaster_id INT,
  zone_name VARCHAR(100) NOT NULL,
  zone_type ENUM('danger','warning','safe','shelter') NOT NULL,
  boundary_coordinates JSON NOT NULL,
  population_affected INT DEFAULT 0,
  shelter_capacity INT DEFAULT 0,
  evacuation_route TEXT,
  shelter_location VARCHAR(200),
  status ENUM('active','inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (disaster_id) REFERENCES disasters(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS volunteers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  skills TEXT,
  availability ENUM('full_time','part_time','on_call') DEFAULT 'on_call',
  is_trained BOOLEAN DEFAULT FALSE,
  training_date DATE,
  assigned_team_id INT,
  status ENUM('active','inactive','deployed') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (assigned_team_id) REFERENCES rescue_teams(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  report_type ENUM('incident','damage_assessment','resource_usage','response_summary','monthly') NOT NULL,
  disaster_id INT,
  content TEXT,
  file_url VARCHAR(255),
  generated_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (disaster_id) REFERENCES disasters(id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (generated_by) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS rescue_team_disasters (
  rescue_team_id INT NOT NULL,
  disaster_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (rescue_team_id, disaster_id),
  FOREIGN KEY (rescue_team_id) REFERENCES rescue_teams(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (disaster_id) REFERENCES disasters(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS resource_allocations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  resource_id INT NOT NULL,
  disaster_id INT NOT NULL,
  quantity_allocated INT NOT NULL,
  allocated_by INT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (disaster_id) REFERENCES disasters(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (allocated_by) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
);