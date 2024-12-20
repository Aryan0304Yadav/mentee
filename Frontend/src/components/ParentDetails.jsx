import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ParentDetails.css";

const ParentDetails = () => {
  const { prn } = useParams(); // Capture 'prn' from the route
  const [formData, setFormData] = useState({
    father_name: "",
    father_occupation: "",
    father_mobile_number: "",
    mother_name: "",
    mother_occupation: "",
    mother_mobile_number: "",
    guardian_name: "",
    guardian_occupation: "",
    guardian_mobile_number: "",
  });

  const [isEditable, setIsEditable] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Fetch parent details when the component mounts
  useEffect(() => {
    const fetchParentDetails = async () => {
      try {
        const response = await axios.get(
          `https://run.mocky.io/v3/b0f4943a-0bd1-406a-a596-849e0f07fe48`
        );
        setFormData(response.data); // Populate the form with fetched data
      } catch (error) {
        console.error("Error fetching parent details:", error);
      }
    };

    if (prn) {
      fetchParentDetails();
    }
  }, [prn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `https://mentor-mentee-backend.vercel.app/parents/${prn}`,
        formData
      );
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating parent details:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true); // Show confirmation popup before submission
  };

  const handleClosePopup = async () => {
    setShowPopup(false); // Close the first popup

    try {
      await axios.put(
        `https://mentor-mentee-backend.vercel.app/parents/${prn}`,
        formData
      );

      // After the API request completes, show the success alert
      setShowSuccessAlert(true);
    } catch (error) {
      console.error("Error submitting parent details:", error);
    }
  };

  useEffect(() => {
    if (showSuccessAlert) {
      alert("Parent details submitted successfully!"); // Display the success alert once after the form is submitted
      setShowSuccessAlert(false); // Reset the success alert state
    }
  }, [showSuccessAlert]);

  return (
    <form onSubmit={handleSubmit} className="form-details-form">
      <h2>Parent Details</h2>

      <div className="editable-section">
        <h3>Father's Details</h3>
        <div className="form-row">
          <label>
            Name:
            <input
              type="text"
              name="father_name"
              value={formData.father_name}
              onChange={handleChange}
              readOnly={!isEditable}
            />
          </label>
          <label>
            Occupation:
            <input
              type="text"
              name="father_occupation"
              value={formData.father_occupation}
              onChange={handleChange}
              readOnly={!isEditable}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Mobile Number:
            <input
              type="tel"
              name="father_mobile_number"
              value={formData.father_mobile_number}
              onChange={handleChange}
              readOnly={!isEditable}
            />
          </label>
        </div>
      </div>

      <div className="editable-section">
        <h3>Mother's Details</h3>
        <div className="form-row">
          <label>
            Name:
            <input
              type="text"
              name="mother_name"
              value={formData.mother_name}
              onChange={handleChange}
              readOnly={!isEditable}
            />
          </label>
          <label>
            Occupation:
            <input
              type="text"
              name="mother_occupation"
              value={formData.mother_occupation}
              onChange={handleChange}
              readOnly={!isEditable}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Mobile Number:
            <input
              type="tel"
              name="mother_mobile_number"
              value={formData.mother_mobile_number}
              onChange={handleChange}
              readOnly={!isEditable}
            />
          </label>
        </div>
      </div>

      <div className="editable-section">
        <h3>Guardian's Details</h3>
        <div className="form-row">
          <label>
            Name:
            <input
              type="text"
              name="guardian_name"
              value={formData.guardian_name}
              onChange={handleChange}
              readOnly={!isEditable}
            />
          </label>
          <label>
            Occupation:
            <input
              type="text"
              name="guardian_occupation"
              value={formData.guardian_occupation}
              onChange={handleChange}
              readOnly={!isEditable}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Mobile Number:
            <input
              type="tel"
              name="guardian_mobile_number"
              value={formData.guardian_mobile_number}
              onChange={handleChange}
              readOnly={!isEditable}
            />
          </label>
        </div>
      </div>

      {/* Buttons Container */}
      <div className="button-container">
        {!isEditable ? (
          <button type="button" onClick={handleEdit}>
            Edit
          </button>
        ) : (
          <button type="button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        )}
        <button type="submit">Submit</button>
      </div>

      {/* Pop-up Confirmation */}
      {showPopup && (
        <div className="popup">
          <p>Submitting Changes for Approval</p>
          <button type="button" onClick={handleClosePopup}>
            Close
          </button>
        </div>
      )}
    </form>
  );
};

export default ParentDetails;
