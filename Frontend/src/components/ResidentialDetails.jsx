import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ResidentialDetails.css";

const ResidentialDetails = () => {
  const permanent = useRef("");
  const current = useRef("");
  const { prn } = useParams();

  const [formData, setFormData] = useState({
    currently_living_with: "",
    current_address: "",
    permanent_address: "",
    state_of_residence: "Maharashtra",
    area_of_residence: "",
  });

  const [originalData, setOriginalData] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [isChangesSaved, setIsChangesSaved] = useState(false);

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
    "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep",
    "Delhi", "Puducherry",
  ];

  useEffect(() => {
    const fetchResidentialData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/mentee/residential-details-fetch/${prn}`
        );
        const data = {
          currently_living_with: response.data.old_currently_living_with || "",
          current_address: response.data.old_current_address || "",
          permanent_address: response.data.old_permanent_address || "",
          state_of_residence: response.data.old_state || "Maharashtra",
          area_of_residence: response.data.old_area || "",
        };
        permanent.current = data.permanent_address; // Store original permanent address
        current.current = data.current_address; // Store original current address
        setFormData(data);
        setOriginalData(data);
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
      if (isSameAddress && name === "current_address") {
        updatedData.permanent_address = value;
      }
      return updatedData;
    });
  };

  const handleYesNoChange = (answer) => {
    setIsSameAddress(answer === "yes");
    if (answer === "yes") {
      setFormData((prevState) => ({
        ...prevState,
        permanent_address: prevState.current_address,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        permanent_address: permanent.current,
      }));
    }
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setIsEditable(false);
    setIsSameAddress(false);
    setIsChangesSaved(false);
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

  const handleClosePopup = () => {
    setShowPopup(false);
    setIsChangesSaved(false);
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
            disabled={!isEditable}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => handleYesNoChange("no")}
            className={!isSameAddress ? "selected" : ""}
            disabled={!isEditable}
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
            readOnly={isSameAddress || !isEditable}
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
      </div>

      {isChangesSaved && !isEditable && <button type="submit">Submit</button>}

      {showPopup && (
        <div className="popup">
          <p>Submitting Changes for Approval</p>
          <button type="button" onClick={handleClosePopup}>
            Close
          </button>
        </div>
      )}
    </form>
  );
};

export default ResidentialDetails;
