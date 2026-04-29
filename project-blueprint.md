# 🚨 Smart Disaster & Relief Management System
## Complete Project Structure + Cursor Master Prompt

---

## 🗂️ FULL PROJECT FOLDER STRUCTURE

```
smart-disaster-relief/
│
├── 📁 backend/
│   ├── 📁 src/
│   │   ├── 📁 config/
│   │   │   ├── database.js          # MySQL Sequelize connection
│   │   │   ├── socket.js            # Socket.io configuration
│   │   │   └── env.js               # Environment variables loader
│   │   │
│   │   ├── 📁 models/               # Sequelize MySQL Models
│   │   │   ├── User.js              # users table
│   │   │   ├── Disaster.js          # disasters table
│   │   │   ├── AidRequest.js        # aid_requests table
│   │   │   ├── RescueTeam.js        # rescue_teams table
│   │   │   ├── Resource.js          # resources table
│   │   │   ├── Alert.js             # alerts table
│   │   │   ├── EvacuationZone.js    # evacuation_zones table
│   │   │   ├── Volunteer.js         # volunteers table
│   │   │   ├── Report.js            # reports table
│   │   │   └── index.js             # Model associations
│   │   │
│   │   ├── 📁 controllers/
│   │   │   ├── authController.js    # Login, register, JWT
│   │   │   ├── disasterController.js
│   │   │   ├── aidController.js
│   │   │   ├── rescueController.js
│   │   │   ├── resourceController.js
│   │   │   ├── alertController.js
│   │   │   ├── evacuationController.js
│   │   │   ├── volunteerController.js
│   │   │   ├── reportController.js
│   │   │   ├── dashboardController.js
│   │   │   └── weatherController.js # OpenWeather API proxy
│   │   │
│   │   ├── 📁 routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── disaster.routes.js
│   │   │   ├── aid.routes.js
│   │   │   ├── rescue.routes.js
│   │   │   ├── resource.routes.js
│   │   │   ├── alert.routes.js
│   │   │   ├── evacuation.routes.js
│   │   │   ├── volunteer.routes.js
│   │   │   ├── report.routes.js
│   │   │   ├── dashboard.routes.js
│   │   │   └── weather.routes.js
│   │   │
│   │   ├── 📁 middleware/
│   │   │   ├── auth.middleware.js   # JWT verification
│   │   │   ├── role.middleware.js   # Role-based access (admin/rescue/public)
│   │   │   ├── validate.middleware.js # Input validation
│   │   │   ├── upload.middleware.js # Multer for image uploads
│   │   │   └── logger.middleware.js # Request logging
│   │   │
│   │   ├── 📁 services/
│   │   │   ├── emailService.js      # Nodemailer alerts
│   │   │   ├── smsService.js        # SMS via Twilio
│   │   │   ├── socketService.js     # Real-time broadcasts
│   │   │   ├── weatherService.js    # OpenWeather API
│   │   │   ├── pdfService.js        # PDF report generation
│   │   │   └── aiPredictService.js  # Disaster risk scoring
│   │   │
│   │   ├── 📁 utils/
│   │   │   ├── response.js          # Standard API response format
│   │   │   ├── geocode.js           # Lat/lng helpers
│   │   │   ├── severityScore.js     # Auto-calculate disaster severity
│   │   │   └── dateHelper.js
│   │   │
│   │   └── app.js                   # Express app setup
│   │
│   ├── 📁 migrations/               # Sequelize DB migrations
│   │   ├── 001-create-users.js
│   │   ├── 002-create-disasters.js
│   │   ├── 003-create-aid-requests.js
│   │   ├── 004-create-rescue-teams.js
│   │   ├── 005-create-resources.js
│   │   ├── 006-create-alerts.js
│   │   ├── 007-create-evacuation-zones.js
│   │   └── 008-create-volunteers.js
│   │
│   ├── 📁 seeders/                  # Sample data for testing
│   │   ├── seed-users.js
│   │   ├── seed-disasters.js
│   │   └── seed-resources.js
│   │
│   ├── 📁 uploads/                  # Uploaded images/docs
│   ├── server.js                    # Entry point
│   ├── .env                         # Environment variables
│   ├── .env.example
│   └── package.json
│
├── 📁 frontend/
│   ├── 📁 public/
│   │   ├── favicon.ico
│   │   └── disaster-bg.mp4          # Live wallpaper video background
│   │
│   ├── 📁 src/
│   │   ├── 📁 assets/
│   │   │   ├── 📁 images/
│   │   │   ├── 📁 animations/       # Lottie JSON files
│   │   │   └── 📁 sounds/           # Alert sounds
│   │   │
│   │   ├── 📁 components/
│   │   │   ├── 📁 layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── LiveBackground.jsx  # Animated/video wallpaper
│   │   │   │
│   │   │   ├── 📁 dashboard/
│   │   │   │   ├── StatsCard.jsx       # Animated counter cards
│   │   │   │   ├── DisasterHeatmap.jsx # Leaflet heatmap overlay
│   │   │   │   ├── ActiveAlertBanner.jsx
│   │   │   │   ├── WeatherWidget.jsx
│   │   │   │   ├── ResourceGauge.jsx   # Animated gauge charts
│   │   │   │   └── LiveFeedTicker.jsx  # Scrolling live updates
│   │   │   │
│   │   │   ├── 📁 map/
│   │   │   │   ├── DisasterMap.jsx     # Main Leaflet map
│   │   │   │   ├── MapMarker.jsx       # Custom disaster markers
│   │   │   │   ├── EvacuationLayer.jsx
│   │   │   │   └── ZonePolygon.jsx
│   │   │   │
│   │   │   ├── 📁 alerts/
│   │   │   │   ├── AlertToast.jsx      # Real-time popup alerts
│   │   │   │   ├── AlertList.jsx
│   │   │   │   ├── SeverityBadge.jsx
│   │   │   │   └── SoundAlert.jsx
│   │   │   │
│   │   │   ├── 📁 forms/
│   │   │   │   ├── DisasterReportForm.jsx
│   │   │   │   ├── AidRequestForm.jsx
│   │   │   │   ├── VolunteerForm.jsx
│   │   │   │   └── ResourceForm.jsx
│   │   │   │
│   │   │   └── 📁 ui/
│   │   │       ├── Button.jsx
│   │   │       ├── Modal.jsx
│   │   │       ├── Table.jsx
│   │   │       ├── Badge.jsx
│   │   │       ├── Loader.jsx
│   │   │       └── ConfirmDialog.jsx
│   │   │
│   │   ├── 📁 pages/
│   │   │   ├── 📁 public/            # No login needed
│   │   │   │   ├── Landing.jsx       # Stunning landing page
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── PublicMap.jsx     # Anyone can see disasters
│   │   │   │   └── ReportDisaster.jsx # Public reporting
│   │   │   │
│   │   │   ├── 📁 admin/
│   │   │   │   ├── Dashboard.jsx     # Main live dashboard
│   │   │   │   ├── DisasterManager.jsx
│   │   │   │   ├── RescueManager.jsx
│   │   │   │   ├── ResourceManager.jsx
│   │   │   │   ├── UserManager.jsx
│   │   │   │   ├── AlertManager.jsx
│   │   │   │   ├── EvacuationManager.jsx
│   │   │   │   └── Reports.jsx
│   │   │   │
│   │   │   ├── 📁 rescue/
│   │   │   │   ├── RescueDashboard.jsx
│   │   │   │   ├── MyMissions.jsx
│   │   │   │   └── ResourceRequest.jsx
│   │   │   │
│   │   │   └── 📁 victim/
│   │   │       ├── RequestHelp.jsx
│   │   │       ├── TrackRequest.jsx
│   │   │       └── SafetyInfo.jsx
│   │   │
│   │   ├── 📁 hooks/
│   │   │   ├── useSocket.js          # Real-time socket connection
│   │   │   ├── useAuth.js
│   │   │   ├── useDisasters.js
│   │   │   └── useWeather.js
│   │   │
│   │   ├── 📁 context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── SocketContext.jsx
│   │   │   └── AlertContext.jsx
│   │   │
│   │   ├── 📁 services/             # API call functions
│   │   │   ├── api.js               # Axios instance
│   │   │   ├── authService.js
│   │   │   ├── disasterService.js
│   │   │   ├── aidService.js
│   │   │   ├── rescueService.js
│   │   │   └── weatherService.js
│   │   │
│   │   ├── 📁 store/                # Redux Toolkit
│   │   │   ├── index.js
│   │   │   ├── 📁 slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── disasterSlice.js
│   │   │   │   ├── alertSlice.js
│   │   │   │   └── resourceSlice.js
│   │   │
│   │   ├── 📁 utils/
│   │   │   ├── constants.js
│   │   │   ├── formatters.js
│   │   │   └── disasterIcons.js     # Custom SVG icon map
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css                # Global styles + animations
│   │
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── 📁 database/
│   ├── schema.sql                   # Full MySQL schema
│   ├── seed_data.sql                # Sample disaster data
│   └── stored_procedures.sql        # MySQL stored procs
│
├── 📁 docs/
│   ├── API_DOCUMENTATION.md
│   ├── ER_DIAGRAM.png
│   └── SYSTEM_DESIGN.md
│
├── docker-compose.yml               # Optional: run with Docker
├── .gitignore
└── README.md
```

