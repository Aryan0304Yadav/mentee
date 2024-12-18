import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiHome, BiUser, BiBook, BiGridAlt, BiCog } from "react-icons/bi";
import "../styles/sidebar.css";

const Sidebar = ({ prn }) => {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null); // Track active dropdown

  const toggleDropdown = (dropdownId) => {
    setActiveDropdown(prevState => (prevState === dropdownId ? null : dropdownId)); // Toggle or close the dropdown
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

        {/* User Information Dropdown */}
        <div className="dropdown">
          <div
            className={`item dropdown-header ${activeDropdown === "userInfo" ? "active" : ""}`}
            onClick={() => toggleDropdown("userInfo")}
          >
            <BiUser className="icon" />
            User Information
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
  to={`/residential-details/${prn}`}
  className={`item ${location.pathname === `/residential-details/${prn}` ? "active" : ""}`}
>
  <BiHome className="icon" />
  Residential Details
</Link>

            </div>
          )}
        </div>

        {/* Academic Details Dropdown */}
        <div className="dropdown">
          <div
            className={`item dropdown-header ${activeDropdown === "academic" ? "active" : ""}`}
            onClick={() => toggleDropdown("academic")}
          >
            <BiBook className="icon" />
            Academic Details
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
