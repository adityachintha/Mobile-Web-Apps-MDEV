import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./auth/Register";
import Dashboard from "./components/Dashboard";
import Login from "./auth/Login";
import UserProfile from "./components/UserProfile";
import UserList from "./components/UserList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
};

export default App;
