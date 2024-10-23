
// Backend/routes/studentRoutes.js
const express = require('express');
const studentController = require('../controllers/student');

const router = express.Router();

// Get student details by PRN
router.get('/:prn', studentController.getStudentByPRN);


// Update student details
router.put('/:prn', studentController.updateStudent);



module.exports = router;

