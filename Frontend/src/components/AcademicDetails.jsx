import React, { useState } from "react";
import axios from "axios";
import "../styles/AcademicDetails.css";

const AcademicDetails = () => {
  const [formData, setFormData] = useState({
    tenthPercentage: '',
    twelfthPercentage: '',
    cetPercentile: '',
    jeePercentile: '',
    sem1SGPA: '',
    sem2SGPA: '',
    sem3SGPA: '',
    sem4SGPA: '',
    sem5SGPA: '',
    sem6SGPA: '',
    sem7SGPA: '',
    sem8SGPA: '',
  });

  const [errors, setErrors] = useState({
    tenthPercentage: '',
    twelfthPercentage: '',
    cetPercentile: '',
    jeePercentile: '',
    sem1SGPA: '',
    sem2SGPA: '',
    sem3SGPA: '',
    sem4SGPA: '',
    sem5SGPA: '',
    sem6SGPA: '',
    sem7SGPA: '',
    sem8SGPA: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // Validation for SGPA should ensure values are between 0 and 10
    if (name.startsWith('sem') && (value < 0 || value > 10)) {
      setErrors({
        ...errors,
        [name]: 'SGPA must be between 0 and 10'
      });
    } else if ((name === 'tenthPercentage' || name === 'twelfthPercentage') && (value < 0 || value > 100)) {
      setErrors({
        ...errors,
        [name]: 'Percentage must be between 0 and 100'
      });
    } else if ((name === 'cetPercentile' || name === 'jeePercentile') && (value < 0 || value > 100)) {
      setErrors({
        ...errors,
        [name]: 'Percentile must be between 0 and 100'
      });
    } else {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noErrors = Object.values(errors).every(err => err === '');
    if (noErrors) {
      try {
        await axios.post(`http://localhost:8800/students/academic`, formData);
        alert("Academic details submitted successfully");
      } catch (error) {
        console.error("Error submitting academic details:", error);
      }
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="academic-details-form">
      <h2>Academic Details</h2>

      {/* 10th Percentage */}
      <div className="form-row">
        <label>
          10th Percentage:
          <input
            type="number"
            name="tenthPercentage"
            value={formData.tenthPercentage}
            onChange={handleChange}
            placeholder="Enter your 10th percentage"
            required
          />
        </label>
        {errors.tenthPercentage && <span className="error">{errors.tenthPercentage}</span>}
      </div>

      {/* 12th Percentage */}
      <div className="form-row">
        <label>
          12th Percentage:
          <input
            type="number"
            name="twelfthPercentage"
            value={formData.twelfthPercentage}
            onChange={handleChange}
            placeholder="Enter your 12th percentage"
            required
          />
        </label>
        {errors.twelfthPercentage && <span className="error">{errors.twelfthPercentage}</span>}
      </div>

      {/* CET Percentile */}
      <div className="form-row">
        <label>
          CET Percentile:
          <input
            type="number"
            name="cetPercentile"
            value={formData.cetPercentile}
            onChange={handleChange}
            placeholder="Enter your CET percentile"
          />
        </label>
        {errors.cetPercentile && <span className="error">{errors.cetPercentile}</span>}
      </div>

      {/* JEE Percentile */}
      <div className="form-row">
        <label>
          JEE Percentile:
          <input
            type="number"
            name="jeePercentile"
            value={formData.jeePercentile}
            onChange={handleChange}
            placeholder="Enter your JEE percentile"
          />
        </label>
        {errors.jeePercentile && <span className="error">{errors.jeePercentile}</span>}
      </div>

      {/* Semester-wise SGPA fields */}
      {Array.from({ length: 8 }, (_, i) => (
        <div className="form-row" key={i}>
          <label>
            Semester {i + 1} SGPA:
            <input
              type="number"
              name={`sem${i + 1}SGPA`}
              value={formData[`sem${i + 1}SGPA`]}
              onChange={handleChange}
              placeholder={`Enter your Semester ${i + 1} SGPA`}
              required
            />
          </label>
          {errors[`sem${i + 1}SGPA`] && <span className="error">{errors[`sem${i + 1}SGPA`]}</span>}
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default AcademicDetails;
