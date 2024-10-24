// Team Members - Aditya Chintha (200595829), Abhirami Pradeep Susi (200589663)
// File  - Lagout.js
// Mobile Web Apps Assignment 2

import { useEffect } from "react"; //Importing use effect
import { useNavigate } from "react-router-dom"; // importing navigate

//Function for Logout
const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the user data from localStorage (or any other cache mechanism)
    localStorage.removeItem("user");

    // Redirect to the login page
    navigate("/");
  }, [navigate]);

  return null; // No UI needed for logout, so return null
};

export default Logout;
