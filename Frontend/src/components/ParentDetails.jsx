import React from "react";
import { useParams } from "react-router-dom";
import "../styles/ParentDetails.css"; // Optional if you want custom styling for this page

const ParentDetails = () => {
  const { prn } = useParams(); // Retrieve PRN from URL

  return (
    <div className="parent-details">
      <h1>Parent Details for PRN: {prn}</h1>
      {/* Display Parent Details Here */}
      <p>This is the page for parent details. You can add the actual content here.</p>
    </div>
  );
};

export default ParentDetails;
