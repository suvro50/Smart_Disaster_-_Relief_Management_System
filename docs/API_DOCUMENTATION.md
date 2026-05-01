# API Documentation — Smart Disaster & Relief Management System

**Base URL:** `/api/v1`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### POST /auth/register
Register a new user.
```json
Body: { "full_name", "email", "password", "role", "phone", "district" }
Response: { "token", "user" }
```

### POST /auth/login
```json
Body: { "email", "password" }
Response: { "token", "user" }
```

### GET /auth/me
Returns current authenticated user profile.

---

## Disasters

### GET /disasters
List disasters with optional filters.
| Query Param | Values |
|------------|--------|
| type | flood, earthquake, cyclone, fire, landslide, drought, tsunami, other |
| severity | low, medium, high, critical |
| status | active, monitoring, resolved, false_alarm |
| district | any district name |
| page | page number (default 1) |
| pageSize | items per page (default 20) |

### POST /disasters
Create a disaster. **Requires:** relief_manager or super_admin
```json
Body: { "title", "type", "severity", "description", "location_lat", "location_lng", "district", "affected_population", "casualties", "injuries" }
```

### PUT /disasters/:id
Update a disaster. **Requires:** relief_manager or super_admin

### DELETE /disasters/:id
Delete a disaster. **Requires:** super_admin

### POST /disasters/predict-risk
AI risk prediction for a disaster scenario.
```json
Body: { "type", "affected_population", "casualties", "injuries" }
Response: { "score", "severity" }
```

---

## Aid Requests

### GET /aid-requests
List aid requests. **Requires:** auth

### POST /aid-requests
Submit aid request. **Public — no auth required**
```json
Body: { "request_type", "urgency", "description", "people_count", "location_lat", "location_lng", "address", "disaster_id" }
```

### PATCH /aid-requests/:id/assign
Assign a rescue team to an aid request. **Requires:** relief_manager+
```json
Body: { "team_id" }
```

### PATCH /aid-requests/:id/status
Update aid request status. **Requires:** rescue_team or manager
```json
Body: { "status" }
```

---

## Rescue Teams

### GET /rescue-teams
List all rescue teams.

### POST /rescue-teams
Create a rescue team. **Requires:** super_admin
```json
Body: { "name", "team_type", "capacity", "district", "contact_phone" }
```

### PUT /rescue-teams/:id
Update team info.

### GET /rescue-teams/:id/missions
Get mission history for a team.

### POST /rescue-teams/:id/assign/:disasterId
Assign team to a disaster. **Requires:** relief_manager+

---

## Resources

### GET /resources
List all resources.

### POST /resources
Create a resource. **Requires:** relief_manager+
```json
Body: { "name", "category", "quantity", "unit", "location", "district" }
```

### PUT /resources/:id
Update resource.

### GET /resources/analytics
Get resource analytics (low stock rate, total quantities by category).

### GET /resources/low-stock
Get resources below minimum stock level.

### POST /resources/allocate
Allocate resource to a disaster. **Requires:** relief_manager+
```json
Body: { "resource_id", "disaster_id", "quantity" }
```

### GET /resources/allocations
Get allocation history.

---

## Alerts

### GET /alerts
List alerts. Optional filter: `?district=Dhaka&is_active=true`

### POST /alerts
Create and broadcast an alert. **Requires:** relief_manager+
```json
Body: { "title", "message", "alert_type", "severity", "district", "expires_at" }
```

### PATCH /alerts/:id/deactivate
Deactivate an alert. **Requires:** relief_manager+

---

## Evacuation Zones

### GET /evacuation-zones
List evacuation zones. Optional filter: `?district=Dhaka`

### POST /evacuation-zones
Create an evacuation zone. **Requires:** relief_manager+
```json
Body: { "zone_name", "zone_type", "district", "boundary_coordinates", "population_affected", "shelter_capacity", "evacuation_route" }
```

---

## Volunteers

### GET /volunteers
List volunteers. Optional filter: `?status=approved&district=Dhaka`

### POST /volunteers/register
Register as a volunteer. **Public — no auth required**
```json
Body: { "full_name", "phone", "skills", "availability", "district", "emergency_contact" }
```

### PATCH /volunteers/:id/approve
Approve a volunteer. **Requires:** relief_manager+

### POST /volunteers/:id/assign-team
Assign volunteer to a rescue team. **Requires:** relief_manager+

---

## Dashboard

### GET /dashboard/stats
Get dashboard statistics (counts of active disasters, alerts, resources, teams, etc.)

### GET /dashboard/live-feed
Get last 20 live events for the activity feed.

---

## Weather

### GET /weather/:district
Get weather data and risk indicator for a district.
```json
Response: { "weather": { ...OpenWeatherMap data }, "riskIndicator": { "level", "score" } }
```

---

## Reports

### GET /reports
List generated reports.

### POST /reports/monthly-summary
Generate a monthly summary report. **Requires:** relief_manager+
```json
Body: { "month": "2024-01" }
```

### GET /reports/:id/pdf
Download report as PDF.

### GET /reports/:id/csv
Export report as CSV.

---

## Socket.IO Events

### Server → Client
| Event | Data | Target |
|-------|------|--------|
| `new_disaster` | Disaster object | All clients |
| `disaster_updated` | Disaster object | All clients |
| `new_alert` | Alert object | All + district room |
| `aid_request_update` | Aid request object | Victim room |
| `resource_low` | Resource object | Admin room |
| `team_location_update` | { teamId, lat, lng } | Admin room |

### Client → Server
| Event | Data | Description |
|-------|------|-------------|
| `join_district` | district name | Subscribe to district alerts |
| `team_location` | { teamId, lat, lng } | Rescue team GPS broadcast |
