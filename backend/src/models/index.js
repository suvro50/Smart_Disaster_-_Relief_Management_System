import { sequelize } from "../config/database.js";
import AidRequest from "./AidRequest.js";
import Alert from "./Alert.js";
import Disaster from "./Disaster.js";
import EvacuationZone from "./EvacuationZone.js";
import Report from "./Report.js";
import RescueTeam from "./RescueTeam.js";
import Resource from "./Resource.js";
import ResourceAllocation from "./ResourceAllocation.js";
import User from "./User.js";
import Volunteer from "./Volunteer.js";

// User relations
User.hasMany(AidRequest, { foreignKey: "victim_id", as: "aidRequests" });
AidRequest.belongsTo(User, { foreignKey: "victim_id", as: "victim" });

User.hasMany(Report, { foreignKey: "generated_by", as: "generatedReports" });
Report.belongsTo(User, { foreignKey: "generated_by", as: "generator" });

User.hasMany(Resource, { foreignKey: "managed_by", as: "managedResources" });
Resource.belongsTo(User, { foreignKey: "managed_by", as: "manager" });

User.hasMany(Disaster, { foreignKey: "reported_by", as: "reportedDisasters" });
Disaster.belongsTo(User, { foreignKey: "reported_by", as: "reporter" });

User.hasMany(Disaster, { foreignKey: "verified_by", as: "verifiedDisasters" });
Disaster.belongsTo(User, { foreignKey: "verified_by", as: "verifier" });

User.hasMany(Alert, { foreignKey: "sent_by", as: "sentAlerts" });
Alert.belongsTo(User, { foreignKey: "sent_by", as: "sender" });

User.hasMany(RescueTeam, { foreignKey: "leader_id", as: "ledTeams" });
RescueTeam.belongsTo(User, { foreignKey: "leader_id", as: "leader" });

User.hasOne(Volunteer, { foreignKey: "user_id", as: "volunteerProfile" });
Volunteer.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Disaster relations
Disaster.hasMany(AidRequest, { foreignKey: "disaster_id", as: "aidRequests" });
AidRequest.belongsTo(Disaster, { foreignKey: "disaster_id", as: "disaster" });

Disaster.hasMany(Alert, { foreignKey: "disaster_id", as: "alerts" });
Alert.belongsTo(Disaster, { foreignKey: "disaster_id", as: "disaster" });

Disaster.hasMany(EvacuationZone, { foreignKey: "disaster_id", as: "evacuationZones" });
EvacuationZone.belongsTo(Disaster, { foreignKey: "disaster_id", as: "disaster" });

Disaster.hasMany(Report, { foreignKey: "disaster_id", as: "reports" });
Report.belongsTo(Disaster, { foreignKey: "disaster_id", as: "disaster" });

Disaster.hasMany(ResourceAllocation, { foreignKey: "disaster_id", as: "resourceAllocations" });
ResourceAllocation.belongsTo(Disaster, { foreignKey: "disaster_id", as: "disaster" });

// RescueTeam relations
RescueTeam.hasMany(Volunteer, { foreignKey: "assigned_team_id", as: "volunteers" });
Volunteer.belongsTo(RescueTeam, { foreignKey: "assigned_team_id", as: "assignedTeam" });

RescueTeam.hasMany(AidRequest, { foreignKey: "assigned_team_id", as: "assignedAidRequests" });
AidRequest.belongsTo(RescueTeam, { foreignKey: "assigned_team_id", as: "assignedTeam" });

RescueTeam.belongsToMany(Disaster, {
  through: "rescue_team_disasters",
  foreignKey: "rescue_team_id",
  otherKey: "disaster_id",
  as: "assignedDisasters",
  timestamps: false
});

Resource.hasMany(ResourceAllocation, { foreignKey: "resource_id", as: "allocations" });
ResourceAllocation.belongsTo(Resource, { foreignKey: "resource_id", as: "resource" });

User.hasMany(ResourceAllocation, { foreignKey: "allocated_by", as: "resourceAllocations" });
ResourceAllocation.belongsTo(User, { foreignKey: "allocated_by", as: "allocator" });
Disaster.belongsToMany(RescueTeam, {
  through: "rescue_team_disasters",
  foreignKey: "disaster_id",
  otherKey: "rescue_team_id",
  as: "assignedTeams",
  timestamps: false
});

const db = {
  sequelize,
  User,
  Disaster,
  AidRequest,
  RescueTeam,
  Resource,
  ResourceAllocation,
  Alert,
  EvacuationZone,
  Volunteer,
  Report
};

export default db;
export {
  sequelize,
  User,
  Disaster,
  AidRequest,
  RescueTeam,
  Resource,
  ResourceAllocation,
  Alert,
  EvacuationZone,
  Volunteer,
  Report
};
