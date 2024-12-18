import  { useEffect, useState } from "react";
import "../styles/MentorObservation.css";

const data = [
  {
    mentorName: "John Doe",
    content:
      "The student showed significant improvement in problem-solving skills.",
  },
  {
    mentorName: "Jane Smith",
    content:
      "Attention to detail needs improvement, but overall participation is good.",
  },
  {
    mentorName: "Robert Brown",
    content:
      "Excellent grasp of core concepts and timely submission of assignments.",
  },
  {
    mentorName: "John Doe",
    content:
      "The student showed significant improvement in problem-solving skills.",
  },
  {
    mentorName: "Jane Smith",
    content:
      "Attention to detail needs improvement, but overall participation is good.",
  },
  {
    mentorName: "Robert Brown",
    content:
      "Excellent grasp of core concepts and timely submission of assignments.",
  },
];

const MentorObservations = () => {
  const [observations, setObservations] = useState([]);

  useEffect(()=>{
setObservations(data)
  },[])





// useEffect(() => {

//     const fetchObservations = async () => {
//       const response = await fetch("/api/mentor-observations");
//       const data = await response.json();
//       setObservations(data);
//     };
//     fetchObservations();
//   }, []);

  return (
    <div className="mentor-observations-container">
      {observations.map((observation, index) => (
        <div key={index} className="mentor-observation-card">
          <div className="mentor-name ">{observation.mentorName}</div>
          <div className="observation-content">{observation.content}</div>
        </div>
      ))}
    </div>
  );
};

export default MentorObservations;







