// Team Members - Aditya Chintha (200595829), Abhirami Pradeep Susi (200589663)
// File  - Userprofile.js
// Mobile Web Apps Assignment 2

import React, { useState, useEffect } from "react"; //Importing usestate and use effect
import { db } from "../firebase"; //Importing db
import { collection, query, where, getDocs } from "firebase/firestore"; //Importing collection, query, where and getDocs
import "../css/Dashboard.css"; //Importing Dashboard css

//Function for userProfile

const UserProfile = () => {
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
      //Calling the function
      fetchUserData();
    } else {
      setLoading(false); //Set the load to false if data is fetched
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <div className="user-profile-widget">
        <img
          src={
            userData
              ? "https://xsgames.co/randomusers/avatar.php?g=male" //Random generating profile images
              : "default-avatar-url"
          } // Optional: set a default avatar URL
          alt="Profile"
          className="avatar"
        />
        <div>
          <h2>{userData?.firstName + " " + userData?.lastName}</h2>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
