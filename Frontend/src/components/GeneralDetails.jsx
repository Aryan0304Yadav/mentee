import React from 'react';

const GeneralDetails = ({ formData, handleChange, isSubmitted, handleSubmit, handleEdit }) => {
  return (
    <div className="general-details">
      <h2>General Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Hobbies:
          <textarea
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            placeholder="e.g., Painting, Doodling"
            required
            disabled={isSubmitted} // Disables the field after submission
            aria-label="Hobbies"
          />
        </label>

        <label>
          Strengths:
          <input
            type="text"
            name="strengths"
            value={formData.strengths}
            onChange={handleChange}
            placeholder="e.g., Strong, Intelligent"
            required
            disabled={isSubmitted} // Disables the field after submission
            aria-label="Strengths"
          />
        </label>

        <label>
          Weaknesses:
          <input
            type="text"
            name="weaknesses"
            value={formData.weaknesses}
            onChange={handleChange}
            placeholder="e.g., Public speaking, Stage fear"
            required
            disabled={isSubmitted} // Disables the field after submission
            aria-label="Weaknesses"
          />
        </label>

        <label>
          Short Term Goals:
          <textarea
            name="shortTermGoals"
            value={formData.shortTermGoals}
            onChange={handleChange}
            placeholder="e.g., Weight gain, KT clear"
            required
            disabled={isSubmitted} // Disables the field after submission
            aria-label="Short Term Goals"
          />
        </label>

        <label>
          Long Term Goals:
          <textarea
            name="longTermGoals"
            value={formData.longTermGoals}
            onChange={handleChange}
            placeholder="e.g., IAS, Software Developer"
            required
            disabled={isSubmitted} // Disables the field after submission
            aria-label="Long Term Goals"
          />
        </label>

        <div className="buttons">
          <button type="submit" disabled={isSubmitted}>
            {isSubmitted ? "Submitted" : "Submit"}
          </button>
          {isSubmitted && (
            <button type="button" onClick={handleEdit}>
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GeneralDetails;
