import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/PostAdmissionAcademicDetails.css';

const PostAcademics = () => {
  const { prn } = useParams(); // Get the prn parameter from the URL
  const [isEditing, setIsEditing] = useState(false);
  const [semesterData, setSemesterData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [currentSemester, setCurrentSemester] = useState();
  const [hasChanges, setHasChanges] = useState(false);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);

  // Fetch data from the API using axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make requests using axios
        const semesterResponse = await axios.get(`http://localhost:3000/mentee/current-semester-fetch/${prn}`);
        const academicDataResponse = await axios.get(`http://localhost:3000/mentee/post-admission-academic-details-fetch/${prn}/${semesterResponse.data.currentSemester}`);

        // Set the fetched data to state
        setCurrentSemester(semesterResponse.data.currentSemester);
        setSemesterData(academicDataResponse.data.semesterData);
        setOriginalData(JSON.parse(JSON.stringify(academicDataResponse.data.semesterData))); // Clone the initial data for reference
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [prn]); // Dependency on prn to refetch data when the prn changes

  const handleInputChange = (semesterNumber, subjectId, field, value) => {
    if (!isEditing) return;

    // Ensure the input is a valid number and allow multi-digit numbers
    const numericValue = value === "" ? "" : parseFloat(value);  // Allow empty input as well
    if (numericValue !== "" && (isNaN(numericValue) || numericValue < 0)) {
      return; // Reject invalid input (not a number or negative)
    }

    // Set the maximum value based on the field
    const maxValue = field === "endSem" ? 100 : 20;

    if (numericValue !== "" && numericValue > maxValue) {
      return; // Reject values greater than the maximum
    }

    setSemesterData((prevData) => {
      const newData = { ...prevData };
      const semester = newData[semesterNumber];
      if (semester) {
        const subject = semester.subjects?.find((s) => s.id === subjectId);
        if (subject) {
          subject[field] = value;
          setHasChanges(true);
        }
      }
      return newData;
    });
  };

  const handleSaveChanges = () => {
    alert('Changes saved successfully!');
    setIsEditing(false);
    setHasChanges(false);
  };

  const handleSubmit = () => {
    setShowSubmitPopup(true);
  };

  const handleCloseSubmitPopup = () => {
    setShowSubmitPopup(false);
    setIsEditing(false);
    setHasChanges(false);
  };

  const handleCancel = () => {
    setSemesterData(JSON.parse(JSON.stringify(originalData)));
    setIsEditing(false);
    setHasChanges(false);
  };

  return (
    <div className="academic-details-container">
      <h1 className="semester-title">Post Admission Academic Details</h1>

      {/* Check if currentSemester and semesterData are loaded */}
      {currentSemester && semesterData && Object.keys(semesterData).length > 0 ? (
        Array.from({ length: Number(currentSemester) - 1 }, (_, index) => {
          const semesterNumber = index + 1;
          const semesterInfo = semesterData[`${semesterNumber}`] || {
            subjects: [],
            nonEditable: { kts: 0, attempts: 0, cgpa: 0 },
          };

          return (
            <div className="semester-section" key={semesterNumber}>
              <h2 className="semester-title">Semester {semesterNumber}</h2>
              <div className="marks-section">
                <table className="marks-table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>IA 1</th>
                      <th>IA 2</th>
                      <th>End Sem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semesterInfo.subjects && semesterInfo.subjects.length > 0 ? (
                      semesterInfo.subjects.map((subject) => (
                        <tr key={subject.id}>
                          <td>{subject.name}</td>
                          <td>
                            <input
                              type="text"
                              value={subject.ia1}
                              onChange={(e) =>
                                handleInputChange(semesterNumber, subject.id, 'ia1', e.target.value)
                              }
                              disabled={!isEditing}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={subject.ia2}
                              onChange={(e) =>
                                handleInputChange(semesterNumber, subject.id, 'ia2', e.target.value)
                              }
                              disabled={!isEditing}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={subject.endSem}
                              onChange={(e) =>
                                handleInputChange(semesterNumber, subject.id, 'endSem', e.target.value)
                              }
                              disabled={!isEditing}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No subjects found for this semester</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      ) : (
        <p>Loading data...</p>
      )}

      {!isEditing ? (
        <div>
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          {hasChanges && (
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      ) : (
        <div>
          <button className="save-button" onClick={handleSaveChanges}>
            Save Changes
          </button>
          <button
            className="cancel-button"
            onClick={handleCancel}
            style={{ backgroundColor: '#d9534f', color: '#fff' }}
          >
            Cancel
          </button>
        </div>
      )}

      {showSubmitPopup && (
        <div className="popup">
          <p>Submitting changes for approval</p>
          <button onClick={handleCloseSubmitPopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default PostAcademics;
