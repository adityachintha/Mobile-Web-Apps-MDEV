import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import WeatherData from "./WeatherData";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NewsData from "./NewsData";
import SpaceStationData from "./SpaceStationData";
import UserProfile from "./UserProfile";
import UserList from "./UserList";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="stickybar">
        <div className="stickybarContent">
          <i className="fa-solid fa-bars stickybar-icon" aria-hidden="true"></i>
          <h1>Dashboard</h1>
        </div>

        <div className="navigation">
          <Link to="/profile" className="nav-linktwo">
            Profile
          </Link>
          <Link to="/users" className="nav-linktwo">
            User List
          </Link>
        </div>
        {/* <p>
          Project for Mobile Web Apps, developed by Aditya Chintha and Abhirami
          Pradeep Susi
        </p> */}
      </div>
      <div className="dashboard-container">
        <div className="banner">
          <div className="banner-left">
            <img
              className="avatar"
              alt="avatar"
              src="https://xsgames.co/randomusers/avatar.php?g=male"
            ></img>
            <div className="bannertext">
              <h2 className="title">Hello, Sam!</h2>
              <h2 className="subtitle">Welcome to your Dashboard..</h2>
            </div>
          </div>
        </div>

        {/* Widgets Section */}
        <div className="widgets-container">
          <div className="widget" id="widget-1">
            <h1>Profile</h1>
            <UserProfile></UserProfile>
          </div>
          <div className="widget" id="widget-2">
            <h1>User List</h1>
            <UserList></UserList>
          </div>
          <div className="widget" id="widget-3">
            <h1>Weather</h1>
            <WeatherData></WeatherData>
          </div>
          <div className="widget" id="widget-4">
            <h1>News</h1>
            <NewsData></NewsData>
          </div>
          <div className="widget" id="widget-5">
            <h1>NASA Space </h1>
            <SpaceStationData></SpaceStationData>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
