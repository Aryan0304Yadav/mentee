import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiHome, BiUser, BiBook, BiGridAlt, BiCog } from "react-icons/bi";
import "../styles/sidebar.css";

const Sidebar = ({ prn }) => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="menu">
      <div className="logo">
        <Link to={`/dashboard/${prn}`} className="logo-link">
          <h2>SIES GST</h2>
        </Link>
      </div>
      <div className="menu--list">
        {/* Dashboard Link */}
        <Link
          to={`/dashboard/${prn}`}
          className={`item ${location.pathname === `/dashboard/${prn}` ? "active" : ""}`}
        >
          <BiHome className="icon" />
          Dashboard
        </Link>

        {/* Personal Details Link */}
        <Link
          to={`/personal-details/${prn}`}
          className={`item ${location.pathname === `/personal-details/${prn}` ? "active" : ""}`}
        >
          <BiUser className="icon" />
          Personal Details
        </Link>

        {/* Residential Details Link */}
        <Link
          to={`/residential-details/${prn}`}
          className={`item ${location.pathname === `/residential-details/${prn}` ? "active" : ""}`}
        >
          <BiHome className="icon" />
          Residential Details
        </Link>

        {/* Pre-admission Academic Details Link */}
        <Link
          to={`/pre-admission-academic-details/${prn}`}
          className={`item ${location.pathname === `/pre-admission-academic-details/${prn}` ? "active" : ""}`}
        >
          <BiBook className="icon" />
          Pre-admission Academic Details
        </Link>

        {/* Post-admission Academic Details Link */}
        <Link
          to={`/post-admission-academic-details/${prn}`}
          className={`item ${location.pathname === `/post-admission-academic-details/${prn}` ? "active" : ""}`}
        >
          <BiBook className="icon" />
          Post-admission Academic Details
        </Link>

        {/* Miscellaneous Details Link */}
        <Link
          to={`/misc-details/${prn}`}
          className={`item ${location.pathname === `/misc-details/${prn}` ? "active" : ""}`}
        >
          <BiGridAlt className="icon" />
          Miscellaneous Details
        </Link>

        {/* Observations Link */}
        <Link
          to={`/observations-from-mentors/${prn}`}
          className={`item ${location.pathname === `/observations-from-mentors/${prn}` ? "active" : ""}`}
        >
          <BiCog className="icon" />
          Observations from Mentors
        </Link>

        {/* Settings Link */}
        <Link
          to={`/settings/${prn}`}
          className={`item ${location.pathname === `/settings/${prn}` ? "active" : ""}`}
        >
          <BiCog className="icon" />
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
