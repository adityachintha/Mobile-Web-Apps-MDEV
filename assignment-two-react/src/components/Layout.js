import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaHome,
  FaCalculator,
  FaClipboardCheck,
  FaSignOutAlt,
  FaCalendar,
  FaCloud,
  FaNewspaper,
  FaUser,
  FaSpaceShuttle,
} from "react-icons/fa"; // Importing icons
import "../css/Layout.css";

const Layout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarRef = useRef(null); // Create a ref for the sidebar

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Close the sidebar if clicked outside
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarVisible(false);
    }
  };

  useEffect(() => {
    if (sidebarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarVisible]);

  return (
    <div className="container">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`sidebar ${sidebarVisible ? "visible" : ""}`}
      >
        <div className="sidebar-content">
          <Link to="dashboard" className="sidebar-link" onClick={toggleSidebar}>
            <FaHome className="icon" /> Home
          </Link>
          <Link
            to="calculator"
            className="sidebar-link"
            onClick={toggleSidebar}
          >
            <FaCalculator className="icon" /> Calculator
          </Link>
          <Link to="checklist" className="sidebar-link" onClick={toggleSidebar}>
            <FaClipboardCheck className="icon" /> Checklist
          </Link>
          <Link to="calender" className="sidebar-link" onClick={toggleSidebar}>
            <FaCalendar className="icon" /> Calender
          </Link>
          <Link to="weather" className="sidebar-link" onClick={toggleSidebar}>
            <FaCloud className="icon" /> Weather
          </Link>
          <Link to="news" className="sidebar-link" onClick={toggleSidebar}>
            <FaNewspaper className="icon" /> News
          </Link>
          <Link to="space" className="sidebar-link" onClick={toggleSidebar}>
            <FaSpaceShuttle className="icon" /> Nasa Space
          </Link>
          <Link to="users" className="sidebar-link" onClick={toggleSidebar}>
            <FaUser className="icon" /> All users
          </Link>

          <Link
            to="logout"
            className="sidebar-link logout"
            onClick={toggleSidebar}
          >
            <FaSignOutAlt className="icon" /> Logout
          </Link>
        </div>
      </div>

      {/* Sticky bar with hamburger icon */}
      <div className="stickybar">
        <div className="stickybarContent">
          <i
            className="fa-solid fa-bars stickybar-icon"
            onClick={toggleSidebar}
            aria-hidden="true"
          ></i>
          <h1>Dashboard</h1>
        </div>
      </div>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
