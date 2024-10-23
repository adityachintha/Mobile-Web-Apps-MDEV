import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const SpaceStationData = () => {
  const [data, setData] = useState(null);
  const [loadingISS, setLoadingISS] = useState(true);
  const [people, setPeople] = useState([]);
  const [loadingPeople, setLoadingPeople] = useState(true);

  // Fetch ISS Position Data
  const fetchSpaceData = async () => {
    const options = {
      method: "GET",
      url: "http://api.open-notify.org/iss-now.json",
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching ISS position data:", error);
    } finally {
      setLoadingISS(false);
    }
  };

  // Fetch People in Space Data
  const fetchPeopleData = async () => {
    const options = {
      method: "GET",
      url: "http://api.open-notify.org/astros.json",
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setPeople(response.data.people); // Accessing the correct response structure
    } catch (error) {
      console.error("Error fetching people in space data:", error);
    } finally {
      setLoadingPeople(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchSpaceData();
    fetchPeopleData();
  }, []);

  return (
    <div>
      {/* ISS Position */}
      {loadingISS ? (
        <p>Loading ISS position data...</p>
      ) : data ? (
        <div>
          <h3>ISS Position</h3>
          <div className="widgetcardSpace">
            <p>Latitude: {data.iss_position.latitude} N</p>
            <p>Longitude: {data.iss_position.longitude} E</p>
          </div>
        </div>
      ) : (
        <p>Failed to fetch ISS position data...</p>
      )}

      {/* People in Space */}
      {loadingPeople ? (
        <p>Loading people in space data...</p>
      ) : people.length > 0 ? (
        <div>
          <h3>People in Space Right Now</h3>
          <div className="widgetcardSpace">
            <h1>{people.length}</h1>
          </div>
          <ul>
            {people.slice(0, 10).map((person, index) => (
              <li key={index}>
                <p>
                  <b>{person.name}</b>
                </p>
                <p>Craft: {person.craft}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Failed to fetch people in space data...</p>
      )}
    </div>
  );
};

export default SpaceStationData;
