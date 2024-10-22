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
        url: "http://api.weatherapi.com/v1/current.json?key=e62123e264754e49aba172024242210&q=Toronto&aqi=no",
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
            <h2 className="title">Hello, Sam!</h2>
            <h2 className="subtitle">Welcome to your Dashboard..</h2>
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
          {/* Card View */}
          <div className="widgetcard">
            {loading ? (
              <p>Loading weather data...</p>
            ) : weather ? (
              <div>
                <p>
                  <b>City:</b> {weather.location.name}
                </p>
                <p>
                  <b>Country:</b> {weather.location.country}
                </p>
              </div>
            ) : (
              <p>Failed to fetch weather data.</p>
            )}
          </div>
          {/* Card View */}
          <div className="widgetcard">
            {loading ? (
              <p>Loading weather data...</p>
            ) : weather ? (
              <div>
                <p>
                  <b>Temperature :</b> {weather.current.temp_c}°C
                </p>
                <p>
                  <b>Condition:</b> {weather.current.condition.text}
                </p>
              </div>
            ) : (
              <p>Failed to fetch weather data.</p>
            )}
          </div>
          {/* Card View */}
          <div className="widgetcard">
            {loading ? (
              <p>Loading weather data...</p>
            ) : weather ? (
              <div>
                <p>
                  <b>Humidity :</b> {weather.current.humidity}
                </p>
                <p>
                  <b>UV Index :</b> {weather.current.uv}
                </p>
                <p>
                  <b>Wind mph :</b> {weather.current.wind_mph}
                </p>
                <p>
                  <b>Wind kph :</b> {weather.current.wind_kph}
                </p>
              </div>
            ) : (
              <p>Failed to fetch weather data.</p>
            )}
          </div>
          <p>Last Updated on: {weather.current.last_updated}</p>
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
