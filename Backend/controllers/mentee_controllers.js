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

const misc_details_fetch = async (req, res) => {
  try {
    const studentId = req.params.id;
    const query = 'SELECt old_hobbies, old_strengths, old_weaknesses, old_short_term_goals, old_long_term_goals FROm misc_details where student_id = $1 ';
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

const misc_details_put = async (req, res) => {
  try {
    const studentId = req.params.id;
    const query = 'UPDATE misc_details SET new_hobbies = $1, new_strengths = $2, new_weaknesses = $3, new_short_term_goals = $4, new_long_term_goals = $5 WHERE student_id = $6 RETURNING *';
    const values = [req.body.new_hobbies, req.body.new_strengths, req.body.new_weaknesses, req.body.new_short_term_goals, req.body.new_long_term_goals, studentId];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Successfully updated
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

const pre_admission_academic_details_fetch = async (req, res) => {
  try {
    const studentId = req.params.id; // Get the student_id from URL parameters
    // Query the attendance table for the given student_id
    const query = 'SELECT ssc_percentage, ssc_board, hsc_percentage, hsc_board, diploma_percentage, diploma_stream, cet_percentile, jee_percentile FROM admission WHERE student_id = $1';
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

const post_admission_academic_details_fetch = async (req, res) => {
  try {
    const studentId = req.params.id; // Get the student_id from URL parameters
    // Query the attendance table for the given student_id
    const query = 'SELECT semester, subject_name, old_ia1, old_ia2, old_endsem FROM ia_sem_marks WHERE student_id = $1';
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

const post_admission_academic_details_put = async (req, res) => {
  try {
    const studentId = req.params.id; // Get the student_id from URL parameters
    // Query the attendance table for the given student_id
    const query = 'UPDATE ia_sem_marks SET new_ia1 = $1, new_ia2 = $2, new_endsem = $3 WHERE student_id = $4 RETURNING *';
    const values = [req.body.new_ia1, req.body.new_ia2, req.body.new_endsem, studentId];
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

const parent_details_fetch = async (req, res) => {
  try {
    const studentId = req.params.id; // Get the student_id from URL parameters
    // Query the attendance table for the given student_id
    const query = 'SELECT old_father_name, old_father_phone, old_father_occupation, old_mother_name, old_mother_phone, old_mother_occupation, old_guardian_name, old_guardian_phone, old_guardian_occupation FROM admission WHERE student_id = $1';
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

const parent_details_put = async (req, res) => {
  try {
    const studentId = req.params.id;
    const query = 'UPDATE admission SET new_father_name = $1, new_father_phone = $2, new_father_occupation = $3, new_mother_name = $4, new_mother_phone = $5, new_mother_occupation = $6, new_guardian_name = $7, new_guardian_phone = $8, new_guardian_occupation = $9 WHERE student_id = $10 RETURNING *';
    const values = [req.body.new_father_name, req.body.new_father_phone, req.body.new_father_occupation, req.body.new_mother_name, req.body.new_mother_phone, req.body.new_mother_occupation, req.body.new_guardian_name, req.body.new_guardian_phone, req.body.new_guardian_occupation, studentId];
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

const achievements_before_fetch = async (req, res) => {
  try {
    const studentId = req.params.id; // Get the student_id from URL parameters
    // Query the achievements_before table for the given student_id
    const query = `
      SELECT 
        old_type, 
        old_organizer, 
        old_year_of_organization, 
        old_position_obtained, 
        old_additional_information, 
        old_certificate
      FROM achievements_before 
      WHERE student_id = $1
    `;
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

const achievements_before_put = async (req, res) => {
  try {
    const studentId = req.params.id; // Get the student_id from URL parameters
    // Update query for achievements_before
    const query = `
      UPDATE achievements_before
      SET 
        new_type = $1, 
        new_organizer = $2, 
        new_year_of_organization = $3, 
        new_position_obtained = $4, 
        new_additional_information = $5, 
        new_certificate = $6
      WHERE student_id = $7
      RETURNING *;
    `;
    const values = [
      req.body.new_type,
      req.body.new_organizer,
      req.body.new_year_of_organization,
      req.body.new_position_obtained,
      req.body.new_additional_information,
      req.body.new_certificate,
      studentId,
    ];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      // Send back the updated data in the response
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Failed to update details' });
    }
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const achievements_after_fetch = async (req, res) => {
  try {
    const studentId = req.params.id; // Get the student_id from URL parameters
    // Query the achievements_after table for the given student_id
    const query = `
      SELECT 
        old_semester, 
        old_type, 
        old_organizer, 
        old_year_of_organization, 
        old_position_obtained, 
        old_additional_information, 
        old_certificate
      FROM achievements_after 
      WHERE student_id = $1
    `;
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

const achievements_after_put = async (req, res) => {
  try {
    const studentId = req.params.id; // Get the student_id from URL parameters
    // Update query for achievements_after
    const query = `
      UPDATE achievements_after
      SET 
        new_semester = $1, 
        new_type = $2, 
        new_organizer = $3, 
        new_year_of_organization = $4, 
        new_position_obtained = $5, 
        new_additional_information = $6, 
        new_certificate = $7
      WHERE student_id = $8
      RETURNING *;
    `;
    const values = [
      req.body.new_semester,
      req.body.new_type,
      req.body.new_organizer,
      req.body.new_year_of_organization,
      req.body.new_position_obtained,
      req.body.new_additional_information,
      req.body.new_certificate,
      studentId,
    ];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      // Send back the updated data in the response
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Failed to update details' });
    }
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { parent_details_put, parent_details_fetch, pre_admission_academic_details_fetch, observations_fetch, attendance_fetch, dashboard_fetch, personal_details_fetch, personal_details_put, residential_details_fetch, residential_details_put, misc_details_fetch, misc_details_put, post_admission_academic_details_fetch, post_admission_academic_details_put, achievements_before_fetch, achievements_before_put, achievements_after_fetch, achievements_after_put };