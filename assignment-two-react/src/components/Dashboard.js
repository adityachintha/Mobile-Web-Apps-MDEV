import React from "react";
import { Link } from "react-router-dom";
import "";

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <Link to="/profile">Profile</Link>
        <Link to="/users">User List</Link>
      </nav>
    </div>
  );
};

export default Dashboard;
