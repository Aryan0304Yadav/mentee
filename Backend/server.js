const express = require('express');
const cors = require('cors');
const menteeRouter = require('./routes/mentee');
const { client } = require('./database/db');
const app = express();

const path = require('path');

require('dotenv').config();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/mentee', menteeRouter);

app.listen(process.env.PORT, async () => {
  await client.connect();
});