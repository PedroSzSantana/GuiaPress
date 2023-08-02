const Sequelize = require("sequelize");
require("dotenv").config();
const pass = process.env.PASS_MYSQL;
const connection = new Sequelize("guiapress", "root", pass, {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
});
module.exports = connection;
