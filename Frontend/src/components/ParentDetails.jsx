import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ParentDetails.css";

const ParentDetails = () => {
  const { prn } = useParams();
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

  const [originalData, setOriginalData] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChangesSaved, setIsChangesSaved] = useState(false);

  useEffect(() => {
    const fetchParentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/mentee/parent-details-fetch/${prn}`
        );
        const fetchedData = {
          father_name: response.data.old_father_name || "",
          father_mobile_number: response.data.old_father_phone || "",
          father_occupation: response.data.old_father_occupation || "",
          mother_name: response.data.old_mother_name || "",
          mother_mobile_number: response.data.old_mother_phone || "",
          mother_occupation: response.data.old_mother_occupation || "",
          guardian_name: response.data.old_guardian_name || "",
          guardian_mobile_number: response.data.old_guardian_phone || "",
          guardian_occupation: response.data.old_guardian_occupation || "",
        };
        setFormData(fetchedData);
        setOriginalData(fetchedData);
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

  const handleSaveChanges = () => {
    setOriginalData({ ...formData });
    setIsEditable(false);
    setIsChangesSaved(true);
    alert("Changes saved successfully!");
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setIsEditable(false);
    setIsChangesSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setIsChangesSaved(false); 
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

      {!isEditable ? (
        <button type="button" onClick={handleEdit}>
          Edit
        </button>
      ) : (
        <>
          <button type="button" onClick={handleSaveChanges}>
            Save Changes
          </button>
          <button type="button" onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </>
      )}

      {isChangesSaved && !isEditable && (
        <button type="submit">Submit</button>
      )}

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
