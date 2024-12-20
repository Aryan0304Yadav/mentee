const { Client } = require('pg');

require('dotenv').config();

let db;

const connectDatabase = async () => {
  const client = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DATABASE
  });

  db = await client.connect();
};

module.exports = { connectDatabase, db };