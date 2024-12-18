import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Profile from './components/Profile';
import PersonalDetails from './components/PersonalDetails';
import MiscDetails from './components/MiscDetails';
import AcademicDetails from './components/AcademicDetails';
import ResidentialDetails from './components/ResidentialDetails';
import PreAdmissionAcademicDetails from './components/PreAdmissionAcademicDetails';
import PostAdmissionAcademicDetails from './components/PostAdmissionAcademicDetails'; // Updated import
import Observations from './components/Observations'; // Ensure the Observations component exists
import ParentDetails from './components/ParentDetails'; // Import the new ParentDetails component
import './App.css';

// Define the PRN constant
const PRN = "PRN002"; // Example PRN, can be dynamically fetched or passed down

const App = () => {
  return (
    <Router>
      <div className='dashboard'>
        <Sidebar prn={PRN} /> {/* Passing the PRN as a prop to Sidebar */}
        <div className="dashboard--content">
          <Routes>
            {/* Redirect root path to /dashboard */}
            <Route path="/" element={<Navigate to={`/dashboard/${PRN}`} />} />
            <Route path="/dashboard/:prn" element={<><Content /><Profile /></>} />

            {/* Personal Details Route */}
            <Route path="/personal-details" element={<PersonalDetails />} />
            <Route path="/personal-details/:prn" element={<PersonalDetails />} />

            {/* Miscellaneous Details Route */}
            <Route path="/misc-details" element={<MiscDetails />} />
            <Route path="/misc-details/:prn" element={<MiscDetails />} />

            {/* Academic Details Routes */}
            <Route path="/academic-details" element={<AcademicDetails />} />
            <Route path="/academic-details/:prn" element={<AcademicDetails />} />

            {/* New Routes for Additional Sections */}
            <Route path="/residential-details" element={<ResidentialDetails />} />
            <Route path="/residential-details/:prn" element={<ResidentialDetails />} />

            <Route path="/pre-admission-academic-details" element={<PreAdmissionAcademicDetails />} />
            <Route path="/pre-admission-academic-details/:prn" element={<PreAdmissionAcademicDetails />} />

            <Route path="/post-admission-academic-details" element={<PostAdmissionAcademicDetails />} />
            <Route path="/post-admission-academic-details/:prn" element={<PostAdmissionAcademicDetails />} />

            <Route path="/observations" element={<Observations />} />
            <Route path="/observations/:prn" element={<Observations />} />

            {/* New Parent Details Route */}
            <Route path="/parent-details" element={<ParentDetails />} />
            <Route path="/parent-details/:prn" element={<ParentDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