---

## 🗄️ MYSQL DATABASE SCHEMA

```sql
-- Paste this in schema.sql

CREATE DATABASE IF NOT EXISTS smart_disaster_db;
USE smart_disaster_db;

CREATE TABLE users (
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
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE disasters (
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
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (reported_by) REFERENCES users(id),
  FOREIGN KEY (verified_by) REFERENCES users(id)
);

CREATE TABLE aid_requests (
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
  FOREIGN KEY (disaster_id) REFERENCES disasters(id),
  FOREIGN KEY (victim_id) REFERENCES users(id)
);

CREATE TABLE rescue_teams (
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
  FOREIGN KEY (leader_id) REFERENCES users(id)
);

CREATE TABLE resources (
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
  FOREIGN KEY (managed_by) REFERENCES users(id)
);

CREATE TABLE alerts (
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
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (disaster_id) REFERENCES disasters(id),
  FOREIGN KEY (sent_by) REFERENCES users(id)
);

CREATE TABLE evacuation_zones (
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
  FOREIGN KEY (disaster_id) REFERENCES disasters(id)
);

CREATE TABLE volunteers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  skills TEXT,
  availability ENUM('full_time','part_time','on_call') DEFAULT 'on_call',
  is_trained BOOLEAN DEFAULT FALSE,
  training_date DATE,
  assigned_team_id INT,
  status ENUM('active','inactive','deployed') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (assigned_team_id) REFERENCES rescue_teams(id)
);

CREATE TABLE reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  report_type ENUM('incident','damage_assessment','resource_usage','response_summary','monthly') NOT NULL,
  disaster_id INT,
  content TEXT,
  file_url VARCHAR(255),
  generated_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (disaster_id) REFERENCES disasters(id),
  FOREIGN KEY (generated_by) REFERENCES users(id)
);
```

