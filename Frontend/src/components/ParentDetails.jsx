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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChangesSaved, setIsChangesSaved] = useState(false); // Track if changes are saved

  // Fetch parent details when the component mounts
  useEffect(() => {
    const fetchParentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/mentee/parent-details-fetch/${prn}`
        );
        setFormData({
          father_name: response.data.old_father_name,
          father_mobile_number: response.data.old_father_phone,
          father_occupation: response.data.old_father_occupation,
          mother_name: response.data.old_mother_name,
          mother_mobile_number: response.data.old_mother_phone,
          mother_occupation: response.data.old_mother_occupation,
          guardian_name: response.data.old_guardian_name,
          guardian_mobile_number: response.data.old_guardian_phone,
          guardian_occupation: response.data.old_guardian_occupation,
        }); // Populate the form with fetched data
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true); // Show confirmation popup before submission
  };

  const handlePopupClose = async () => {
    setShowPopup(false);
    setIsSubmitting(true); // Trigger submission after popup is closed
  };

  useEffect(() => {
    const submitData = async () => {
      if (isSubmitting) {
        try {
          const updatedData = {
            new_father_name: formData.father_name,
            new_father_phone: formData.father_mobile_number,
            new_father_occupation: formData.father_occupation,
            new_mother_name: formData.mother_name,
            new_mother_phone: formData.mother_mobile_number,
            new_mother_occupation: formData.mother_occupation,
            new_guardian_name: formData.guardian_name,
            new_guardian_phone: formData.guardian_mobile_number,
            new_guardian_occupation: formData.guardian_occupation,
          };

          await axios.put(
            `http://localhost:3000/mentee/parent-details-put/${prn}`,
            updatedData
          );
          alert("Parent details submitted successfully!");
        } catch (error) {
          console.error("Error submitting parent details:", error);
        } finally {
          setIsSubmitting(false); // Reset submission state
        }
      }
    };

    submitData();
  }, [isSubmitting, prn, formData]);

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSaveChanges = () => {
    setIsEditable(false);
    setIsChangesSaved(true); // Mark changes as saved
    alert("Changes saved successfully!");
  };

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

      {/* Buttons */}
      {!isEditable ? (
        <button type="button" onClick={handleEdit}>
          Edit
        </button>
      ) : (
        <button type="button" onClick={handleSaveChanges}>
          Save Changes
        </button>
      )}
      {isChangesSaved && <button type="submit">Submit</button>}

      {/* Pop-up Confirmation */}
      {showPopup && (
        <div className="popup">
          <p>Submitting Changes for Approval</p>
          <button type="button" onClick={handlePopupClose}>
            Close
          </button>
        </div>
      )}
    </form>
  );
};

export default ParentDetails;
