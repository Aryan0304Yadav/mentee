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

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`https://mentor-mentee-backend.vercel.app/students/${prn}`);
        const studentData = response.data;

        if (studentData.date_of_birth) {
          studentData.date_of_birth = DateTime.fromISO(studentData.date_of_birth).toISODate();
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
    setShowPopup(true); // Show popup before submitting

    try {
      const updatedData = {
        ...formData,
        date_of_birth: DateTime.fromISO(formData.date_of_birth).toISO(),
      };

      await axios.put(`https://mentor-mentee-backend.vercel.app/students/${prn}`, updatedData);
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
            Current Address:
            <textarea
              name="current_address"
              value={formData.current_address}
              readOnly
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Father's Name:
            <input
              type="text"
              name="father_name"
              value={formData.father_name}
              readOnly
            />
          </label>

          <label>
            Father's Occupation:
            <input
              type="text"
              name="father_occupation"
              value={formData.father_occupation}
              readOnly
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Father's Phone Number:
            <input
              type="tel"
              name="father_mobile_number"
              value={formData.father_mobile_number}
              readOnly
            />
          </label>

          <label>
            Residential Landline:
            <input
              type="tel"
              name="landline"
              value={formData.landline}
              readOnly
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Mother's Name:
            <input
              type="text"
              name="mother_name"
              value={formData.mother_name}
              readOnly
            />
          </label>

          <label>
            Mother's Occupation:
            <input
              type="text"
              name="mother_occupation"
              value={formData.mother_occupation}
              readOnly
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Mother's Phone Number:
            <input
              type="tel"
              name="mother_mobile_number"
              value={formData.mother_mobile_number}
              readOnly
            />
          </label>

          <label>
            Residence Option:
            <input
              type="text"
              name="residenceOption"
              value={formData.residenceOption}
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

      <button type="submit">Submit</button>
    </form>
  );
};

export default PersonalDetails;
