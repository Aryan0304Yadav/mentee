import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MiscellaneousDetails = () => {
  const { prn } = useParams(); // Retrieve PRN from URL
  const [miscData, setMiscData] = useState({
    extracurricular: '',
    achievements: '',
    other_details: '',
  });

  // Fetch miscellaneous details for the specific PRN
  useEffect(() => {
    const fetchMiscellaneousData = async () => {
      try {
        const response = await axios.get(`/misc-details/${prn}`);
        setMiscData(response.data);
      } catch (error) {
        console.error("Error fetching miscellaneous details:", error);
      }
    };

    fetchMiscellaneousData();
  }, [prn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMiscData({ ...miscData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/misc-details/${prn}`, miscData);
      alert("Miscellaneous details updated successfully!");
    } catch (error) {
      console.error("Error updating miscellaneous details:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-details">
      <h2>Miscellaneous Details</h2>

      <div className="form-row">
        <label>
          Extracurricular Activities:
          <input
            type="text"
            name="extracurricular"
            value={miscData.extracurricular}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Achievements:
          <input
            type="text"
            name="achievements"
            value={miscData.achievements}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Other Details:
          <input
            type="text"
            name="other_details"
            value={miscData.other_details}
            onChange={handleChange}
          />
        </label>
      </div>

      <button type="submit">Save Details</button>
    </form>
  );
};

export default MiscellaneousDetails;
