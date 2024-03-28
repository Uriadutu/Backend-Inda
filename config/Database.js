import { Sequelize } from "sequelize";

const db = new Sequelize("pplinda", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
