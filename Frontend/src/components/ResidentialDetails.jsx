import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ResidentialDetails.css"; 

const ResidentialDetails = () => {
  const { prn } = useParams();
  const [formData, setFormData] = useState({
    currently_living_with: "",
    current_address_line_1: "",
    current_address_line_2: "",
    current_address_pincode: "",
    permanent_address_line_1: "",
    permanent_address_line_2: "",
    permanent_address_pincode: "",
    state_of_residence: "Maharashtra", // Default to Maharashtra
    area_of_residence: "",
  });

  const [isEditable, setIsEditable] = useState(false); // State to toggle edit mode
  const [showPopup, setShowPopup] = useState(false); // State to show confirmation popup
  const [isSameAddress, setIsSameAddress] = useState(false); // State for Yes/No button for copying address
  const [formErrors, setFormErrors] = useState({}); // To track form validation errors
  const [isFormValid, setIsFormValid] = useState(true); // Track if the form is valid for submission

  // List of all states in India
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", 
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
    "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
    "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", 
    "Delhi", "Puducherry"
  ];

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

    // Clear error when user changes the input
    if (name.includes("pincode")) {
      setFormErrors({ ...formErrors, [name]: "" });
      validateForm();
    }
  };

  const handleYesNoChange = (answer) => {
    setIsSameAddress(answer === "yes");
    if (answer === "yes") {
      setFormData({
        ...formData,
        permanent_address_line_1: formData.current_address_line_1,
        permanent_address_line_2: formData.current_address_line_2,
        permanent_address_pincode: formData.current_address_pincode,
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    // Check if PINCODE is valid
    if (!/^\d{6}$/.test(formData.current_address_pincode)) {
      errors.current_address_pincode = "Current Pincode must be a 6-digit number.";
    }

    if (!/^\d{6}$/.test(formData.permanent_address_pincode)) {
      errors.permanent_address_pincode = "Permanent Pincode must be a 6-digit number.";
    }

    // Check if any required field is empty
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "" && key !== "state_of_residence") {
        errors[key] = `${key.replace(/_/g, " ")} is required`;
      }
    });

    // If errors exist, set isFormValid to false, else true
    if (Object.keys(errors).length > 0) {
      setIsFormValid(false);
      setFormErrors(errors);
    } else {
      setIsFormValid(true);
      setFormErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If form is invalid, don't submit
    if (!isFormValid) return;

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

          {/* Current Address - 3 separate input fields */}
          <label>
            Current Address Line 1:
            <input
              type="text"
              name="current_address_line_1"
              value={formData.current_address_line_1}
              onChange={handleChange}
              readOnly={!isEditable}
              required
            />
          </label>

          <label>
            Current Address Line 2:
            <input
              type="text"
              name="current_address_line_2"
              value={formData.current_address_line_2}
              onChange={handleChange}
              readOnly={!isEditable}
              required
            />
          </label>

          <label>
            Current Pincode:
            <input
              type="text"
              name="current_address_pincode"
              value={formData.current_address_pincode}
              onChange={handleChange}
              readOnly={!isEditable}
              required
              pattern="\d{6}" // Ensure it's exactly 6 digits
              title="Pincode must be 6 digits"
            />
            {formErrors.current_address_pincode && (
              <span className="error">{formErrors.current_address_pincode}</span>
            )}
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

          {/* Permanent Address - 3 separate input fields */}
          <label>
            Permanent Address Line 1:
            <input
              type="text"
              name="permanent_address_line_1"
              value={formData.permanent_address_line_1}
              onChange={handleChange}
              readOnly={!isEditable}
              required
            />
          </label>

          <label>
            Permanent Address Line 2:
            <input
              type="text"
              name="permanent_address_line_2"
              value={formData.permanent_address_line_2}
              onChange={handleChange}
              readOnly={!isEditable}
              required
            />
          </label>

          <label>
            Permanent Pincode:
            <input
              type="text"
              name="permanent_address_pincode"
              value={formData.permanent_address_pincode}
              onChange={handleChange}
              readOnly={!isEditable}
              required
              pattern="\d{6}" // Ensure it's exactly 6 digits
              title="Pincode must be 6 digits"
            />
            {formErrors.permanent_address_pincode && (
              <span className="error">{formErrors.permanent_address_pincode}</span>
            )}
          </label>

          <label>
            State of Residence:
            <select
              name="state_of_residence"
              value={formData.state_of_residence}
              onChange={handleChange}
              disabled={!isEditable}
              required
            >
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
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
          <button type="button" onClick={handleSaveChanges} disabled={!isFormValid}>
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

      <button type="submit" disabled={!isFormValid}>Submit</button>
    </form>
  );
};

export default ResidentialDetails;