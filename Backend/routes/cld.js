//Create cloudinary account
//.env
// CLOUDINARY_CLOUD_NAME=
// CLOUDINARY_API_KEY=
// CLOUDINARY_API_SECRET=


//Intall independencies
//npm install cloudinary multer multer-storage-cloudinary






//This is cloudinary config file

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary with credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer storage to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'student_images', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], // Accepted file formats
  },
});

module.exports = {
  cloudinary,
  storage,
};






//This will be in mentee_controller.js
const { client } = require('../database/db');
const { cloudinary } = require('../config/cloudinaryConfig');//Path of cloudinary config file

const uploadProfilePhoto = async (req, res) => {
    try {
        const studentId = req.params.id;
        const photoUrl = req.file.path; // File path on Cloudinary

        // Update the database with the Cloudinary URL
        const query = 'UPDATE admission SET profile_photo = $1 WHERE student_id = $2 RETURNING profile_photo';  //Query will be different
        const result = await client.query(query, [photoUrl, studentId]);

        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Profile photo uploaded successfully', photoUrl });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload image', details: error.message });
    }
};

module.exports = {
    uploadProfilePhoto,
    //This will come in last ofc no shit
};





//This will be in mentee.js

const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinaryConfig'); //Path will be different
const uploadProfilePhoto = require('../controllers/mentee_controllers');

const upload = multer({ storage }); // Initialize Multer with Cloudinary storage
const menteeRouter = express.Router();

// New route for profile photo upload
menteeRouter.post('/upload-profile-photo/:id', upload.single('profilePhoto'), uploadProfilePhoto);

module.exports = menteeRouter;