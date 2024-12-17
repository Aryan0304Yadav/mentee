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
    mother_tongue: "", // Set to empty string initially
  });

  // Fetch student details and branch based on ac_id
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
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
      <h2>Fill Your Personal Details</h2>

      {/* Row 1: Photo upload and Branch selection */}
      <div className="form-row">
        <label>
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
            disabled // Prevents the user from changing the value
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
          <select
            name="mother_tongue"
            value={formData.mother_tongue}
            onChange={handleChange}
            required
          >
            <option value="">Select your mother tongue</option>
            <option value="Marathi">Marathi</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Konkani">Konkani</option>
            <option value="Telugu">Telugu</option>
            <option value="Kannada">Kannada</option>
            <option value="Urdu">Urdu</option>
            <option value="Bengali">Bengali</option>
            <option value="Odia">Odia</option>
            <option value="Assamese">Assamese</option>
            <option value="Maithili">Maithili</option>
            <option value="Punjabi">Punjabi</option>
            <option value="Sanskrit">Sanskrit</option>
            <option value="Arabic">Arabic</option>
          </select>
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default PersonalDetails;
