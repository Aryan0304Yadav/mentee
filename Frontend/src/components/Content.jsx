import React from "react";
import { useParams } from "react-router-dom"; // Import useParams to access prn
import ContentHeader from "./ContentHeader";
import '../styles/content.css';
import Card from "./Card";
import AttendanceChart from "./AttendanceChart";

const Content = () => {
  const { prn } = useParams(); // Get prn from URL

  return (
    <div className="content">
      <ContentHeader />
      <Card />
      <AttendanceChart prn={prn} /> {/* Pass prn as prop to AttendanceChart */}
    </div>
  );
};

export default Content;
