const express = require('express');
const cors = require('cors');
const { connectDatabase, db } = require('./database/db');
const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(process.env.PORT, async () => {
  connectDatabase();
});