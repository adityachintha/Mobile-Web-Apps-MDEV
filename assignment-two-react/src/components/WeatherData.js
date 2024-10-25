// Team Members - Aditya Chintha (200595829), Abhirami Pradeep Susi (200589663)
// File  - WeatherData.js
// Mobile Web Apps Assignment 2

import React, { useState, useEffect } from "react"; //Importing use state and use effect
import axios from "axios"; //Importing axios
import "../css/WeatherData.css"; //Importing css

const WeatherData = ({ showLimited }) => {
  const [weather, setWeather] = useState(null); //state for weather
  const [loading, setLoading] = useState(true); //state for loading
  const [query, setQuery] = useState("Toronto"); // Default city on initial load

  // Function to Fetch weather data from Weather API
  const fetchWeatherData = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: `http://api.weatherapi.com/v1/current.json?key=e62123e264754e49aba172024242210&q=${query}`,
    };
    try {
      const response = await axios.request(options);
      console.log("Weather API response:", response.data);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Function to Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // use effect to fetch weather data on initial load
  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div
      className={showLimited ? "weather-widget-container" : "weather-container"}
    >
      <div className="weather-head">
        <h1>Weather</h1>
        <div className={showLimited ? "widgetInput" : "widget-input-main"}>
          {/* Input */}
          <input
            type="text"
            placeholder="Enter your City"
            value={query}
            onChange={handleInputChange}
            className="weather"
          />
          {/* Search Button */}
          <button
            className={showLimited ? "nav-link" : "nav-link-btn"}
            onClick={fetchWeatherData}
          >
            Search
          </button>
        </div>
      </div>
      {loading ? (
        <p>Loading weather data...</p>
      ) : weather ? (
        <div>
          {/* Dsiplaying weather information from API */}
          <div className="weather-cards">
            <div className="widgetcard">
              <div className="widgetcardtwo">
                <img src={weather?.current?.condition?.icon}></img>
                <h2>{weather?.current?.temp_c}°C</h2>
              </div>
              <p>{weather?.current?.condition.text}</p>
              <p>
                <b>Feels Like:</b> {weather?.current?.feelslike_c}°C
              </p>
            </div>
            <div className="widgetcard">
              <p>
                <b>City:</b> {weather.location.name}
              </p>
              <p>
                <b>Country:</b> {weather.location.country}
              </p>
            </div>

            <div className="widgetcard">
              <p>
                <b>Humidity:</b> {weather?.current?.humidity}
              </p>
              <p>
                <b>UV Index:</b> {weather?.current?.uv}
              </p>
              <p>
                <b>Wind mph:</b> {weather?.current?.wind_mph}
              </p>
              <p>
                <b>Wind kph:</b> {weather?.current?.wind_kph}
              </p>
            </div>
          </div>
          {!showLimited && (
            <>
              <div className="weather-cards">
                <div className="widgetcard">
                  <p>
                    <b>Cloud:</b> {weather?.current?.cloud}
                  </p>
                  <p>
                    <b>Precipitation:</b> {weather?.current?.precip_mm} mm
                  </p>
                  <p>
                    <b>Wind:</b> {weather?.current?.wind_kph} kph
                  </p>
                  <p>
                    <b>Wind Direction:</b> {weather?.current?.wind_dir}
                  </p>
                </div>
                <div className="widgetcard">
                  <p>
                    <b>Dew point Celsius:</b> {weather?.current?.dewpoint_c}°C
                  </p>{" "}
                  <p>
                    <b>Dew point Farenheit:</b> {weather?.current?.dewpoint_f}°F
                  </p>
                  <p>
                    <b>Heat Index Celsius:</b> {weather?.current?.heatindex_c}°C
                  </p>
                  <p>
                    <b>Heat Index Farenheit:</b> {weather?.current?.heatindex_f}
                    °F
                  </p>
                </div>
              </div>
              <p>Last Updated on: {weather?.current?.last_updated}</p>
            </>
          )}
        </div>
      ) : (
        <p>Failed to fetch data...</p>
      )}
    </div>
  );
};

export default WeatherData;
