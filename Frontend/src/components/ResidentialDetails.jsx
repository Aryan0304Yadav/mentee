import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams hook

import "../styles/ResidentialDetails.css"; // CSS for residential details

const ResidentialDetails = () => {
  const { prn } = useParams(); // Get PRN from URL parameters
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    postal_code: "",
    permanent_address: "",
    hostel_number: "", // Added field for hostel number
  });

  const [isPermanentAddressSame, setIsPermanentAddressSame] = useState(true); // State to track if permanent address is same as residential address

  // List of all states in India, with Maharashtra at the top
  const states = [
    "Maharashtra", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep", "Delhi", "Puducherry"
  ];

  // Fetch student residential details based on prn
  useEffect(() => {
    const fetchResidentialData = async () => {
      try {
        const response = await axios.get(`https://mentor-mentee-backend.vercel.app/residential-details/${prn}`);
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

  const handlePermanentAddressSameChange = (e) => {
    setIsPermanentAddressSame(e.target.value === "yes");
    if (e.target.value === "yes") {
      setFormData({ ...formData, permanent_address: "" }); // Clear permanent address if yes is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://mentor-mentee-backend.vercel.app/residential-details/${prn}`, formData);
      alert("Residential details updated successfully");
    } catch (error) {
      console.error("Error updating residential details:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-details-form">
      <h2>Residential Details</h2> {/* Formal title */}

      {/* Residential Address */}
      <div className="form-row">
        <label>
          Residential Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      {/* City */}
      <div className="form-row">
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      {/* State */}
      <div className="form-row">
        <label>
          State:
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Postal Code */}
      <div className="form-row">
        <label>
          Postal Code (Pincode):
          <input
            type="text"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      {/* Question: Is your permanent address same as residential address? */}
      <div className="form-row">
        <label>
          Is your permanent address the same as your residential address?
        </label>
        <div className="yes-no-buttons">
          <button
            type="button"
            className={isPermanentAddressSame ? "selected" : ""}
            onClick={handlePermanentAddressSameChange}
            value="yes"
          >
            Yes
          </button>
          <button
            type="button"
            className={!isPermanentAddressSame ? "selected" : ""}
            onClick={handlePermanentAddressSameChange}
            value="no"
          >
            No
          </button>
        </div>
      </div>

      {/* If 'No' is selected, show the permanent address field */}
      {!isPermanentAddressSame && (
        <div className="form-row">
          <label>
            Permanent Address:
            <input
              type="text"
              name="permanent_address"
              value={formData.permanent_address}
              onChange={handleChange}
            />
          </label>
        </div>
      )}

      {/* Hostel Number */}
      <div className="form-row">
        <label>
          Hostel Number (if applicable):
          <input
            type="text"
            name="hostel_number"
            value={formData.hostel_number}
            onChange={handleChange}
          />
        </label>
      </div>

      <button type="submit">Save Changes</button> {/* Clear CTA */}
    </form>
  );
};

export default ResidentialDetails;
