import React, { useState, useEffect } from 'react';
import '../styles/PostAdmissionAcademicDetails.css';

const PostAcademics = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [semesterData, setSemesterData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [currentSemester, setCurrentSemester] = useState(1);
  const [hasChanges, setHasChanges] = useState(false);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);

  // Fetch data from the API
  useEffect(() => {
    // Replace this with your actual API endpoint
    const fetchData = async () => {
      try {
        // Example API requests - replace with real endpoint
        const semesterResponse = await fetch('/api/current-semester');
        const semesterData = await semesterResponse.json();
        const academicDataResponse = await fetch('/api/academic-details');
        const academicData = await academicDataResponse.json();

        // Set the fetched data to state
        setCurrentSemester(semesterData.currentSemester);
        setSemesterData(academicData);
        setOriginalData(JSON.parse(JSON.stringify(academicData))); // Clone the initial data for reference
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (semesterNumber, subjectId, field, value) => {
    if (!isEditing) return;

    // Validate input (only numbers between 0-100)
    if (value && !/^\d*\.?\d*$/.test(value)) return;

    const maxValue = field === 'endSem' ? 100 : 20;
    if (parseFloat(value) > maxValue) return;

    setSemesterData((prevData) => {
      const newData = { ...prevData };
      const subject = newData[semesterNumber].subjects.find((s) => s.id === subjectId);
      if (subject) {
        subject[field] = value;
        setHasChanges(true);
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

      {Array.from({ length: currentSemester }, (_, index) => {
        const semesterNumber = index + 1;
        const semesterInfo = semesterData[semesterNumber] || {
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
                  {semesterInfo.subjects.map((subject) => (
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

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
