import React, { useState } from "react";
import '../styles/MiscDetails.css';

const MiscDetails = () => {
  const [formData, setFormData] = useState({
    hobbies: "",
    favoriteSubjects: "",
    preferredLearningMethod: "",
    otherComments: "",
    interests: "",
    preferredStudyEnvironment: "",
    extracurricularActivities: "",
    favoriteBooks: "",
    certificate: null,  // For file upload
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      certificate: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission, like saving data to the database
    // Note: File uploads might need special handling on the backend
  };

  const printForm = () => {
    // Creating a printable version of the form data
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Form</title></head><body>');
    printWindow.document.write('<h1>Form Data</h1>');
    printWindow.document.write(`<p><strong>Hobbies:</strong> ${formData.hobbies}</p>`);
    printWindow.document.write(`<p><strong>Favorite Subjects:</strong> ${formData.favoriteSubjects}</p>`);
    printWindow.document.write(`<p><strong>Preferred Learning Method:</strong> ${formData.preferredLearningMethod}</p>`);
    printWindow.document.write(`<p><strong>Other Comments:</strong> ${formData.otherComments}</p>`);
    printWindow.document.write(`<p><strong>Interests:</strong> ${formData.interests}</p>`);
    printWindow.document.write(`<p><strong>Preferred Study Environment:</strong> ${formData.preferredStudyEnvironment}</p>`);
    printWindow.document.write(`<p><strong>Extracurricular Activities:</strong> ${formData.extracurricularActivities}</p>`);
    printWindow.document.write(`<p><strong>Favorite Books:</strong> ${formData.favoriteBooks}</p>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <form onSubmit={handleSubmit} className="misc-details-form">
      <h2>Miscellaneous Details</h2>

      <label>
        Hobbies:
        <textarea
          name="hobbies"
          value={formData.hobbies}
          onChange={handleChange}
          placeholder="eg. Painting, Doodling"
          required
          className="large-textarea"
        />
      </label>

      <label>
        Favorite Subjects:
        <input
          type="text"
          name="favoriteSubjects"
          value={formData.favoriteSubjects}
          onChange={handleChange}
          placeholder="eg. Mathematics, Quantum Physics"
          required
        />
      </label>

      <label>
        Preferred Learning Method:
        <input
          type="text"
          name="preferredLearningMethod"
          value={formData.preferredLearningMethod}
          onChange={handleChange}
          placeholder="e.g., Visual, Auditory, Kinesthetic"
          required
        />
      </label>

      <label>
        Other Comments:
        <textarea
          name="otherComments"
          value={formData.otherComments}
          onChange={handleChange}
          placeholder="Any additional comments or information"
          required
        />
      </label>

      <label>
        Interests:
        <input
          type="text"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          placeholder="eg. "
          required
        />
      </label>
      
      <label>
        Preferred Study Environment:
        <input
          type="text"
          name="preferredStudyEnvironment"
          value={formData.preferredStudyEnvironment}
          onChange={handleChange}
          placeholder="e.g., Quiet, Group Study, Library"
          required
        />
      </label>

      <label>
        Extracurricular Activities/Achievements:
        <input
          type="text"
          name="extracurricularActivities"
          value={formData.extracurricularActivities}
          onChange={handleChange}
          placeholder="eg. Hackathons, Cognition"
          required
        />
      </label>

      <label>
        Upload Achievements Certificate:
        <input
          type="file"
          name="certificate"
          accept=".pdf"  /* Restrict file upload to PDF only */
          onChange={handleFileChange}
          required
        />
      </label>

      <label>
        Favorite Books:
        <input
          type="text"
          name="favoriteBooks"
          value={formData.favoriteBooks}
          onChange={handleChange}
          placeholder="List your favorite books"
          required
        />
      </label>

      <button type="submit">Submit</button>
      <button type="button" onClick={printForm}>Print</button>
    </form>
  );
};

export default MiscDetails;
