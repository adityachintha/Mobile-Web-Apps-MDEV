import React, { useState } from "react";
import { auth, db } from '../firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom"; 
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css"; 
const Register = () => {
  // State variables for form data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State variables for error messages
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setFirebaseError("");

    let isValid = true;

    // Basic input validation
    if (!firstName) {
      setFirstNameError("First name is required.");
      isValid = false;
    }

    if (!lastName) {
      setLastNameError("Last name is required.");
      isValid = false;
    }

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

    if (!isValid) return;

    // Firebase authentication and Firestore user creation
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user data to Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        firstName,  
        lastName,   
      });

toast.success("User Registered Successfully", { autoClose: 3000 });    
      navigate("/login");
    } catch (error) {
      // Firebase-specific error handling
      if (error.code === "auth/email-already-in-use") {
        setFirebaseError("This email is already in use.");
      } else if (error.code === "auth/weak-password") {
        setFirebaseError("The password is too weak.");
      } else {
        setFirebaseError(error.message);
      }
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handlers for input changes
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    if (firstNameError) {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (lastNameError) {
      setLastNameError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) {
      setPasswordError("");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {firebaseError && <p className="error-message">{firebaseError}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="First Name"
            className={`input-field ${firstNameError ? "input-error" : ""}`}
          />
          {firstNameError && <p className="error-text">{firstNameError}</p>}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Last Name"
            className={`input-field ${lastNameError ? "input-error" : ""}`}
          />
          {lastNameError && <p className="error-text">{lastNameError}</p>}
        </div>
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
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className={`input-field ${passwordError ? "input-error" : ""}`}
          />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />} 
          </span>
          {passwordError && <p className="error-text">{passwordError}</p>}
        </div>
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
      <div className="login">
        Already registered? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
