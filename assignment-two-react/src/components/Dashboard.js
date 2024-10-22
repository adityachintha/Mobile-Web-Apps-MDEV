import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch weather data from RapidAPI
  useEffect(() => {
    const fetchWeatherData = async () => {
      const options = {
        method: "GET",
        url: "https://open-weather13.p.rapidapi.com/city/toronto/EN",
        headers: {
          "X-RapidAPI-Key":
            "0ad6dd1370msh14b056da351517cp161d8djsn60501c419bb3",
          "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log("Weather API response:", response.data);
        setWeather(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

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
          <h1>Weather Information</h1>
          {loading ? (
            <p>Loading weather data...</p>
          ) : weather ? (
            <div>
              <p>City: {weather.name}</p>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Condition: {weather.weather[0].description}</p>
            </div>
          ) : (
            <p>Failed to fetch weather data.</p>
          )}
        </div>
        <div className="widget" id="widget-2">
          <p>News Feed</p>
        </div>
        <div className="widget" id="widget-3">
          <p>Stocks & Market</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
