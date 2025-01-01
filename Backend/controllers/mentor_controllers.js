const { client } = require('../database/db');

const dashboard_fetch = async (req, res) => {
  try {
    const facultyId = req.params.id; // Get the faculty_id from URL parameters
    
    // Query the faculty table for the given faculty_id
    const query = `
      SELECT 
        FACULTY_ID, 
        FACULTY_NAME, 
        DEPARTMENT, 
        EMAIL, 
        ROLES 
      FROM faculty 
      WHERE FACULTY_ID = $1
    `;
    
    const result = await client.query(query, [facultyId]);

    if (result.rows.length > 0) {
      // Send back the result data in the response
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'No data found for this faculty.' });
    }
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



  module.exports = { dashboard_fetch };