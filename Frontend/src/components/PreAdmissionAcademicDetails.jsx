import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../styles/PreAdmissionAcademicDetails.css";

const PreAdmissionAcademicDetails = () => {

  const { prn } = useParams();
  const [academicDetails, setAcademicDetails] = useState({});

  // Fetch data from API using axios
  useEffect(() => {
    const fetchAcademicDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/mentee/pre-admission-academic-details-fetch/${prn}`);
        setAcademicDetails({
          tenthPercentage: response.data.ssc_percentage,
          tenthBoard: response.data.ssc_board,
          twelfthPercentage: response.data.hsc_percentage,
          twelfthBoard: response.data.hsc_board,
          diplomaPercentage: response.data.diploma_percentage,
          diplomaStream: response.data.diploma_stream,
          cetPercentile: response.data.cet_percentile,
          jeePercentile: response.data.jee_percentile
        });
      } catch (error) {
        console.error("Error fetching academic details:", error);
      }
    };
    fetchAcademicDetails();
  }, [prn]);

  return (
    <div className="form-academic-details">
      <h2>Pre Admission Academic Details</h2>

      <div className="form-section">
        {/* 10th Percentage and Board */}
        <div className="form-row">
          <label>10th Percentage:</label>
          <span>{academicDetails.tenthPercentage || ''}</span>
        </div>
        <div className="form-row">
          <label>10th Board:</label>
          <span>{academicDetails.tenthBoard || ''}</span>
        </div>

        {/* 12th Percentage and Board */}
        <div className="form-row">
          <label>12th Percentage:</label>
          <span>{academicDetails.twelfthPercentage || ''}</span>
        </div>
        <div className="form-row">
          <label>12th Board:</label>
          <span>{academicDetails.twelfthBoard || ''}</span>
        </div>

        {/* Diploma Details */}
        <div className="form-row">
          <label>Diploma Percentage:</label>
          <span>{academicDetails.diplomaPercentage || ''}</span>
        </div>
        <div className="form-row">
          <label>Diploma Practiced Stream:</label>
          <span>{academicDetails.diplomaStream || ''}</span>
        </div>

        {/* JEE Percentile */}
        <div className="form-row">
          <label>JEE Percentile:</label>
          <span>{academicDetails.jeePercentile || ''}</span>
        </div>

        {/* CET Percentile */}
        <div className="form-row">
          <label>CET Percentile:</label>
          <span>{academicDetails.cetPercentile || ''}</span>
        </div>
      </div>
    </div>
  );
};

export default PreAdmissionAcademicDetails;
