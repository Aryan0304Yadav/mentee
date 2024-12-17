import React, { useState } from 'react';
import "../styles/PreAdmissionAcademicDetails.css"; // Ensure the CSS file is imported

const PreAdmissionAcademicDetails = () => {
  const [attemptedJee, setAttemptedJee] = useState(null);
  const [jeePercentile, setJeePercentile] = useState('');

  const handleJeeSelection = (selection) => {
    setAttemptedJee(selection);
    if (selection === 'no') {
      setJeePercentile(''); // Reset JEE percentile if 'No' is selected
    }
  };

  return (
    <form className="form-academic-details">
      <h2>Pre Admission Academic Details</h2>
      
      {/* 10th and 12th Marks */}
      <div className="form-row">
        <label>10th Percentage:</label>
        <input
          type="number"
          name="tenthPercentage"
          placeholder="Enter 10th percentage"
        />
      </div>
      <div className="form-row">
        <label>12th Percentage:</label>
        <input
          type="number"
          name="twelfthPercentage"
          placeholder="Enter 12th percentage"
        />
      </div>
      <div className="form-row">
        <label>CET Percentile:</label>
        <input
          type="number"
          name="cetPercentile"
          placeholder="Enter CET percentile"
        />
      </div>

      {/* JEE Attempt */}
      <div className="form-row">
        <label>
          Did you attempt JEE?
        </label>
        <div className="yes-no-buttons">
          <button
            type="button"
            className={attemptedJee === 'yes' ? 'selected' : ''}
            onClick={() => handleJeeSelection('yes')}
          >
            Yes
          </button>
          <button
            type="button"
            className={attemptedJee === 'no' ? 'selected' : ''}
            onClick={() => handleJeeSelection('no')}
          >
            No
          </button>
        </div>
      </div>

      {/* JEE Percentile input appears only if 'Yes' is selected */}
      {attemptedJee === 'yes' && (
        <div className="form-row">
          <label>JEE Percentile:</label>
          <input
            type="number"
            name="jeePercentile"
            placeholder="Enter JEE percentile"
            value={jeePercentile}
            onChange={(e) => setJeePercentile(e.target.value)}
          />
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default PreAdmissionAcademicDetails;
