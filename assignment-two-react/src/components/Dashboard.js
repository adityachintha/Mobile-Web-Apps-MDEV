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
        <div className="flex-1">
          <div className="widget" id="widget-1">
            <UserProfile />
          </div>
          <div className="widget" id="widget-3">
            <WeatherData showLimited={true} />
          </div>
        </div>
        <div className="flex-2">
          <div className="widget" id="widget-2">
            <UserList showLimited={true} />
          </div>
          <div className="widget" id="widget-4">
            <NewsData showLimited={true} />
          </div>
          <div className="widget" id="widget-5">
            <SpaceStationData showLimited={true}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
