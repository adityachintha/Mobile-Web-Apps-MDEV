import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Calculator from "./components/Calculator";
import Checklist from "./components/Checklist";
import Logout from "./auth/Logout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="checklist" element={<Checklist />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
