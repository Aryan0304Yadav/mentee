const express = require('express');
const cors = require('cors');
const menteeRouter = require('./routes/mentee');
const { client } = require('./database/db');
const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/mentee', menteeRouter);

app.listen(process.env.PORT, async () => {
  await client.connect();
});