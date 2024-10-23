import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams hook
import { DateTime } from "luxon";

import "../styles/PersonalDetails.css";

const PersonalDetails = () => {
  const { prn } = useParams(); // Get PRN from URL parameters
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

  
  // Fetch student details and branch based on ac_id
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // const response = await axios.get(`http://localhost:8800/students/${prn}`);
        const response = await axios.get(`https://mentor-mentee-backend.vercel.app/students/${prn}`);

        const studentData = response.data;

        // Convert date_of_birth from the API to a Luxon DateTime object for easy manipulation
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

  // const handleFileChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     photo: e.target.files[0],
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure date_of_birth is in ISO format for submission
      const updatedData = {
        ...formData,
        date_of_birth: DateTime.fromISO(formData.date_of_birth).toISO(), // Convert back to ISO format
      };

      await axios.put(`https://mentor-mentee-backend.vercel.app/students/${prn}`, updatedData);
      alert("Student details updated successfully");
    } catch (error) {
      console.error("Error updating student details:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-details-form">
      <h2>Fill Your Form</h2>

      {/* Row 1: Photo upload and Branch selection */}
      <div className="form-row">
        {/* <label>
          Upload Your Photo:
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </label> */}<label>
  Upload Your Photo:
  <input
    type="text"
    name="photo"
    value={formData.photo}
    onChange={handleChange}
    required
  />
</label>

        

        <label>
          Select Branch:
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
          >
            <option value="">Select your branch</option>
            <option value="ECS">ECS</option>
            <option value="EXTC">EXTC</option>
            <option value="IT">IT</option>
            <option value="CE">CE</option>
            <option value="AIDS">AIDS</option>
            <option value="AIML">AIML</option>
            <option value="MECH">MECH</option>
            <option value="IOT">IOT</option>
          </select>
        </label>
      </div>

      {/* Row 2: Full Name and Date of Birth */}
      <div className="form-row">
        <label>
          Full Name:
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date of Birth:
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      {/* Row 3: Year of Admission and Mother Tongue */}
      <div className="form-row">
        <label>
          Year of Admission:
          <input
            type="text"
            name="year_of_admission"
            value={formData.year_of_admission}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mother Tongue:
          <input
            type="text"
            name="mother_tongue"
            value={formData.mother_tongue}
            onChange={handleChange}
            required
          />
        </label>
      </div>

          <div className="form-row">
          <label>
        Current Address:
        <textarea
          name="current_address"
          value={formData.current_address}
          onChange={handleChange}
          required
        />
      </label> 
          </div>

      {/* Row 4: Father's Name and Occupation */}
      <div className="form-row">
        <label>
          Father's Name:
          <input
            type="text"
            name="father_name"
            value={formData.father_name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Father's Occupation:
          <input
            type="text"
            name="fathersOccupation"
            value={formData.father_occupation}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      {/* Row 5: Father's Phone Number and Residential Landline */}
      <div className="form-row">
        <label>
          Father's Phone Number:
          <input
            type="tel"
            name="father_mobile_number"
            value={formData.father_mobile_number} 
            onChange={handleChange}
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
          />
        </label>
      </div>

      {/* Row 6: Mother's Details */}
      <div className="form-row">
        <label>
          Mother's Name:
          <input
            type="text"
            name="mother_name"
            value={formData.mother_name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mother's Occupation:
          <input
            type="text"
            name="mother_occupation"
            value={formData.mother_occupation}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      {/* Row 7: Mother's Phone Number and Email */}
      <div className="form-row">
        <label>
          Mother's Phone Number:
          <input
            type="tel"
            name="mother_mobile_number"
            value={formData.mother_mobile_number}
            onChange={handleChange}
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
            required
          />
        </label>
      </div>

      {/* Question asking if not residing with parents */}
      <div className="form-row">
        <label>
          If not residing currently with your parents, provide the following details (Tick appropriate option):
        </label>
      </div>

      {/* Options for Relative, Guardian, Friend, Hostel */}
      <div className="form-row">
        <label>
          <input
            type="radio"
            name="residenceOption"
            value="relative"
            checked={formData.residenceOption === "relative"}
            onChange={handleChange}
          />
          Relative
        </label>

        <label>
          <input
            type="radio"
            name="residenceOption"
            value="guardian"
            checked={formData.residenceOption === "guardian"}
            onChange={handleChange}
          />
          Guardian
        </label>

        <label>
          <input
            type="radio"
            name="residenceOption"
            value="friend"
            checked={formData.residenceOption === "friend"}
            onChange={handleChange}
          />
          Friend
        </label>

        <label>
          <input
            type="radio"
            name="residenceOption"
            value="hostel"
            checked={formData.residenceOption === "hostel"}
            onChange={handleChange}
          />
          Hostel
        </label>
      </div>

      {/* Fields for Relative/Guardian/Friend/Hostel details */}
      {formData.residenceOption && (
  <div className="form-row">
    <label>
      {`${formData.residenceOption.charAt(0).toUpperCase() + formData.residenceOption.slice(1)}'s Name:`}
      <input
        type="text"
        name={`${formData.residenceOption}Name`}
        value={formData[`${formData.residenceOption}Name`] || ''}
        onChange={handleChange}
      />
    </label>

    <label>
      {`${formData.residenceOption.charAt(0).toUpperCase() + formData.residenceOption.slice(1)}'s Contact Number:`}
      <input
        type="tel"
        name={`${formData.residenceOption}Contact`}
        value={formData[`${formData.residenceOption}Contact`] || ''}
        onChange={handleChange}
      />
    </label>
  </div>
)}
      <button type="submit">Submit</button>
    </form>
  );
};

export default PersonalDetails;