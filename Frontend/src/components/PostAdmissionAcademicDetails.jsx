import React, { useState } from 'react';
import '../styles/PostAdmissionAcademicDetails.css'; // Ensure the CSS file is imported

const PostAdmissionAcademicDetails = () => {
  const [editable, setEditable] = useState(false); // State to toggle edit mode
  const [selectedSemester, setSelectedSemester] = useState('semester1'); // Default selected semester
  const [subjects, setSubjects] = useState({
    semester1: [
      { name: 'Subject 1', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 1 },
      { name: 'Subject 2', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 2 },
      { name: 'Subject 3', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 1 },
      { name: 'Subject 4', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 1 },
      { name: 'Subject 5', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 2 },
    ],
    semester2: [
      { name: 'Subject 1', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 1 },
      { name: 'Subject 2', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 2 },
      { name: 'Subject 3', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 1 },
      { name: 'Subject 4', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 1 },
      { name: 'Subject 5', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 1 },
    ],
    semester3: [
      { name: 'Subject 1', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 1 },
      { name: 'Subject 2', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 2 },
      { name: 'Subject 3', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 1 },
      { name: 'Subject 4', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 1 },
      { name: 'Subject 5', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 2 },
    ],
    semester4: [
      { name: 'Subject 1', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 1 },
      { name: 'Subject 2', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 2 },
      { name: 'Subject 3', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 1 },
      { name: 'Subject 4', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 1 },
      { name: 'Subject 5', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 1 },
    ],
    semester5: [
      { name: 'Subject 1', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 1 },
      { name: 'Subject 2', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 2 },
      { name: 'Subject 3', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 1 },
      { name: 'Subject 4', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 1 },
      { name: 'Subject 5', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 2 },
    ],
    semester6: [
      { name: 'Subject 1', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 1 },
      { name: 'Subject 2', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 2 },
      { name: 'Subject 3', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 1 },
      { name: 'Subject 4', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 1 },
      { name: 'Subject 5', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 1 },
    ],
    semester7: [
      { name: 'Subject 1', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 1 },
      { name: 'Subject 2', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 2 },
      { name: 'Subject 3', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 1 },
      { name: 'Subject 4', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 1 },
      { name: 'Subject 5', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 2 },
    ],
    semester8: [
      { name: 'Subject 1', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 1 },
      { name: 'Subject 2', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 2 },
      { name: 'Subject 3', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 1 },
      { name: 'Subject 4', ia1: '', ia2: '', semesterEndMarks: '', kts: 'No', attempts: 1 },
      { name: 'Subject 5', ia1: '', ia2: '', semesterEndMarks: '', kts: 'Yes', attempts: 1 },
    ],
  });

  const handleChange = (e, semester, subjectIndex, field) => {
    const { value } = e.target;
    setSubjects((prevSubjects) => {
      const updatedSubjects = { ...prevSubjects };
      updatedSubjects[semester][subjectIndex][field] = value;
      return updatedSubjects;
    });
  };

  const handleEditClick = () => {
    setEditable(!editable); // Toggle the edit mode
  };

  const handleSemesterSelect = (semester) => {
    setSelectedSemester(semester); // Update the selected semester
  };

  const calculateCGPA = () => {
    const totalMarks = Object.values(subjects).flat().reduce((acc, subject) => {
      const totalSubjectMarks = (parseFloat(subject.ia1) || 0) + (parseFloat(subject.ia2) || 0) + (parseFloat(subject.semesterEndMarks) || 0);
      return acc + totalSubjectMarks;
    }, 0);
    const subjectCount = Object.values(subjects).flat().length * 3; // 3 fields per subject (IA1, IA2, End Sem)
    return (totalMarks / subjectCount).toFixed(2); // Example CGPA calculation
  };

  return (
    <form className="form-academic-details">
      <h2>Post Admission Academic Details</h2>

      {/* Semester Selection Buttons */}
      <div className="semester-buttons">
        {Object.keys(subjects).map((semester, index) => (
          <button
            key={semester}
            type="button"
            className={selectedSemester === semester ? 'active' : ''} // Highlight the selected semester button
            onClick={() => handleSemesterSelect(semester)} // Select the semester
          >
            {`Semester ${index + 1}`}
          </button>
        ))}
      </div>

      {/* Editable Section */}
      <div className="editable-section">
        <h3>{`Marks for ${selectedSemester}`}</h3>

        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>IA 1</th>
              <th>IA 2</th>
              <th>End Semester</th>
            </tr>
          </thead>
          <tbody>
            {subjects[selectedSemester].map((subject, subjectIndex) => (
              <tr key={subject.name}>
                <td>{subject.name}</td>
                <td>
                  <input
                    type="number"
                    value={subject.ia1}
                    readOnly={!editable}
                    onChange={(e) => handleChange(e, selectedSemester, subjectIndex, 'ia1')}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={subject.ia2}
                    readOnly={!editable}
                    onChange={(e) => handleChange(e, selectedSemester, subjectIndex, 'ia2')}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={subject.semesterEndMarks}
                    readOnly={!editable}
                    onChange={(e) => handleChange(e, selectedSemester, subjectIndex, 'semesterEndMarks')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="button" onClick={handleEditClick}>
          {editable ? 'Save Changes' : 'Edit'}
        </button>
      </div>

      {/* Non-Editable Section */}
      <div className="non-editable-section">
        <h3>Non-Editable Details</h3>
        <table>
          <thead>
            <tr>
              <th>Semester</th>
              <th>KTS</th>
              <th>Attempts</th>
            </tr>
          </thead>
          <tbody>
            {subjects[selectedSemester].map((subject, index) => (
              <tr key={index}>
                <td>{subject.name}</td>
                <td>{subject.kts}</td>
                <td>{subject.attempts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cgpa-container">
        <p><strong>Calculated CGPA: {calculateCGPA()}</strong></p>
      </div>
    </form>
  );
};

export default PostAdmissionAcademicDetails;
