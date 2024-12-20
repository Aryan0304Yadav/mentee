const express = require('express');
const { client } = require('../database/db');

const menteeRouter = express.Router();

menteeRouter.get('/attendance-fetch/:id', async (req, res) => {
  try {
    const studentId = req.params.id; // Get the student_id from URL parameters
    // Query the attendance table for the given student_id
    const query = 'SELECT subject, average_attendance FROM attendance WHERE student_id = $1';
    const result = await client.query(query, [studentId]);

    if (result.rows.length > 0) {
      // Send back the result data in the response
      res.json({ attendance: result.rows });
    } else {
      res.status(404).json({ message: 'No attendance data found for this student.' });
    }
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

menteeRouter.get('/dashboard-fetch/:id', async (req, res) => {
  try {
    const studentId = req.params.id; // Get the student_id from URL parameters
    // Query the attendance table for the given student_id
    const query = 'SELECT old_name, profile_photo, old_student_phone, old_student_email, batch, prn, branch, assigned_mentor_name FROM admission INNER JOIN unknown ON admission.student_id = unknown.student_id WHERE admission.student_id = $1';
    const result = await client.query(query, [studentId]);

    if (result.rows.length > 0) {
      // Send back the result data in the response
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'No attendance data found for this student.' });
    }
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
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

module.exports = menteeRouter;