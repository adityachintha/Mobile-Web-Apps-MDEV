import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const navigate = useNavigate();

  // Check if user is already logged in using localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      navigate("/dashboard"); // Redirect to dashboard if user is already logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setEmailError("");
    setPasswordError("");
    setAuthError("");

    // Basic input validation
    let isValid = true;

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    }

    if (!isValid) return; // Stop if validation failed

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
      }));

      // Navigate to the dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      setAuthError("Invalid email or password. Please try again.");
    }
  };

  // Update email state and clear email error if it exists
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError(""); // Clear email error when the user starts typing
    }
  };

  // Update password state and clear password error if it exists
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) {
      setPasswordError(""); // Clear password error when the user starts typing
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-container">
      <h2>Login</h2>
      {authError && <p className="error-message">{authError}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            className={`input-field ${emailError ? "input-error" : ""}`}
          />
          {emailError && <p className="error-text">{emailError}</p>}
        </div>
        
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"} // Conditionally set input type
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className={`input-field ${passwordError ? "input-error" : ""}`}
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icons */}
          </span>
          {passwordError && <p className="error-text">{passwordError}</p>}
        </div>
        
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
      <div>
        Not yet registered? <Link to="/">Register</Link>
      </div>
    </div>
  );
};

export default Login;
