import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  BiHome,
  BiUser,
  BiBook,
  BiGridAlt,
  BiCog,
  BiEdit,
  BiChevronDown,
} from "react-icons/bi";
import "../styles/sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  // const { prn } = useParams(); // Retrieve PRN from the URL
  const prn="PRN002";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  console.log(prn);

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
        <Link
          to={`/dashboard/${prn}`}
          className={`item ${location.pathname === `/dashboard/${prn}` ? "active" : ""}`}
        >
          <BiHome className="icon" />
          Dashboard
        </Link>

        {/* Dropdown for Form Sections */}
        <div className={`item dropdown ${dropdownOpen ? "active" : ""}`}>
          <div onClick={toggleDropdown} className="dropdown-toggle">
            <BiEdit className="icon" />
            Fill your form
            <BiChevronDown className={`icon dropdown-icon ${dropdownOpen ? "open" : ""}`} />
          </div>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link
                to={`/personal-details/${prn}`}
                className={`dropdown-item ${
                  location.pathname === `/personal-details/${prn}` ? "active" : ""
                }`}
              >
                Personal Details
              </Link>
              <Link
                to={`/academic-details/${prn}`}
                className={`dropdown-item ${
                  location.pathname === `/academic-details/${prn}` ? "active" : ""
                }`}
              >
                Academic Details
              </Link>
              <Link
                to={`/MiscDetails/${prn}`}
                className={`dropdown-item ${
                  location.pathname === `/MiscDetails/${prn}` ? "active" : ""
                }`}
              >
                Miscellaneous Details
              </Link>
            </div>
          )}
        </div>

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
