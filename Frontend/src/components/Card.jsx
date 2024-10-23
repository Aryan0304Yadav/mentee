import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/content.css';
import { BiCalendar, BiSolidParty, BiEdit } from "react-icons/bi"; // Imported necessary icons

const prn="PRN002"; //Added prn here for redirect

const course = [
  {
    title: "Attendance",
    icon: <BiCalendar className="card-icon" />,
  },
  {
    title: "Events",
    icon: <BiSolidParty className="card-icon" />,
    path: `/MessageCompose`, // Path for Message card
  },
  {
    title: "About you",
    icon: <BiEdit className="card-icon" />,
    path: `/personal-details/${prn}`, // Path for Fill Your Form card
  },
];

const Card = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleClick = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div className="card--container">
      {course.map((item, index) => (
        <div 
          className="card" 
          key={index}
          onClick={() => handleClick(item.path)} // Handle card click
        >
          <div className="card--cover">{item.icon}</div>
          <div className="card--title">
            <h2>{item.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
