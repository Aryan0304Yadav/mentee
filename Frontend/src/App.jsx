import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Profile from './components/Profile';
import PersonalDetails from './components/PersonalDetails';
import MiscDetails from './components/MiscDetails';
import AcademicDetails from './components/AcademicDetails'; // Import AcademicDetails component
import './App.css';

const App = () => {
  return (
    <Router>
      <div className='dashboard'>
        <Sidebar />
        <div className="dashboard--content">
          <Routes>
            {/* Redirect root path to /dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<><Content /><Profile /></>} />
            <Route path="/dashboard/:prn" element={<><Content /><Profile /></>} />

            <Route path="/personal-details" element={<PersonalDetails />} />
            <Route path="/personal-details/:prn" element={<PersonalDetails />} />

            <Route path="/MiscDetails" element={<MiscDetails />} />
            <Route path="/MiscDetails/:prn" element={<MiscDetails />} />

            {/* Add route for AcademicDetails */}
            <Route path="/academic-details" element={<AcademicDetails />} />
            <Route path="/academic-details/:prn" element={<AcademicDetails />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
