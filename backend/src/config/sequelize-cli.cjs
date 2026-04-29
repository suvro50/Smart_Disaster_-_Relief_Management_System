require("dotenv").config();

const shared = {
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "smart_disaster_db",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  dialect: process.env.DB_DIALECT || "mysql",
  logging: process.env.DB_LOGGING === "true"
};

module.exports = {
  development: shared,
  test: shared,
  production: shared
};