---

## 🚀 CURSOR MASTER PROMPT
### (Copy this ENTIRE text and paste it into Cursor Chat)

```
You are an expert full-stack developer. Build a complete, production-ready web application called "Smart Disaster & Relief Management System" using the following EXACT tech stack and folder structure. Write ALL the code — every file, every function, every component. Make it 100% working.

=== TECH STACK ===
- Backend: Node.js + Express.js
- Database: MySQL 8.0 with Sequelize ORM
- Frontend: React.js + Vite
- Real-time: Socket.io
- State management: Redux Toolkit
- Maps: Leaflet.js + react-leaflet
- Charts: Recharts
- Animations: Framer Motion + GSAP
- Styling: Tailwind CSS + custom CSS animations
- Auth: JWT (jsonwebtoken + bcryptjs)
- HTTP client: Axios
- PDF: pdfkit or puppeteer
- Email: Nodemailer
- File upload: Multer
- Validation: express-validator
- Weather: OpenWeatherMap API (free tier)

=== KEY FEATURES TO BUILD (ALL MUST WORK) ===

1. LIVE ANIMATED DASHBOARD
   - Full-screen animated background (CSS particle system or Three.js globe showing disaster points)
   - Animated stats cards: total disasters, active rescues, aid delivered, lives saved
   - Real-time activity feed ticker scrolling at the bottom
   - Disaster severity donut chart
   - Resource stock bar charts
   - All data updates via Socket.io without page refresh

2. INTERACTIVE DISASTER MAP
   - Leaflet.js map with custom markers per disaster type (flood=blue, fire=red, earthquake=orange, etc.)
   - Heatmap overlay of affected areas
   - Evacuation zone polygons (color-coded: red=danger, yellow=warning, green=safe)
   - Rescue team location markers
   - Resource warehouse markers
   - Click any marker → popup with full disaster details + action buttons
   - Layer toggle controls

3. REAL-TIME ALERT SYSTEM
   - Socket.io broadcasts alerts to ALL connected clients instantly
   - Toast notifications pop up with sound effect
   - Alert severity levels: info, warning, danger, critical (different colors/sounds)
   - Broadcast to specific district OR all users
   - Alert history with read/unread status

4. AID REQUEST SYSTEM
   - Public can submit aid requests without login
   - Request types: food, water, medicine, shelter, rescue, clothing
   - Urgency levels with color coding
   - Admin assigns requests to rescue teams
   - Victim gets status updates via socket
   - Track request status: pending → assigned → in_progress → completed

5. RESCUE TEAM MANAGEMENT
   - Create/manage rescue teams with team members
   - Assign teams to disasters
   - Track team location on map (update location every 30 seconds)
   - Team status: available, deployed, standby
   - Mission history per team

6. RESOURCE MANAGEMENT
   - Track food, water, medicine, shelter, equipment inventory
   - Low stock alerts (automatic when below minimum)
   - Allocate resources to disasters
   - Resource usage history
   - Stock level gauges with animated charts

7. EVACUATION ZONE MANAGER
   - Draw zones on map (polygon drawing tool)
   - Color-coded zone types
   - Affected population count
   - Evacuation route instructions
   - Shelter capacity tracking

8. VOLUNTEER REGISTRATION
   - Public volunteer signup form
   - Skills, availability, district
   - Admin approves volunteers
   - Assign volunteers to teams

9. REPORT GENERATION
   - Generate PDF reports: incident reports, damage assessments, resource usage
   - Charts included in PDF
   - Download as PDF or export as CSV
   - Monthly summary reports

10. WEATHER WIDGET
    - OpenWeatherMap API integration
    - Show weather for disaster-affected areas
    - Storm/flood risk indicator

=== USER ROLES & PERMISSIONS ===
- super_admin: Full access to everything
- relief_manager: Manage disasters, resources, alerts, reports
- rescue_team: View missions, update status, request resources
- volunteer: View assignments, update availability
- public: Submit aid requests, report disasters, view public map

=== LIVE WALLPAPER DASHBOARD SPECIFICATIONS ===
The main admin dashboard MUST have:
- Animated dark background with floating particles (use tsParticles or custom canvas)
- Particles should be red/orange for "danger" theme
- Glassmorphism UI cards (backdrop-filter: blur)
- Neon glow effects on critical alert indicators
- Smooth number counter animations when stats load
- Pulsing red dot on active disaster count
- Gradient text on headings (red → orange)
- Dark theme: background #0a0a0f, cards rgba(255,255,255,0.05)

=== DATABASE ===
MySQL only. Use Sequelize ORM.
All models with full associations:
- User hasMany AidRequests, hasMany Reports
- Disaster hasMany AidRequests, hasMany Alerts, hasMany EvacuationZones
- RescueTeam hasMany Volunteers, belongsToMany Disasters
- Resource belongsTo User (managed_by)

=== API STRUCTURE ===
Base URL: /api/v1

Routes:
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/auth/me

GET    /api/v1/disasters          (with filters: type, severity, status, district)
POST   /api/v1/disasters
PUT    /api/v1/disasters/:id
DELETE /api/v1/disasters/:id
GET    /api/v1/disasters/:id/stats

GET    /api/v1/aid-requests
POST   /api/v1/aid-requests       (public, no auth)
PUT    /api/v1/aid-requests/:id
DELETE /api/v1/aid-requests/:id

GET    /api/v1/rescue-teams
POST   /api/v1/rescue-teams
PUT    /api/v1/rescue-teams/:id
POST   /api/v1/rescue-teams/:id/assign/:disasterId

GET    /api/v1/resources
POST   /api/v1/resources
PUT    /api/v1/resources/:id
GET    /api/v1/resources/low-stock

POST   /api/v1/alerts
GET    /api/v1/alerts
PUT    /api/v1/alerts/:id/deactivate

GET    /api/v1/dashboard/stats     (total disasters, active, resolved, etc.)
GET    /api/v1/dashboard/live-feed (last 20 events)

GET    /api/v1/weather/:district

=== SOCKET.IO EVENTS ===
Server emits:
- 'new_disaster'     → all clients
- 'disaster_updated' → all clients
- 'new_alert'        → all clients + target district room
- 'aid_request_update' → victim's socket room
- 'resource_low'     → admin room
- 'team_location_update' → admin room

Client emits:
- 'join_district'    → join district room
- 'team_location'    → rescue team sends GPS coords

=== START BUILDING IN THIS ORDER ===
1. backend/.env and package.json (install all dependencies)
2. backend/src/config/database.js (MySQL connection)
3. backend/src/models/ (all 8 models with associations)
4. database/schema.sql (complete SQL)
5. backend/src/middleware/ (auth, role, validate)
6. backend/src/controllers/ (all controllers)
7. backend/src/routes/ (all routes)
8. backend/src/services/ (socket, email, weather)
9. backend/server.js (main entry)
10. frontend/package.json (all dependencies)
11. frontend/src/store/ (Redux setup)
12. frontend/src/context/ (Auth, Socket contexts)
13. frontend/src/services/ (API calls)
14. frontend/src/components/ (all reusable components)
15. frontend/src/pages/ (all pages)
16. frontend/src/App.jsx (routes setup)
17. database/seed_data.sql (sample data)

Write COMPLETE files. No placeholders. No "TODO" comments. Every function must be fully implemented. 

After writing all files, give me the commands to:
1. Install all dependencies
2. Set up the MySQL database
3. Run the backend
4. Run the frontend
5. Access the app

Default admin credentials to seed: admin@disaster.com / Admin@123
```

