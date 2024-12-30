import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MentorObservation.css";
import { useParams } from "react-router-dom";

const MentorObservations = () => {
  const [observations, setObservations] = useState([]);
  const { prn } = useParams(); // Extract `prn` from route params

  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/mentee/observations-fetch/${prn}`);
        setObservations(response.data);
      } catch (error) {
        console.error("Error fetching mentor observations:", error);
      }
    };

    fetchObservations();
  }, [prn]);

  return (
    <div className="mentor-observations-table-container">
      {observations.length > 0 ? (
        <table className="mentor-observations-table">
          <thead>
            <tr>
              <th>Mentor Name</th>
              <th>Observation</th>
            </tr>
          </thead>
          <tbody>
            {observations.map((observation, index) => (
              <tr key={index} className="mentor-observation-row">
                <td className="mentor-name-cell">{observation.mentor_name}</td>
                <td className="observation-content-cell">{observation.old_observation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-observations-message">No observations available.</div>
      )}
    </div>
  );
};

export default MentorObservations;
