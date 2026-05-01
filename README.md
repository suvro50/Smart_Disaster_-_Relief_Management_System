# Smart Disaster & Relief Management System

A full-stack real-time disaster monitoring, alert, and rescue coordination platform built for Bangladesh's disaster-prone regions.

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Frontend | React 18, Vite, Tailwind CSS, React Router, Redux Toolkit |
| Maps | React-Leaflet, OpenStreetMap |
| Charts | Recharts (Donut, Bar, Radial Gauge) |
| Animations | Framer Motion, GSAP |
| Backend | Node.js, Express 4, Sequelize ORM |
| Database | MySQL 8 |
| Real-time | Socket.IO |
| Auth | JWT, bcryptjs |
| PDF | PDFKit |
| AI Risk | Custom prediction service |
| Weather | OpenWeatherMap API |
| Infra | Docker, Nginx |

## Features

- **Real-time Dashboard** — Live disaster map, animated stats counters, severity donut chart, resource bar chart, weather widget, AI risk spotlight
- **Disaster Management** — CRUD with filters, map visualization, severity/status badges, AI risk scoring
- **Alert System** — Create, broadcast, auto-expire alerts; toast notifications with sound (Web Audio API)
- **Aid Requests** — Public help request form (no login), urgency levels, rescue team assignment
- **Resource Inventory** — Track stock levels, categories, allocation to disasters, low-stock warnings
- **Evacuation Zones** — Map polygons (danger/warning/safe/shelter), population tracking, shelter capacity
- **Rescue Coordination** — Team deployment, mission tracking, status workflow (pending → assigned → in_progress → completed)
- **Volunteer Registration** — Skills, availability, approval workflow
- **User Management** — Role-based access (super_admin, relief_manager, rescue_team, volunteer, public)
- **PDF Reports** — Generate disaster reports on demand
- **Live Background** — Canvas particle animation with neon glow aesthetic

## User Roles

| Role | Access |
| ---- | ------ |
| super_admin | Dashboard, all managers, user management |
| relief_manager | Dashboard, disaster/alert/resource/evacuation managers |
| rescue_team | My Missions, Resource Request |
| volunteer | Dashboard (limited), Volunteer registration |
| public | Report Disaster, Request Help, Safety Info, Public Map |

## Quick Start

### Prerequisites

- Node.js 18+
- MySQL 8.0+
- npm

### 1. Clone & Install

```bash
git clone <repo-url>
cd Smart_Disaster_And_Relief_Management_System

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Environment

```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your DB credentials and API keys
```

Key variables in `backend/.env`:
```env
DB_HOST=localhost
DB_NAME=smart_disaster_db
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
OPENWEATHER_API_KEY=your_key
SMTP_USER=your_email
SMTP_PASS=your_app_password
```

### 3. Database Setup

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE smart_disaster_db;"

# Run migrations
cd backend
npm run migrate

# Seed sample data
npm run seed
```

### 4. Run Development Servers

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

- Frontend: <http://localhost:5173>
- Backend API: <http://localhost:5000/api/v1>

### 5. Default Login

```
Email: admin@disaster.com
Password: Admin@123
```

## Docker Deployment

```bash
docker-compose up --build -d
```

- Frontend: <http://localhost:5173>
- Backend: <http://localhost:5000>
- MySQL: localhost:3306

## Project Structure

```
├── backend/
│   ├── migrations/          # Sequelize migrations (11 tables)
│   ├── seeders/             # Realistic sample data
│   ├── src/
│   │   ├── config/          # Environment, database
│   │   ├── controllers/     # Route handlers (11)
│   │   ├── middleware/      # Auth, role, upload, validation, error
│   │   ├── models/          # Sequelize models (11)
│   │   ├── routes/          # Express routes (11)
│   │   ├── services/        # Business logic + external APIs
│   │   └── utils/           # Helpers, response formatter
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── alerts/      # AlertToast, SoundAlert
│   │   │   ├── dashboard/   # StatsCard, SeverityDonut, ResourceBarChart, etc.
│   │   │   ├── forms/       # AidRequestForm, DisasterReportForm, etc.
│   │   │   ├── layout/      # Navbar, Sidebar, Footer, LiveBackground
│   │   │   ├── map/         # DisasterMap, MapMarker, EvacuationLayer, ZonePolygon
│   │   │   └── ui/          # Button, Modal, Table
│   │   ├── context/         # ThemeContext
│   │   ├── hooks/           # useAuth, useSocket, useWeather
│   │   ├── pages/
│   │   │   ├── admin/       # Dashboard, DisasterManager, AlertManager, etc.
│   │   │   ├── public/      # Login, Register, ReportDisaster, PublicMap
│   │   │   ├── rescue/      # MyMissions, ResourceRequest
│   │   │   └── victim/      # RequestHelp, SafetyInfo, TrackRequest
│   │   ├── services/        # API service modules
│   │   └── store/           # Redux Toolkit slices
│   └── vite.config.js
├── database/
│   ├── schema.sql
│   ├── seed_data.sql
│   └── stored_procedures.sql
├── docker-compose.yml
└── README.md
```

## API Endpoints

| Method | Path | Auth | Description |
| ------ | ---- | ---- | ----------- |
| POST | /api/v1/auth/register | No | Register user |
| POST | /api/v1/auth/login | No | Login |
| GET | /api/v1/disasters | Yes | List disasters |
| POST | /api/v1/disasters | Manager+ | Create disaster |
| PUT | /api/v1/disasters/:id | Manager+ | Update disaster |
| DELETE | /api/v1/disasters/:id | Admin | Delete disaster |
| POST | /api/v1/disasters/predict-risk | Yes | AI risk prediction |
| GET | /api/v1/alerts | Yes | List alerts |
| POST | /api/v1/alerts | Manager+ | Create alert |
| GET | /api/v1/aid-requests | Yes | List aid requests |
| POST | /api/v1/aid-requests | No | Submit aid request (public) |
| PATCH | /api/v1/aid-requests/:id/assign | Manager+ | Assign rescue team |
| GET | /api/v1/resources | Yes | List resources |
| POST | /api/v1/resources | Manager+ | Create resource |
| GET | /api/v1/resources/analytics | Yes | Resource analytics |
| GET | /api/v1/evacuation-zones | Yes | List evacuation zones |
| POST | /api/v1/evacuation-zones | Manager+ | Create zone |
| GET | /api/v1/rescue-teams | Yes | List rescue teams |
| GET | /api/v1/volunteers | Yes | List volunteers |
| POST | /api/v1/volunteers/register | No | Register as volunteer |
| GET | /api/v1/dashboard/stats | Yes | Dashboard statistics |
| GET | /api/v1/dashboard/live-feed | Yes | Live event feed |
| GET | /api/v1/weather/:district | Yes | Weather + risk indicator |
| GET | /api/v1/reports/disaster/:id | Yes | Generate PDF report |

## License

MIT
