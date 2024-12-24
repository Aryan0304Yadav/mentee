const { client } = require('../database/db');

const attendance_fetch = async (req, res) => {
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
};

const dashboard_fetch = async (req, res) => {
  try {
    const studentId = req.params.id; // Get the student_id from URL parameters
    // Query the attendance table for the given student_id
    const query = 'SELECT old_name, profile_photo, old_student_phone, old_student_email, batch, prn, branch, assigned_mentor_name FROM admission INNER JOIN unknown ON admission.student_id = unknown.student_id WHERE admission.student_id = $1';
    const result = await client.query(query, [studentId]);

    if (result.rows.length > 0) {
      // Send back the result data in the response
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'No data found for this student.' });
    }
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const personal_details_fetch = async (req, res) => {
  try {
    const studentId = req.params.id; // Get the student_id from URL parameters
    // Query the attendance table for the given student_id
    const query = 'SELECT old_name, old_student_phone, old_student_email, branch, blood_group, old_res_landline, dob, mother_tongue, year_of_admission, old_health_problems FROM admission INNER JOIN unknown ON admission.student_id = unknown.student_id WHERE admission.student_id = $1';
    const result = await client.query(query, [studentId]);

    if (result.rows.length > 0) {
      // Send back the result data in the response
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'No data found for this student.' });
    }
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const personal_details_put = async (req, res) => {
  try {
    const studentId = req.params.id;
    const query = 'UPDATE admission SET new_name = $1, new_student_phone = $2, new_student_email = $3, new_res_landline = $4, new_health_problems = $5 WHERE student_id = $6 RETURNING *';
    const values = [req.body.new_name, req.body.new_student_phone, req.body.new_student_email, req.body.new_res_landline, req.body.new_health_problems, studentId];
    const result = await client.query(query, values);
    if (result.rows.length > 0) {
      // Send back the result data in the response
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Failed to update details' });
    }
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const residential_details_fetch = async (req, res) => {
  try {
    const studentId = req.params.id; // Get the student_id from URL parameters
    // Query the attendance table for the given student_id
    const query = 'SELECT old_currently_living_with, old_current_address, old_permanent_address, old_state, old_area FROM admission WHERE student_id = $1';
    const result = await client.query(query, [studentId]);

    if (result.rows.length > 0) {
      // Send back the result data in the response
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'No data found for this student.' });
    }
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const residential_details_put = async (req, res) => {
  try {
    const studentId = req.params.id;
    const query = 'UPDATE admission SET new_currently_living_with = $1, new_current_address = $2, new_permanent_address = $3, new_state = $4, new_area = $5 WHERE student_id = $6 RETURNING *';
    const values = [req.body.new_currently_living_with, req.body.new_current_address, req.body.new_permanent_address, req.body.new_state, req.body.new_area, studentId];
    const result = await client.query(query, values);
    if (result.rows.length > 0) {
      // Send back the result data in the response
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Failed to update details' });
    }
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const observations_fetch = async (req, res) => {
  try {
    const studentId = req.params.id; // Get the student_id from URL parameters
    // Query the attendance table for the given student_id
    const query = 'SELECT mentor_name, old_observation FROM mentor_observation WHERE student_id = $1 ORDER BY semester';
    const result = await client.query(query, [studentId]);

    if (result.rows.length > 0) {
      // Send back the result data in the response
      res.json(result.rows);
    } else {
      res.status(404).json({ message: 'No data found for this student.' });
    }
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { observations_fetch, attendance_fetch, dashboard_fetch, personal_details_fetch, personal_details_put, residential_details_fetch, residential_details_put };