import React, { useState, useEffect } from "react";
import "../css/Dashboard.css";
import axios from "axios";

const NewsData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      const options = {
        method: "GET",
        url: "https://ok.surf/api/v1/cors/news-feed",
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
    <div>
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