---

## ⚡ QUICK START COMMANDS

After Cursor writes all the code, run these:

```bash
# 1. Setup MySQL database
mysql -u root -p < database/schema.sql
mysql -u root -p smart_disaster_db < database/seed_data.sql

# 2. Backend setup
cd backend
npm install
cp .env.example .env
# Fill in your MySQL credentials in .env
npm run migrate
npm run dev

# 3. Frontend setup (new terminal)
cd frontend
npm install
npm run dev

# 4. Open browser
# Frontend: http://localhost:5173
# Backend API: http://localhost:5000
# Admin login: admin@disaster.com / Admin@123
```

---

## 🌟 UNIQUE WOW FEATURES SUMMARY

| Feature | Why It's Amazing |
|---------|-----------------|
| Live particle dashboard | Animated danger-theme background, glassmorphism cards |
| Real-time alerts | Socket.io — 0 delay, with sound notifications |
| Interactive heatmap | See disaster hotspots visually on Leaflet map |
| AI risk scoring | Auto-calculates disaster severity from inputs |
| Multi-role system | 5 different user experiences in one app |
| Live team tracking | Rescue teams broadcast GPS every 30 seconds |
| PDF report generation | One-click professional reports with charts |
| Weather integration | Live weather for disaster zones |
| Public reporting | Anyone can report a disaster — no login needed |
| Evacuation zone drawing | Draw danger zones directly on the map |