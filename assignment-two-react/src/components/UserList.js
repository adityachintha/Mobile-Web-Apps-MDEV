import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom"; // Use Link for anchor navigation
import "../css/Dashboard.css"; // Import custom CSS

const UserList = ({ showLimited }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all user data from Firestore
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
    <div className={!showLimited && "userlist-container-main"}>
      <h1>User List</h1>

      <div className="user-list-container">
        <ul className="user-list">
          {/* Show only the first 10 users if showLimited is true */}
          {users
            .slice(0, showLimited ? 10 : users.length)
            .map((user, index) => (
              <li key={index} className="user-card">
                <div className="user-details">
                  <h4>Name: {user.firstName + " " + user.lastName} </h4>
                  <p>Email: {user.email}</p>
                </div>
              </li>
            ))}
        </ul>

        {/* Display 'View More' link if showLimited is true and there are more than 10 users */}
        {showLimited && users.length > 10 && (
          <Link to="/users" className="view-more-link">
            View More
          </Link>
        )}
      </div>
    </div>
  );
};

export default UserList;
