import React, { useState, useEffect } from 'react';
import '../styles/PostAdmissionAcademicDetails.css'

const data1 = [
  {
    "currentSemester": 4
  }
];

const data2 = [
  {
    "1": {
      "subjects": [
        {
          "id": "cs101",
          "name": "Engineering Mathematics",
          "ia1": "18",
          "ia2": "19",
          "endSem": "75",
          "credits": 4
        },
        {
          "id": "cs102",
          "name": "Data Structures",
          "ia1": "17",
          "ia2": "20",
          "endSem": "82",
          "credits": 4
        },
        {
          "id": "cs103",
          "name": "Digital Logic Design",
          "ia1": "16",
          "ia2": "18",
          "endSem": "70",
          "credits": 3
        }
      ],
      "nonEditable": {
        "kts": 0,
        "attempts": 1,
        "cgpa": 8.7
      }
    },
    "2": {
      "subjects": [
        {
          "id": "cs201",
          "name": "Computer Networks",
          "ia1": "19",
          "ia2": "18",
          "endSem": "78",
          "credits": 4
        },
        {
          "id": "cs202",
          "name": "Operating Systems",
          "ia1": "20",
          "ia2": "19",
          "endSem": "85",
          "credits": 4
        },
        {
          "id": "cs203",
          "name": "Database Management",
          "ia1": "18",
          "ia2": "17",
          "endSem": "73",
          "credits": 3
        }
      ],
      "nonEditable": {
        "kts": 0,
        "attempts": 1,
        "cgpa": 8.7
      }
    },
    "3": {
      "subjects": [
        {
          "id": "cs301",
          "name": "Web Technologies",
          "ia1": "17",
          "ia2": "19",
          "endSem": "72",
          "credits": 4
        },
        {
          "id": "cs302",
          "name": "Software Engineering",
          "ia1": "18",
          "ia2": "20",
          "endSem": "80",
          "credits": 4
        },
        {
          "id": "cs303",
          "name": "Machine Learning",
          "ia1": "16",
          "ia2": "18",
          "endSem": "75",
          "credits": 3
        }
      ],
      "nonEditable": {
        "kts": 1,
        "attempts": 2,
        "cgpa": 8.2
      }
    },
    "4": {
      "subjects": [
        {
          "id": "cs401",
          "name": "Artificial Intelligence",
          "ia1": "19",
          "ia2": "18",
          "endSem": "82",
          "credits": 4
        },
        {
          "id": "cs402",
          "name": "Cloud Computing",
          "ia1": "17",
          "ia2": "19",
          "endSem": "76",
          "credits": 4
        },
        {
          "id": "cs403",
          "name": "Information Security",
          "ia1": "18",
          "ia2": "20",
          "endSem": "78",
          "credits": 3
        }
      ],
      "nonEditable": {
        "kts": 0,
        "attempts": 1,
        "cgpa": 8.4
      }
    }
  }
];

const PostAcademics = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [semesterData, setSemesterData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [currentSemester, setCurrentSemester] = useState(1);
  const [hasChanges, setHasChanges] = useState(false);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);

  useEffect(() => {
    setCurrentSemester(data1[0].currentSemester);
    setSemesterData(data2[0]);
    setOriginalData(JSON.parse(JSON.stringify(data2[0]))); // Clone the initial data for reference
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
