const express = require('express');
const { connectDatabase, db } = require('../database/db');

const menteeRouter = express.Router();

menteeRouter.get('/dashboard-fetch/:id', async (req, res) => {
  res.send('hey');
});

menteeRouter.get('/personal-details-fetch/:id', async (req, res) => {
  res.send('hey');
});

menteeRouter.get('/misc-details-fetch/:id', async (req, res) => {
  res.send('hey');
});

menteeRouter.get('/residential-details-fetch/:id', async (req, res) => {
  res.send('hey');
});

menteeRouter.get('/pre-admission-academic-details-fetch/:id', async (req, res) => {
  res.send('hey');
});

menteeRouter.get('/post-admission-academic-details-fetch/:id', async (req, res) => {
  res.send('hey');
});

menteeRouter.get('/observations-fetch/:id', async (req, res) => {
  res.send('hey');
});

menteeRouter.get('/parent-details-fetch/:id', async (req, res) => {
  res.send('hey');
});