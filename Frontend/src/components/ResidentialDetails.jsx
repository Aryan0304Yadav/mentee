import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ResidentialDetails.css"; // Your CSS for the page

const ResidentialDetails = () => {
  const { prn } = useParams();
  const [formData, setFormData] = useState({
    currentLivingWith: "",
    currentAddress: "",
    permanentAddress: "",
    stateOfResidence: "",
    areaOfResidence: "",
  });
  const [isEditable, setIsEditable] = useState(false); // Tracks if form fields are editable

  useEffect(() => {
    const fetchResidentialData = async () => {
      try {
        const response = await axios.get(
          `https://mentor-mentee-backend.vercel.app/residential-details/${prn}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching residential details:", error);
      }
    };

    if (prn) {
      fetchResidentialData();
    }
  }, [prn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setIsEditable(true); // Make fields editable
  };

  const handleSaveChanges = async () => {
    setIsEditable(false); // Disable editing
    try {
      await axios.put(
        `https://mentor-mentee-backend.vercel.app/residential-details/${prn}`,
        formData
      );
      alert("Residential details updated successfully");
    } catch (error) {
      console.error("Error updating residential details:", error);
    }
  };

  return (
    <form className="form-details-form">
      <h2>Residential Details</h2>

      <div className="editable-section">
        <h3>Editable Information</h3>
        <div className="form-row">
          <label>
            Currently Living With:
            <select
              name="currentLivingWith"
              value={formData.currentLivingWith}
              onChange={handleChange}
              disabled={!isEditable}
              required
            >
              <option value="">Select...</option>
              <option value="Parent">Parent</option>
              <option value="Guardian">Guardian</option>
              <option value="Relative">Relative</option>
              <option value="Friend">Friend</option>
              <option value="Hostel">Hostel</option>
            </select>
          </label>

          <label>
            Current Address:
            <input
              type="text"
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
              disabled={!isEditable}
              required
            />
          </label>

          <label>
            Permanent Address:
            <input
              type="text"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </label>

          <label>
            State Of Residence:
            <input
              type="text"
              name="stateOfResidence"
              value={formData.stateOfResidence}
              onChange={handleChange}
              disabled={!isEditable}
              required
            />
          </label>

          <label>
            Area Of Residence:
            <input
              type="text"
              name="areaOfResidence"
              value={formData.areaOfResidence}
              onChange={handleChange}
              disabled={!isEditable}
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

      <div className="non-editable-section">
        <h3>Non-Editable Information</h3>
        {/* Add any fields that are non-editable here */}
      </div>
    </form>
  );
};

export default ResidentialDetails;
