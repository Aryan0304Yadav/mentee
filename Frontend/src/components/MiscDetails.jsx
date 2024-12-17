import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/MiscDetails.css"; // Ensure the correct CSS file is imported

const MiscDetails = () => {
  const { prn } = useParams(); // Get PRN from URL
  const [miscDetails, setMiscDetails] = useState({
    emailAddress: '',
    phoneNumber: '',
    birthdate: '',
    interests: '',
    emergencyContactInfo: ''
  });

  // Simulating data fetching on mount
  useEffect(() => {
    setMiscDetails({
      emailAddress: 'student@example.com',
      phoneNumber: '9876543210',
      birthdate: '2000-01-01',
      interests: 'Reading, Coding, Gaming',
      emergencyContactInfo: 'John Doe, 9123456789'
    });
  }, [prn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMiscDetails({
      ...miscDetails,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would submit the form data (e.g., to a backend)
    console.log('Submitted:', miscDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="form-details-form">
      <h2>Miscellaneous Details</h2>

      {/* Email Address */}
      <div className="form-row">
        <label>
          Email Address:
          <input
            type="email"
            name="emailAddress"
            value={miscDetails.emailAddress}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      {/* Phone Number */}
      <div className="form-row">
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={miscDetails.phoneNumber}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      {/* Birthdate */}
      <div className="form-row">
        <label>
          Birthdate:
          <input
            type="date"
            name="birthdate"
            value={miscDetails.birthdate}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      {/* Interests */}
      <div className="form-row">
        <label>
          Interests:
          <textarea
            name="interests"
            value={miscDetails.interests}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      {/* Emergency Contact Info */}
      <div className="form-row">
        <label>
          Emergency Contact Info:
          <input
            type="text"
            name="emergencyContactInfo"
            value={miscDetails.emergencyContactInfo}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <button type="submit">Save Details</button>
    </form>
  );
};

export default MiscDetails;
