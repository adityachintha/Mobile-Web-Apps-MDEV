import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
