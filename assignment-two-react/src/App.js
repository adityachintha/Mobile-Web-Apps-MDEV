import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Calculator from "./components/Calculator";
import Checklist from "./components/Checklist";
import Logout from "./auth/Logout";
import Calendar from "./components/Calender";
import NewsData from "./components/NewsData";
import WeatherData from "./components/WeatherData";
import UserList from "./components/UserList";
import SpaceStationData from "./components/SpaceStationData";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="news" element={<NewsData />} />
          <Route path="weather" element={<WeatherData />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="checklist" element={<Checklist />} />
          <Route path="calender" element={<Calendar />} />
          <Route path="users" element={<UserList />} />
          <Route path="space" element={<SpaceStationData />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
