import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DateTime } from "luxon";
import "../styles/PersonalDetails.css";

const PersonalDetails = () => {
  const { prn } = useParams();
  const [formData, setFormData] = useState({
    fullname: "",
    date_of_birth: "",
    branch: "",
    year_of_admission: "",
    mother_tongue: "",
    blood_group: "",
    health_problems: "",
    student_mobile_number: "",
    landline: "",
    email: "",
  });

  const [originalData, setOriginalData] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isChangesSaved, setIsChangesSaved] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/mentee/personal-details-fetch/${prn}`
        );

        if (response.data.dob) {
          response.data.dob = DateTime.fromISO(response.data.dob).toISODate();
        }

        const fetchedData = {
          fullname: response.data.old_name || "",
          date_of_birth: response.data.dob || "",
          branch: response.data.branch || "",
          year_of_admission: response.data.year_of_admission || "",
          mother_tongue: response.data.mother_tongue || "",
          blood_group: response.data.blood_group || "",
          health_problems: response.data.old_health_problems || "",
          student_mobile_number: response.data.old_student_phone || "",
          landline: response.data.old_res_landline || "",
          email: response.data.old_student_email || "",
        };

        setFormData(fetchedData);
        setOriginalData({ ...fetchedData }); 
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    if (prn) {
      fetchStudentData();
    }
  }, [prn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setIsEditable(true);
    
  };

  const handleCancel = () => {
    setFormData({ ...originalData }); 
    setIsEditable(false);
    setIsChangesSaved(false);
  
    // Force a re-render in case React's state batching skips immediate updates
    setTimeout(() => setFormData({ ...originalData }), 0);
  };

  const handleSaveChanges = () => {
    setOriginalData({ ...formData }); 
    setIsEditable(false);
    setIsChangesSaved(true);
    alert("Changes saved successfully!");
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
      <h2>Fill Your Form</h2>

      <div className="editable-section">
        <h3>Editable Information</h3>
        <div className="form-row">
          <label>
            Full Name:
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              readOnly={!isEditable}
              required
            />
          </label>

          <label>
            Phone Number:
            <input
              type="tel"
              name="student_mobile_number"
              value={formData.student_mobile_number}
              onChange={handleChange}
              readOnly={!isEditable}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={!isEditable}
              required
            />
          </label>

          <label>
            Residential Landline:
            <input
              type="tel"
              name="landline"
              value={formData.landline}
              onChange={handleChange}
              readOnly={!isEditable}
            />
          </label>

          <label>
            Health Problems:
            <textarea
              name="health_problems"
              value={formData.health_problems}
              onChange={handleChange}
              readOnly={!isEditable}
            />
          </label>
        </div>

        {!isEditable ? (
          <button type="button" onClick={handleEdit}>
            Edit
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={handleSaveChanges}
              className="save-button"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
            >
              Cancel
            </button>
          </>
        )}

        {isChangesSaved && <button type="submit">Submit</button>}
      </div>

      <div className="non-editable-section">
        <h3>Non-Editable Information</h3>
        <div className="form-row">
          <label>Branch:</label>
          <span>{formData.branch}</span>
        </div>

        <div className="form-row">
          <label>Date of Birth:</label>
          <span>{formData.date_of_birth}</span>
        </div>

        <div className="form-row">
          <label>Year of Admission:</label>
          <span>{formData.year_of_admission}</span>
        </div>

        <div className="form-row">
          <label>Mother Tongue:</label>
          <span>{formData.mother_tongue}</span>
        </div>

        <div className="form-row">
          <label>Blood Group:</label>
          <span>{formData.blood_group}</span>
        </div>
      </div>

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

export default PersonalDetails;
