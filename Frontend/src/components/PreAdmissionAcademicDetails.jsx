import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/PreAdmissionAcademicDetails.css";

const PreAdmissionAcademicDetails = () => {
  const [academicDetails, setAcademicDetails] = useState({});
  const navigate = useNavigate();

  // Fetch data from API using axios
  useEffect(() => {
    const fetchAcademicDetails = async () => {
      try {
        const response = await axios.get('https://run.mocky.io/v3/95e3bd8e-d45c-4592-95d0-aa9f4baf3bb2');
        setAcademicDetails(response.data);
      } catch (error) {
        console.error("Error fetching academic details:", error);
      }
    };
    fetchAcademicDetails();
  }, []);

  // Navigate to the next page
  const handleNextPage = () => {
    navigate("/post-admission-academic-details");
  };

  return (
    <div className="form-academic-details">
      <h2>Pre Admission Academic Details</h2>

      <div className="form-section">
        {/* 10th Percentage and Board */}
        <div className="form-row">
          <label>10th Percentage:</label>
          <input
            type="number"
            value={academicDetails.tenthPercentage || ''}
            readOnly
          />
        </div>
        <div className="form-row">
          <label>10th Board:</label>
          <input
            type="text"
            value={academicDetails.tenthBoard || ''}
            readOnly
          />
        </div>

        {/* 12th Percentage and Board */}
        <div className="form-row">
          <label>12th Percentage:</label>
          <input
            type="number"
            value={academicDetails.twelfthPercentage || ''}
            readOnly
          />
        </div>
        <div className="form-row">
          <label>12th Board:</label>
          <input
            type="text"
            value={academicDetails.twelfthBoard || ''}
            readOnly
          />
        </div>

        {/* Diploma Details */}
        <div className="form-row">
          <label>Diploma Percentage:</label>
          <input
            type="number"
            value={academicDetails.diplomaPercentage || ''}
            readOnly
          />
        </div>
        <div className="form-row">
          <label>Diploma Practiced Stream:</label>
          <input
            type="text"
            value={academicDetails.diplomaStream || ''}
            readOnly
          />
        </div>

        {/* JEE Percentile */}
        <div className="form-row">
          <label>JEE Percentile:</label>
          <input
            type="number"
            value={academicDetails.jeePercentile || ''}
            readOnly
          />
        </div>

        {/* CET Percentile */}
        <div className="form-row">
          <label>CET Percentile:</label>
          <input
            type="number"
            value={academicDetails.cetPercentile || ''}
            readOnly
          />
        </div>

        {/* Permanent Message */}
        <div className="uneditable-message">
          This section is uneditable and only displays fetched data.
        </div>
      </div>

      {/* Navigate to Post Admission Details */}
      <button type="button" onClick={handleNextPage}>
        Go to Post Admission Details
      </button>
    </div>
  );
};

export default PreAdmissionAcademicDetails;
