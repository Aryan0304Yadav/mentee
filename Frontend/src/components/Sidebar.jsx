import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiHome, BiUser, BiBook, BiGridAlt, BiCog, BiChevronDown } from "react-icons/bi";
import "../styles/sidebar.css";

const Sidebar = ({ prn }) => {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdownId) => {
    setActiveDropdown((prevState) => (prevState === dropdownId ? null : dropdownId));
  };

  return (
    <div className="menu">
      <div className="logo">
        <Link to={`/dashboard/${prn}`} className="logo-link">
          <h2>SIES GST</h2>
        </Link>
      </div>
      <div className="menu--list">
        <Link
          to={`/dashboard/${prn}`}
          className={`item ${location.pathname === `/dashboard/${prn}` ? "active" : ""}`}
        >
          <BiHome className="icon" />
          Dashboard
        </Link>

        <div className="dropdown">
          <div
            className={`item dropdown-header ${activeDropdown === "userInfo" ? "active" : ""}`}
            onClick={() => toggleDropdown("userInfo")}
          >
            <BiUser className="icon" />
            User Information
            <BiChevronDown className="dropdown-icon" />
          </div>
          {activeDropdown === "userInfo" && (
            <div className="dropdown-menu">
              <Link
                to={`/personal-details/${prn}`}
                className={`item ${location.pathname === `/personal-details/${prn}` ? "active" : ""}`}
              >
                <BiUser className="icon" />
                Personal Details
              </Link>
              <Link
                to={`/parent-details/${prn}`} 
                className={`item ${location.pathname === `/parent-details/${prn}` ? "active" : ""}`}
              >
                <BiUser className="icon" />
                Parent Details
              </Link>
              <Link
                to={`/residential-details/${prn}`}
                className={`item ${location.pathname === `/residential-details/${prn}` ? "active" : ""}`}
              >
                <BiHome className="icon" />
                Residential Details
              </Link>
            </div>
          )}
        </div>

        <div className="dropdown">
          <div
            className={`item dropdown-header ${activeDropdown === "academic" ? "active" : ""}`}
            onClick={() => toggleDropdown("academic")}
          >
            <BiBook className="icon" />
            Academic Details
            <BiChevronDown className="dropdown-icon" />
          </div>
          {activeDropdown === "academic" && (
            <div className="dropdown-menu">
              <Link
                to={`/pre-admission-academic-details/${prn}`}
                className={`item ${location.pathname === `/pre-admission-academic-details/${prn}` ? "active" : ""}`}
              >
                <BiBook className="icon" />
                Pre-admission Academic Details
              </Link>
              <Link
                to={`/post-admission-academic-details/${prn}`}
                className={`item ${location.pathname === `/post-admission-academic-details/${prn}` ? "active" : ""}`}
              >
                <BiBook className="icon" />
                Post-admission Academic Details
              </Link>
            </div>
          )}
        </div>

        <Link
          to={`/misc-details/${prn}`}
          className={`item ${location.pathname === `/misc-details/${prn}` ? "active" : ""}`}
        >
          <BiGridAlt className="icon" />
          Miscellaneous Details
        </Link>

        <Link
          to={`/observations-from-mentors/${prn}`}
          className={`item ${location.pathname === `/observations-from-mentors/${prn}` ? "active" : ""}`}
        >
          <BiCog className="icon" />
          Observations from Mentors
        </Link>

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
