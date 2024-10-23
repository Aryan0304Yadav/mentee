// Backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const studentRoutes = require('./routes/studentRoutes');
const mentorRoutes = require('./routes/mentorRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/students', studentRoutes);
app.use('/mentors', mentorRoutes);

const PORT = 8800;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
