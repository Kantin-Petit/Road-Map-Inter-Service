const { Sequelize } = require('sequelize');

require('dotenv').config()

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const sequelize = new Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PASSWORD}`, {
  host: `${DB_HOST}`,
  port: 3306,
  dialect: 'mysql',
});

sequelize.sync(err => { })

sequelize.authenticate()
  .then(() => { })
  .catch(err => { });

module.exports = sequelize
global.sequelize = sequelize