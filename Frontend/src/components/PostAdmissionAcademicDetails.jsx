import React, { useState } from 'react';
import axios from 'axios';

import '../styles/PostAdmissionAcademicDetails.css'; // CSS for the form styling

const PostAdmissionAcademicDetails = () => {
  const [sgpas, setSgpas] = useState({
    semester1: '',
    semester2: '',
    semester3: '',
    semester4: '',
    semester5: '',
    semester6: '',
    semester7: '',
    semester8: ''
  });

  // Handle changes in SGPA fields (restrict to 2 decimal places)
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow empty value or a valid number with up to two decimal places
    if (value === '' || /^[0-9]*(\.[0-9]{0,2})?$/.test(value)) {
      setSgpas({ ...sgpas, [name]: value });
    }
  };

  // Calculate CGPA (average of entered SGPA values)
  const calculateCGPA = () => {
    const enteredSgpas = Object.values(sgpas).filter(value => value !== ''); // Only consider non-empty values
    if (enteredSgpas.length === 0) return 0;
    const sum = enteredSgpas.reduce((acc, sgpa) => acc + parseFloat(sgpa), 0);
    return (sum / enteredSgpas.length).toFixed(2); // Round to two decimal places
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming we're saving the data to a backend (replace with your API endpoint)
      await axios.post('https://your-api-endpoint.com/save-sgpas', sgpas);
      alert('SGPA data saved successfully');
    } catch (error) {
      console.error('Error saving SGPA data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-details-form">
      <h2>Post Admission Academic Details</h2>

      {/* SGPA for each semester */}
      {Object.keys(sgpas).map((semester, index) => (
        <div className="form-row" key={semester}>
          <label>
            {`Semester ${index + 1} SGPA:`}
            <input
              type="number"
              name={semester}
              value={sgpas[semester]}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.01"  // Allow up to two decimal places
            />
          </label>
        </div>
      ))}

      {/* Display CGPA */}
      <div className="form-row">
        <label>CGPA:</label>
        <input
          type="text"
          value={calculateCGPA()}
          readOnly
          placeholder="Calculated CGPA"
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default PostAdmissionAcademicDetails;
