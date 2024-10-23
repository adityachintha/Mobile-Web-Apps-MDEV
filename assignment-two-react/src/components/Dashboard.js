import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";
import WeatherData from "./WeatherData";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NewsData from "./NewsData";
import SpaceStationData from "./SpaceStationData";
import UserProfile from "./UserProfile";
import UserList from "./UserList";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);

      // Fetch user data from Firestore based on email
      const fetchUserData = async () => {
        try {
          const userQuery = query(
            collection(db, "users"),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(userQuery);
          if (!querySnapshot.empty) {
            const userDataDoc = querySnapshot.docs[0].data();
            setUserData(userDataDoc);
          } else {
            console.log("No user data found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="banner">
        <div className="banner-left">
          <img
            className="avatar"
            alt="avatar"
            src={
              userData
                ? "https://xsgames.co/randomusers/avatar.php?g=male"
                : "default-avatar-url"
            } // Optional: set a default avatar URL
          />
          <div className="bannertext">
            <h2 className="title">
              {userData
                ? `Hello, ${userData.firstName + " " + userData.lastName}!`
                : "Hello!"}
            </h2>
            <h2 className="subtitle">Welcome to your Dashboard..</h2>
          </div>
        </div>
      </div>

      {/* Widgets Section */}
      <div className="widgets-container">
        <div className="widget" id="widget-1">
          <h1>Profile</h1>
          <UserProfile />
        </div>
        <div className="widget" id="widget-2">
          <h1>User List</h1>
          <UserList />
        </div>
        <div className="widget" id="widget-3">
          <h1>Weather</h1>
          <WeatherData />
        </div>
        <div className="widget" id="widget-4">
          <h1>News</h1>
          <NewsData />
        </div>
        <div className="widget" id="widget-5">
          <h1>NASA Space</h1>
          <SpaceStationData />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
