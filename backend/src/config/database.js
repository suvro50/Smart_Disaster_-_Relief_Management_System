import { Sequelize } from "sequelize";
import { env } from "./env.js";

let sequelize;

if (env.db.dialect === "sqlite") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: env.db.storage,
    logging: env.db.logging ? console.log : false,
    define: {
      underscored: true,
      freezeTableName: true
    }
  });
} else {
  sequelize = new Sequelize(env.db.name, env.db.user, env.db.password, {
    host: env.db.host,
    port: env.db.port,
    dialect: env.db.dialect,
    logging: env.db.logging ? console.log : false,
    timezone: "+00:00",
    define: {
      underscored: true,
      freezeTableName: true
    }
  });
}

export { sequelize };

export const connectDatabase = async () => {
  await sequelize.authenticate();
  console.log("Database connection established.");
};
