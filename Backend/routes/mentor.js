const express = require('express');
const { dashboard_fetch } = require('../controllers/mentor_controllers');

const mentorRouter = express.Router();

mentorRouter.get('/dashboard-fetch/:id', dashboard_fetch);