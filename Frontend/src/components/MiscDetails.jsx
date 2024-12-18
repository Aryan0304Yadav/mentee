import React, { useState, useEffect } from "react";
import "../styles/MiscDetails.css";

const MiscDetails = () => {
  
  const [formData, setFormData] = useState({
    hobbies: "",
    strengths: "",
    weaknesses: "",
    shortTermGoals: "",
    longTermGoals: "",
    achievementsPriorToAdmission: [],
    achievementsAfterAdmission: [],
  });

  const [isSubmitted, setIsSubmitted] = useState(false);



  const data = [{
    "hobbies": "Painting, Doodling",
    "strengths": "Strong, Intelligent",
    "weaknesses": "Public speaking, Stage fear",
    "shortTermGoals": "Weight gain, KT clear",
    "longTermGoals": "IAS, Software Developer",
    "achievementsPriorToAdmission": [
      {
        "type": "Sports",
        "organizer": "XYZ School",
        "year": "2020",
        "position": "First",
        "additionalInfo": "Won in the inter-school basketball competition",
        "certificate": null
      }
    ],
    "achievementsAfterAdmission": [
      {
        "semester": "3",
        "type": "Academic",
        "organizer": "University",
        "year": "2022",
        "position": "Second",
        "additionalInfo": "Secured second position in the coding competition",
        "certificate": null
      }
    ]
  }];

 
  // // Fetching data when the component mounts
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Replace with your API endpoint or data source
  //       const response = await fetch("your-api-endpoint"); // Example API endpoint
  //       const data = await response.json();
        
  //       // Set the fetched data into the form state
  //       setFormData({
  //         hobbies: data.hobbies || "",
  //         strengths: data.strengths || "",
  //         weaknesses: data.weaknesses || "",
  //         shortTermGoals: data.shortTermGoals || "",
  //         longTermGoals: data.longTermGoals || "",
  //         achievementsPriorToAdmission: data.achievementsPriorToAdmission || [],
  //         achievementsAfterAdmission: data.achievementsAfterAdmission || [],
  //       });
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []); // Empty dependency array to run once when the component mounts

  useEffect(() => {
    setFormData(data[0]); 
  }, []); 





  // // Sync achievements data
  // useEffect(() => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     achievementsPriorToAdmission: prevData.achievementsPriorToAdmission,
  //     achievementsAfterAdmission: prevData.achievementsAfterAdmission,
  //   }));
  // }, [
  //   formData.achievementsPriorToAdmission,
  //   formData.achievementsAfterAdmission,
  // ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Data:", formData);
    setIsSubmitted(true);
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  // Achievements handling
  const handlePriorAchievementChange = (index, field, value) => {
    const updatedPriorAchievements = [...formData.achievementsPriorToAdmission];
    updatedPriorAchievements[index][field] = value;
    setFormData({
      ...formData,
      achievementsPriorToAdmission: updatedPriorAchievements,
    });
  };

  const handlePostAchievementChange = (index, field, value) => {
    const updatedPostAchievements = [...formData.achievementsAfterAdmission];
    updatedPostAchievements[index][field] = value;
    setFormData({
      ...formData,
      achievementsAfterAdmission: updatedPostAchievements,
    });
  };

  const handlePriorAchievementAdd = () => {
    setFormData({
      ...formData,
      achievementsPriorToAdmission: [
        ...formData.achievementsPriorToAdmission,
        {
          type: "",
          organizer: "",
          year: "",
          position: "",
          additionalInfo: "",
          certificate: null,
        },
      ],
    });
  };

  const handlePostAchievementAdd = () => {
    setFormData({
      ...formData,
      achievementsAfterAdmission: [
        ...formData.achievementsAfterAdmission,
        {
          semester: "",
          type: "",
          organizer: "",
          year: "",
          position: "",
          additionalInfo: "",
          certificate: null,
        },
      ],
    });
  };

  const handlePriorCertificateChange = (index, file) => {
    const updatedPriorAchievements = [...formData.achievementsPriorToAdmission];
    updatedPriorAchievements[index].certificate = file;
    setFormData({
      ...formData,
      achievementsPriorToAdmission: updatedPriorAchievements,
    });
  };

  const handlePostCertificateChange = (index, file) => {
    const updatedPostAchievements = [...formData.achievementsAfterAdmission];
    updatedPostAchievements[index].certificate = file;
    setFormData({
      ...formData,
      achievementsAfterAdmission: updatedPostAchievements,
    });
  };

  return (
    <div className="parent">
      <form onSubmit={handleSubmit} className="misc-details-form">
        <h2>Miscellaneous Details</h2>

        <label>
          Hobbies:
          <textarea
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            placeholder="e.g., Painting, Doodling"
            required
            disabled={isSubmitted}
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
            disabled={isSubmitted}
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
            disabled={isSubmitted}
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
            disabled={isSubmitted}
            aria-label="Short Term Goals"
          />
        </label>

        <label>
          Long Term Goals:
          <textarea
            type="text"
            name="longTermGoals"
            value={formData.longTermGoals}
            onChange={handleChange}
            placeholder="e.g., IAS, Software Developer"
            required
            disabled={isSubmitted}
            aria-label="Long Term Goals"
          />
        </label>

        <h2>Achievements Prior to Admission</h2>
        {formData.achievementsPriorToAdmission.map((achievement, index) => (
          <div key={index} className="achievement-item">
            <label>Type</label>
            <input
              type="text"
              placeholder="Type"
              value={achievement.type}
              onChange={(e) =>
                handlePriorAchievementChange(index, "type", e.target.value)
              }
              disabled={isSubmitted}
            />
            <label>Organizer</label>
            <input
              type="text"
              placeholder="Organizer"
              value={achievement.organizer}
              onChange={(e) =>
                handlePriorAchievementChange(index, "organizer", e.target.value)
              }
              disabled={isSubmitted}
            />
            <label>Year</label>
            <input
              type="text"
              placeholder="Year"
              value={achievement.year}
              onChange={(e) =>
                handlePriorAchievementChange(index, "year", e.target.value)
              }
              disabled={isSubmitted}
            />
            <label>Position</label>
            <input
              type="text"
              placeholder="Position"
              value={achievement.position}
              onChange={(e) =>
                handlePriorAchievementChange(index, "position", e.target.value)
              }
              disabled={isSubmitted}
            />
            <label>Additional Info</label>
            <input
              type="text"
              placeholder="Additional Info"
              value={achievement.additionalInfo}
              onChange={(e) =>
                handlePriorAchievementChange(
                  index,
                  "additionalInfo",
                  e.target.value
                )
              }
              disabled={isSubmitted}
            />
            <label>Certificate</label>
            <input
              type="file"
              onChange={(e) =>
                handlePriorCertificateChange(index, e.target.files[0])
              }
              disabled={isSubmitted}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handlePriorAchievementAdd}
          disabled={isSubmitted}
        >
          Add Achievement (Prior)
        </button>

        <h2>Achievements After Admission</h2>
        {formData.achievementsAfterAdmission.map((achievement, index) => (
          <div key={index} className="achievement-item">
            <label>Semester</label>
            <input
              type="text"
              placeholder="Semester"
              value={achievement.semester}
              onChange={(e) =>
                handlePostAchievementChange(index, "semester", e.target.value)
              }
              disabled={isSubmitted}
            />
            <label>Type</label>
            <input
              type="text"
              placeholder="Type"
              value={achievement.type}
              onChange={(e) =>
                handlePostAchievementChange(index, "type", e.target.value)
              }
              disabled={isSubmitted}
            />
            <label>Organizer</label>
            <input
              type="text"
              placeholder="Organizer"
              value={achievement.organizer}
              onChange={(e) =>
                handlePostAchievementChange(index, "organizer", e.target.value)
              }
              disabled={isSubmitted}
            />
            <label>Year</label>
            <input
              type="text"
              placeholder="Year"
              value={achievement.year}
              onChange={(e) =>
                handlePostAchievementChange(index, "year", e.target.value)
              }
              disabled={isSubmitted}
            />
            <label>Position</label>
            <input
              type="text"
              placeholder="Position"
              value={achievement.position}
              onChange={(e) =>
                handlePostAchievementChange(index, "position", e.target.value)
              }
              disabled={isSubmitted}
            />
            <label>Additional Info</label>
            <input
              type="text"
              placeholder="Additional Info"
              value={achievement.additionalInfo}
              onChange={(e) =>
                handlePostAchievementChange(
                  index,
                  "additionalInfo",
                  e.target.value
                )
              }
              disabled={isSubmitted}
            />
            <label>Certificate</label>
            <input
              type="file"
              onChange={(e) =>
                handlePostCertificateChange(index, e.target.files[0])
              }
              disabled={isSubmitted}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handlePostAchievementAdd}
          disabled={isSubmitted}
        >
          Add Achievement (After)
        </button>

        <div className="buttons">
          <button type="submit" disabled={isSubmitted}>
            Submit
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

export default MiscDetails;
