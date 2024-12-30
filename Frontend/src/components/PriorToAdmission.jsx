import React from 'react';

const PriorToAdmission = ({
  achievements,
  handleAchievementChange,
  handleAchievementAdd,
  handleCertificateChange,
  isSubmitted,
  handleSubmit,
  handleEdit
}) => {
  const achievementTypes = ['Sports', 'Cultural', 'Tech', 'Others'];

  return (
    <div className="prior-achievements">
      <h2>Achievements Prior to Admission</h2>
      <form onSubmit={handleSubmit}>
        {achievements.map((achievement, index) => (
          <div key={index} className="achievement-item">
            <label>Type</label>
            <select
              value={achievement.type}
              onChange={(e) => handleAchievementChange(index, "type", e.target.value)}
              disabled={isSubmitted}
            >
              <option value="">Select Type</option>
              {achievementTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <label>Organizer</label>
            <input
              type="text"
              placeholder="Organizer"
              value={achievement.organizer}
              onChange={(e) => handleAchievementChange(index, "organizer", e.target.value)}
              disabled={isSubmitted}
            />

            <label>Year</label>
            <input
              type="text"
              placeholder="Year"
              value={achievement.year}
              onChange={(e) => handleAchievementChange(index, "year", e.target.value)}
              disabled={isSubmitted}
            />

            <label>Position</label>
            <input
              type="text"
              placeholder="Position"
              value={achievement.position}
              onChange={(e) => handleAchievementChange(index, "position", e.target.value)}
              disabled={isSubmitted}
            />

            <label>Additional Info</label>
            <input
              type="text"
              placeholder="Additional Info"
              value={achievement.additionalInfo}
              onChange={(e) => handleAchievementChange(index, "additionalInfo", e.target.value)}
              disabled={isSubmitted}
            />

            <label>Certificate</label>
            <input
              type="file"
              onChange={(e) => handleCertificateChange(index, e.target.files[0])}
              disabled={isSubmitted}
            />
          </div>
        ))}

        <button type="button" onClick={handleAchievementAdd} disabled={isSubmitted}>
          Add Achievement
        </button>

        <div className="buttons">
          <button type="submit" disabled={isSubmitted}>Submit</button>
          {isSubmitted && (
            <button type="button" onClick={handleEdit}>Edit</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PriorToAdmission;
