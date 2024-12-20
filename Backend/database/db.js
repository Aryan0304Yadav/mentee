const { Client } = require('pg');

require('dotenv').config();

const client = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DATABASE
});

module.exports = { client };