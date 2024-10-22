import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const WeatherData = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("Toronto"); // Default city on initial load

  // Fetch weather data from Weather API
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

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Fetch weather data on initial load
  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div>
      <div className="widgetInput">
        <input
          type="text"
          placeholder="Enter your City"
          value={query}
          onChange={handleInputChange}
          className="weather"
        />
        <button className="nav-link" onClick={fetchWeatherData}>
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading weather data...</p>
      ) : weather ? (
        <div>
          <div className="widgetcard">
            <div className="widgetcardtwo">
              <img src={weather.current.condition.icon}></img>
              <h2>{weather.current.temp_c}°C</h2>
            </div>
            <p>{weather.current.condition.text}</p>
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
              <b>Humidity:</b> {weather.current.humidity}
            </p>
            <p>
              <b>UV Index:</b> {weather.current.uv}
            </p>
            <p>
              <b>Wind mph:</b> {weather.current.wind_mph}
            </p>
            <p>
              <b>Wind kph:</b> {weather.current.wind_kph}
            </p>
          </div>
          <p>Last Updated on: {weather.current.last_updated}</p>
        </div>
      ) : (
        <p>Failed to fetch data...</p>
      )}
    </div>
  );
};

export default WeatherData;
