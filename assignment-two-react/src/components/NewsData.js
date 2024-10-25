// Team Members - Aditya Chintha (200595829), Abhirami Pradeep Susi (200589663)
// File  - NewsData.js
// Mobile Web Apps Assignment 2

import React, { useState, useEffect } from "react"; //Importing usestate and useeffect
import "../css/Dashboard.css"; //Importing dashboard css
import axios from "axios"; // Importing axios

//Function for NewsData
const NewsData = ({ showLimited }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //use effect for fetching news data
  useEffect(() => {
    const fetchNewsData = async () => {
      const options = {
        method: "GET",
        url: "https://ok.surf/api/v1/cors/news-feed", // News API
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        setData(response.data.Business || []); // Adjusted to match API response
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  return (
    <div className={!showLimited && "news-data-container"}>
      <h1>News</h1>
      {/* Displaying News Widget from API*/}
      {loading ? (
        <p>Loading news data...</p>
      ) : data.length > 0 ? (
        <ul>
          {data.slice(0, 10).map((newsItem, index) => (
            <li key={index}>
              <a href={newsItem.link} target="_blank">
                {newsItem.title}
              </a>
              <p>{newsItem.source}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No news data available.</p>
      )}
    </div>
  );
};

export default NewsData;
