import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ResidentialDetails.css";

const ResidentialDetails = () => {
  const permanent = React.useRef("");

  const { prn } = useParams();
  const [formData, setFormData] = useState({
    currently_living_with: "",
    current_address: "",
    permanent_address: "",
    state_of_residence: "Maharashtra", // Default to Maharashtra
    area_of_residence: "",
  });

  const [isEditable, setIsEditable] = useState(false); // State to toggle edit mode
  const [showPopup, setShowPopup] = useState(false); // State to show confirmation popup
  const [isSameAddress, setIsSameAddress] = useState(false); // State for Yes/No button for copying address
  const [isChangesSaved, setIsChangesSaved] = useState(false); // Track if changes are saved

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
          `http://localhost:3000/mentee/residential-details-fetch/${prn}`
        );
        permanent.current = response.data.old_permanent_address;
        setFormData({
          current_address: response.data.old_current_address,
          permanent_address: response.data.old_permanent_address,
          state_of_residence: response.data.old_state,
          area_of_residence: response.data.old_area,
          currently_living_with: response.data.old_currently_living_with
        }); // Pre-fill form with fetched data
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
    setFormData((prevState) => {
      const updatedData = { ...prevState, [name]: value };

      // If "Yes" is selected for "same as permanent address", automatically copy current address to permanent address
      if (isSameAddress) {
        if (name.includes("current_address")) {
          updatedData.permanent_address = updatedData.current_address;
        }
      }

      return updatedData;
    });
  };

  const handleYesNoChange = (answer) => {
    setIsSameAddress(answer === "yes");

    if (answer === "yes") {
      // Automatically copy current address to permanent address when 'Yes' is selected
      setFormData((prevState) => ({
        ...prevState,
        permanent_address: prevState.current_address,
      }));
    } else {
      // Optionally reset permanent address fields if "No" is selected
      setFormData((prevState) => ({
        ...prevState,
        permanent_address: permanent.current,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowPopup(true); // Show the dialog box
  };

  const handleClosePopup = async () => {
    setShowPopup(false); // Close the dialog box

    try {
      const updatedData = {
        new_currently_living_with: formData.currently_living_with,
        new_current_address: formData.current_address,
        new_permanent_address: formData.permanent_address,
        new_state: formData.state_of_residence,
        new_area: formData.area_of_residence,
      };
      await axios.put(
        `http://localhost:3000/mentee/residential-details-put/${prn}`,
        updatedData
      );
      alert("Residential details updated successfully"); // Trigger the alert
    } catch (error) {
      console.error("Error updating residential details:", error);
    }
  };

  const handleEdit = () => {
    setIsEditable(true); // Enable editing
  };

  const handleSaveChanges = () => {
    setIsEditable(false);
    setIsChangesSaved(true); // Mark changes as saved
    alert("Changes saved successfully!");
  };


  return (
    <form onSubmit={handleSubmit} className="form-details-form">
      <h2>Residential Details</h2>
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
          Current Address:
          <textarea
            name="current_address"
            value={formData.current_address}
            onChange={handleChange}
            readOnly={!isEditable}
            required
          />
        </label>

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
          <textarea
            name="permanent_address"
            value={formData.permanent_address}
            onChange={handleChange}
            readOnly={isSameAddress || !isEditable} // Make it readonly if "Yes" is selected or not in edit mode
            required
          />
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

      {
        showPopup && (
          <div className="popup">
            <p>Submitting Changes for Approval</p>
            <button type="button" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        )
      }

      {isChangesSaved && <button type="submit">Submit</button>}
    </form >
  );
};

export default ResidentialDetails;