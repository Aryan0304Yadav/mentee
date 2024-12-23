import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MentorObservation.css";

const MentorObservations = () => {
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const response = await axios.get("https://run.mocky.io/v3/9a075dc9-5df8-442d-8a8f-d6d5d4099af4"); // Replace with your Mocky API URL
        setObservations(response.data);
      } catch (error) {
        console.error("Error fetching mentor observations", error);
      }
    };

    fetchObservations();
  }, []);

  return (
    <div className="mentor-observations-container">
      {observations.map((observation, index) => (
        <div key={index} className="mentor-observation-card">
          <div className="mentor-name">{observation.mentorName}</div>
          <div className="observation-content">{observation.content}</div>
        </div>
      ))}
    </div>
  );
};

export default MentorObservations;
