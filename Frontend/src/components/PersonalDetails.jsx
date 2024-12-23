import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DateTime } from "luxon";
import "../styles/PersonalDetails.css";

const PersonalDetails = () => {
  const { prn } = useParams();
  const [formData, setFormData] = useState({
    photo: null,
    branch: "",
    ac_id: "",
    fullname: "",
    date_of_birth: "",
    year_of_admission: "",
    mother_tongue: "",
    blood_group: "",
    health_problems: "",
    current_address: "",
    father_name: "",
    father_occupation: "",
    father_mobile_number: "",
    landline: "",
    mother_name: "",
    mother_occupation: "",
    mother_mobile_number: "",
    email: "",
    residenceOption: "",
    relativeName: "",
    relativeContact: "",
    guardianName: "",
    guardianContact: "",
    friendName: "",
    friendContact: "",
    hostelName: "",
    hostelContact: "",
  });

  const [isEditable, setIsEditable] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isChangesSaved, setIsChangesSaved] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `https://mentor-mentee-backend.vercel.app/students/${prn}`
        );
        const studentData = response.data;

        if (studentData.date_of_birth) {
          studentData.date_of_birth = DateTime.fromISO(
            studentData.date_of_birth
          ).toISODate();
        }

        setFormData(studentData);
      } catch (error) {
        console.error("Error fetching student data or branch:", error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPopup(true); // Show confirmation popup
  };

  const handlePopupClose = async () => {
    setShowPopup(false); // Hide confirmation popup

    try {
      const updatedData = {
        ...formData,
        date_of_birth: DateTime.fromISO(formData.date_of_birth).toISO(),
      };

      await axios.put(
        `https://mentor-mentee-backend.vercel.app/students/${prn}`,
        updatedData
      );

      setTimeout(() => {
        alert("Student details updated successfully"); // Show alert after the popup is closed
      }, 0);
    } catch (error) {
      console.error("Error updating student details:", error);
    }
  };

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
      <h2>Fill Your Form</h2>

      {/* Editable Fields Section */}
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
              name="father_mobile_number"
              value={formData.father_mobile_number}
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

        {/* Edit Button */}
        <button type="button" onClick={handleEdit} disabled={isEditable}>
          Edit
        </button>

        {/* Save Changes Button */}
        {isEditable && (
          <button type="button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        )}

        {/* Submit Button */}
        <button type="submit" disabled={!isChangesSaved}>
          Submit
        </button>
      </div>

      {/* Non-editable Fields Section */}
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

export default PersonalDetails;
