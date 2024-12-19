import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import "../styles/PreAdmissionAcademicDetails.css"; // Ensure the CSS file is imported

const PreAdmissionAcademicDetails = () => {
  const [jeePercentile, setJeePercentile] = useState('');  // State for JEE Percentile
  const [showSubmitPopup, setShowSubmitPopup] = useState(false); // State to control submit pop-up visibility
  const [showNextButton, setShowNextButton] = useState(false); // State to control next button visibility
  const navigate = useNavigate(); // Use useNavigate for routing

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    setShowSubmitPopup(true); // Show the submit pop-up after form submission
  };

  // Function to handle closing the pop-up
  const handlePopupClose = () => {
    setShowSubmitPopup(false); // Close the submit pop-up
    setShowNextButton(true); // Show the "Go to Post Admission" button after closing the pop-up
  };

  // Function to navigate to the next page
  const handleNextPage = () => {
    navigate("/post-admission-academic-details"); // Navigate to PostAdmissionAcademicDetails
  };

  return (
    <form className="form-academic-details" onSubmit={handleSubmit}>
      <h2>Pre Admission Academic Details</h2>

      {/* Combined Section for Editable and Non-Editable Fields */}
      <div className="form-section">
        {/* Non-editable Information Section */}
        <h3>Uneditable Information</h3>

        <div className="form-row">
          <label>10th Percentage:</label>
          <input
            type="number"
            name="tenthPercentage"
            placeholder="Enter 10th percentage"
            readOnly={true}  // Fields are now read-only
          />
        </div>
        <div className="form-row">
          <label>12th Percentage:</label>
          <input
            type="number"
            name="twelfthPercentage"
            placeholder="Enter 12th percentage"
            readOnly={true}  // Fields are now read-only
          />
        </div>
        <div className="form-row">
          <label>CET Percentile:</label>
          <input
            type="number"
            name="cetPercentile"
            placeholder="Enter CET percentile"
            readOnly={true}  // Fields are now read-only
          />
        </div>

        <div className="form-row">
          <label>JEE Percentile:</label>
          <input
            type="number"
            name="jeePercentile"
            placeholder="Enter JEE percentile"
            value={jeePercentile}  // Default value for JEE Percentile
            readOnly={false}  // Allow changes here
            onChange={(e) => setJeePercentile(e.target.value)}  // Allow change only if editable
          />
        </div>

        {/* Permanent Message about the form section being uneditable */}
        <div className="uneditable-message">
          This section is uneditable.
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit">Submit</button>

      {/* Pop-up for Submit */}
      {showSubmitPopup && (
        <div className="popup">
          <p>Submitted, waiting for approval.</p>
          <button type="button" onClick={handlePopupClose}>
            Close
          </button>
        </div>
      )}

      {/* Show "Next" button after pop-up is closed */}
      {showNextButton && (
        <button type="button" onClick={handleNextPage}>
          Go to Post Admission Details
        </button>
      )}
    </form>
  );
};

export default PreAdmissionAcademicDetails;
