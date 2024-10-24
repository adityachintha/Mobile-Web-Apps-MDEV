// Team Members - Aditya Chintha (200595829), Abhirami Pradeep Susi (200589663)
// File  - SpaceStationData.js
// Mobile Web Apps Assignment 2

import React, { useState, useEffect } from "react"; //Importing usestate and useeffect
import axios from "axios"; // Importing axios
import "../css/Dashboard.css"; //Importing Dashboard

//Function for Space station data
const SpaceStationData = ({ showLimited }) => {
  const [data, setData] = useState(null); //usestate for lat and longitude position
  const [loadingISS, setLoadingISS] = useState(true); // usestate for ISS
  const [people, setPeople] = useState([]); // use state for people in space
  const [loadingPeople, setLoadingPeople] = useState(true); // use state for for people in space

  // Function to Fetch ISS Position Data
  const fetchSpaceData = async () => {
    const options = {
      method: "GET",
      url: "http://api.open-notify.org/iss-now.json", // Open Notify API
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setData(response.data); //set for all data
    } catch (error) {
      console.error("Error fetching ISS position data:", error);
    } finally {
      setLoadingISS(false);
    }
  };

  // Function to Fetch People in Space Data
  const fetchPeopleData = async () => {
    const options = {
      method: "GET",
      url: "http://api.open-notify.org/astros.json", // Open Notify API
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setPeople(response.data.people); // set for people
    } catch (error) {
      console.error("Error fetching people in space data:", error);
    } finally {
      setLoadingPeople(false);
    }
  };

  // Use Effect
  useEffect(() => {
    fetchSpaceData(); //Calling the function for space data
    fetchPeopleData(); // calling the function for people data
  }, []);

  return (
    <div className={!showLimited && "space-data-container"}>
      <h1>NASA Space</h1>

      {/* ISS Position */}
      {loadingISS ? (
        <p>Loading ISS position data...</p>
      ) : data ? (
        <div>
          <h3>ISS Position</h3>
          <div className="widgetcardSpace">
            <p>Latitude: {data.iss_position.latitude} N</p>{" "}
            {/* Latitude position */}
            <p>Longitude: {data.iss_position.longitude} E</p>{" "}
            {/* Longitude  position */}
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
            <h1>{people.length}</h1> {/* Number of people*/}
          </div>
          <ul>
            {people.slice(0, 10).map((person, index) => (
              <li key={index}>
                <p>
                  <b>{person.name}</b> {/* Person name */}
                </p>
                <p>Craft: {person.craft}</p> {/* person Craft */}
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
