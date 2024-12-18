import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ResidentialDetails.css"; 

const ResidentialDetails = () => {
  const { prn } = useParams();
  const [formData, setFormData] = useState({
    currently_living_with: "",
    current_address: "",
    permanent_address: "",
    state_of_residence: "",
    area_of_residence: "",
  });

  const [isEditable, setIsEditable] = useState(false); // State to toggle edit mode
  const [showPopup, setShowPopup] = useState(false); // State to show confirmation popup
  const [isSameAddress, setIsSameAddress] = useState(false); // State for Yes/No button for copying address

  // Fetch student residential details based on prn
  useEffect(() => {
    const fetchResidentialData = async () => {
      try {
        const response = await axios.get(
          `https://mentor-mentee-backend.vercel.app/residential-details/${prn}`
        );
        const residentialData = response.data;
        setFormData(residentialData); // Pre-fill form with fetched data
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

  const handleYesNoChange = (answer) => {
    setIsSameAddress(answer === "yes");
    if (answer === "yes") {
      setFormData({
        ...formData,
        permanent_address: formData.current_address,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPopup(true); // Show popup before submitting

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

  const handleEdit = () => {
    setIsEditable(true); // Enable editing
  };

  const handleSaveChanges = () => {
    setIsEditable(false); // Disable editing
    alert("Changes saved successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="form-details-form">
      <h2>Residential Details</h2>

      {/* Editable Fields Section */}
      <div className="editable-section">
        <h3>Editable Information</h3>
        <div className="form-row">
          <label>
            Currently Living With:
            <select
              name="currently_living_with"
              value={formData.currently_living_with}
              onChange={handleChange}
              disabled={!isEditable}
              required
            >
              <option value="Parent">Parent</option>
              <option value="Guardian">Guardian</option>
              <option value="Relative">Relative</option>
              <option value="Friend">Friend</option>
              <option value="Hostel">Hostel</option>
            </select>
          </label>

          <label>
            Current/Correspondence Address:
            <input
              type="text"
              name="current_address"
              value={formData.current_address}
              onChange={handleChange}
              readOnly={!isEditable}
              required
            />
          </label>

          {/* Yes/No Button for Permanent Address */}
          <div className="yes-no-buttons">
            <label>Is the permanent address same as current?</label>
            <button
              type="button"
              onClick={() => handleYesNoChange("yes")}
              className={isSameAddress ? "selected" : ""}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => handleYesNoChange("no")}
              className={!isSameAddress ? "selected" : ""}
            >
              No
            </button>
          </div>

          <label>
            Permanent Address:
            <input
              type="text"
              name="permanent_address"
              value={formData.permanent_address}
              onChange={handleChange}
              readOnly={!isEditable}
              required
            />
          </label>

          <label>
            State of Residence:
            <input
              type="text"
              name="state_of_residence"
              value={formData.state_of_residence}
              onChange={handleChange}
              readOnly={!isEditable}
              required
            />
          </label>

          <label>
            Area of Residence:
            <input
              type="text"
              name="area_of_residence"
              value={formData.area_of_residence}
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

export default ResidentialDetails;
