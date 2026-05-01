# System Design — Smart Disaster & Relief Management System

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │  Admin    │ │  Rescue  │ │  Victim  │ │  Public  │  │
│  │Dashboard  │ │Dashboard │ │  Pages   │ │  Pages   │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘  │
│       └─────────────┴─────────────┴─────────────┘       │
│                    │ Redux + Axios                       │
│              ┌─────┴─────┐                               │
│              │ Socket.IO │                               │
│              └─────┬─────┘                               │
└────────────────────┼────────────────────────────────────┘
                     │ HTTP + WebSocket
┌────────────────────┼────────────────────────────────────┐
│              Backend (Express + Socket.IO)                │
│  ┌─────────┐ ┌──────────┐ ┌───────────┐ ┌───────────┐  │
│  │Routes    │→│Middleware│→│Controllers│→│ Services   │  │
│  │(11)      │ │Auth/Role │ │(11)       │ │(6)        │  │
│  └─────────┘ └──────────┘ └─────┬─────┘ └───────────┘  │
│                                │                         │
│                    ┌───────────┴───────────┐             │
│                    │   Sequelize ORM        │             │
│                    └───────────┬───────────┘             │
└────────────────────────────────┼─────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │      MySQL 8.0          │
                    │  (11 tables + procs)    │
                    └─────────────────────────┘
```

## Data Flow

### Real-time Alert Flow
1. Admin creates alert via `POST /api/v1/alerts`
2. Controller saves to DB + calls `socketService.broadcastAlert()`
3. Socket.IO emits `new_alert` to all clients + district room
4. Frontend `AlertToast` renders notification + `SoundAlert` plays audio
5. `LiveFeedTicker` updates with new entry

### Aid Request Flow
1. Victim submits `POST /api/v1/aid-requests` (no auth)
2. Admin views pending requests in dashboard
3. Admin assigns rescue team via `PATCH /aid-requests/:id/assign`
4. Socket emits `aid_request_update` to victim room
5. Victim sees status change in `TrackRequest` page
6. Rescue team marks mission complete → status = "completed"

### GPS Tracking Flow
1. Rescue team clicks "Start GPS Broadcast" in `RescueDashboard`
2. Frontend emits `team_location` every 30 seconds via Socket.IO
3. Backend broadcasts `team_location_update` to admin room
4. Admin dashboard map updates team marker position

## Database Schema (ER Relationships)

```
User (1) ──── (N) AidRequest     [reported_by]
User (1) ──── (N) Report         [generated_by]
User (1) ──── (1) Volunteer      [user_id]
User (1) ──── (1) RescueTeam     [leader_id]

Disaster (1) ── (N) AidRequest   [disaster_id]
Disaster (1) ── (N) Alert        [disaster_id]
Disaster (1) ── (N) EvacuationZone [disaster_id]
Disaster (1) ── (N) Report       [disaster_id]

RescueTeam (1) ── (N) Volunteer  [assigned_team_id]
RescueTeam ──┬── Disaster        [many-to-many via rescue_team_disasters]

Resource ──── Disaster           [via resource_allocations]
```

## Security

- **JWT Authentication**: Token-based auth with 7-day expiry
- **Role-based Access**: 5 roles with middleware checks
- **Password Hashing**: bcryptjs with salt rounds
- **CORS**: Configured for frontend origin
- **Helmet**: Security headers
- **Input Validation**: express-validator on all routes

## External Integrations

| Service | Purpose | Config |
| ------- | ------- | ------ |
| OpenWeatherMap | Weather data + risk | `OPENWEATHER_API_KEY` |
| Nodemailer (SMTP) | Email alerts | `SMTP_USER/PASS` |
| BulkSMS | SMS alerts | `BULK_SMS_API_KEY` |

## Deployment

### Docker Compose
- **db**: MySQL 8.0 with auto-init from schema.sql + stored_procedures.sql
- **backend**: Node 20 Alpine, production build
- **frontend**: Multi-stage Vite build → Nginx with API proxy

### Manual
- Backend: `npm run dev` (nodemon) or `npm start`
- Frontend: `npm run dev` (Vite dev server) or `npm run build` (production)
- Migrations: `npm run migrate`
- Seed data: `npm run seed`
