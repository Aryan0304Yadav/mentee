import React from "react";
import ContentHeader from "./ContentHeader";
import '../styles/content.css';
import Card from "./Card";
import AttendanceChart from "./AttendanceChart";

const Content = () => {
  return (
    <div className="content">
      <ContentHeader />
      <Card />
      <AttendanceChart />
    </div>
  );
};

export default Content;
