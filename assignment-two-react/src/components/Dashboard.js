import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="banner">
        <div className="banner-left">
          <img
            className="avatar"
            alt="avatar"
            src="https://xsgames.co/randomusers/avatar.php?g=pixel"
          ></img>
          <div className="bannertext">
            <h2 className="title">Hello, Sam</h2>
            <h2 className="subtitle">Welcome to your Dashboard!</h2>
          </div>
        </div>

        <nav className="navigation">
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
          <Link to="/users" className="nav-link">
            User List
          </Link>
        </nav>
      </div>

      {/* Widgets Section */}
      <div className="widgets-container">
        <div className="widget" id="widget-1">
          Widget 1
        </div>
        <div className="widget" id="widget-2">
          Widget 2
        </div>
        <div className="widget" id="widget-3">
          Widget 3
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
