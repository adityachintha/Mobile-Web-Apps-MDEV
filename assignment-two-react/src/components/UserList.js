import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";
import "../css/Dashboard.css"; // Import custom CSS

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //fetch all user data from firestore
    const fetchUsers = async () => {
      try {
        const userQuery = query(collection(db, "users"));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          const userList = querySnapshot.docs.map((doc) => doc.data());
          setUsers(userList);
        } else {
          console.log("No user data found in Firestore.");
        }
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list-container">
      <ul className="user-list">
        {users.map((user, index) => (
          <li key={index} className="user-card">
            <div className="user-details">
              <h4>Name: {user.firstName + " " + user.lastName} </h4>
              <p>Email: {user.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
