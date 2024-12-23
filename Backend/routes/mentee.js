const express = require('express');
const { attendance_fetch, dashboard_fetch, personal_details_fetch, personal_details_put } = require('../controllers/mentee_controllers');

const menteeRouter = express.Router();

menteeRouter.get('/attendance-fetch/:id', attendance_fetch);

menteeRouter.get('/dashboard-fetch/:id', dashboard_fetch);

menteeRouter.get('/personal-details-fetch/:id', personal_details_fetch);

menteeRouter.put('/personal-details-put/:id', personal_details_put);

menteeRouter.get('/misc-details-fetch/:id', async (req, res) => {
  res.send('hey');
});

menteeRouter.get('/residential-details-fetch/:id', async (req, res) => {
  res.send('hey');
});

//Atharva

menteeRouter.get('/pre-admission-academic-details-fetch/:id', async (req, res) => {
  res.send('hey');
});

menteeRouter.get('/post-admission-academic-details-fetch/:id', async (req, res) => {
  res.send('hey');
});

//Atharva

menteeRouter.get('/observations-fetch/:id', async (req, res) => {
  res.send('hey');
});

menteeRouter.get('/parent-details-fetch/:id', async (req, res) => {
  res.send('hey');
});

module.exports = menteeRouter;