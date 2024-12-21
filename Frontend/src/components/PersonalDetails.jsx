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
    email: ""
  });

  const [isEditable, setIsEditable] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isChangesSaved, setIsChangesSaved] = useState(false); // Track if changes are saved

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/mentee/personal-details-fetch/${prn}`
        );
        // const studentData = response.data;

        if (response.data.dob) {
          response.data.dob = DateTime.fromISO(
            response.data.dob
          ).toISODate();
        }

        setFormData({
          fullname: response.data.old_name,
          date_of_birth: response.data.dob,
          branch: response.data.branch,
          year_of_admission: response.data.year_of_admission,
          mother_tongue: response.data.mother_tongue,
          blood_group: response.data.blood_group,
          health_problems: response.data.old_health_problems,
          student_mobile_number: response.data.old_student_phone,
          landline: response.data.old_res_landline,
          email: response.data.old_student_email
        });
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
    setShowPopup(true); // Show popup before submitting

    try {
      const updatedData = {
        ...formData,
        date_of_birth: DateTime.fromISO(formData.date_of_birth).toISO(),
      };

      await axios.put(
        `http://localhost:3000/mentee/personal-details-put/${prn}`,
        updatedData
      );
      alert("Student details updated successfully");
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
          <button type="button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        )}
        {isChangesSaved && <button type="submit">Submit</button>}
      </div>

      {/* Non-editable Fields Section */}
      <div className="non-editable-section">
        <h3>Non-Editable Information</h3>
        <div className="form-row">
          <label>
            Branch:
            <input
              type="text"
              name="branch"
              value={formData.branch}
              readOnly
            />
          </label>

          <label>
            Date of Birth:
            <input
              type="text"
              name="date_of_birth"
              value={formData.date_of_birth}
              readOnly
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Year of Admission:
            <input
              type="text"
              name="year_of_admission"
              value={formData.year_of_admission}
              readOnly
            />
          </label>

          <label>
            Mother Tongue:
            <input
              type="text"
              name="mother_tongue"
              value={formData.mother_tongue}
              readOnly
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Blood Group:
            <input
              type="text"
              name="blood_group"
              value={formData.blood_group}
              readOnly
            />
          </label>
        </div>
      </div>

      {/* Pop-up Confirmation */}
      {showPopup && (
        <div className="popup">
          <p>Submitting Changes for Approval</p>
          <button type="button" onClick={() => setShowPopup(false)}>
            Close
          </button>
        </div>
      )}

      {/* Submit Button appears only after Save Changes is clicked */}
    </form>
  );
};

export default PersonalDetails;
