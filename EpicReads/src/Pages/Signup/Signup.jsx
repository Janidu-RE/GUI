import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import Navbar from "../../Components/Navbar/NavigationBar.jsx";

const Signup = () => {
  const [username, setUsername]   = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [errors, setErrors]       = useState({});

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const values = { username, email, password };
    console.log("Sending request with data:", values);

    axios
      .post("http://localhost:8001/signup", values)
      .then((res) => {
        console.log("Signup successful:", res.data);
        setUsername("");
        setEmail("");
        setPassword("");
        setErrors({});

        // Immediately navigate to login page and pass the alert message via state
        navigate("/login", { state: { alertMessage: "Account Created Successfully" } });
      })
      .catch((err) => {
        console.error("Signup error:", err);
        if (err.response) {
          console.error("Response data:", err.response.data);
          setErrors(err.response.data.errors || { message: err.response.data.error });
        } else {
          console.error("Network or other error:", err.message);
          setErrors({ message: "An unexpected error occurred. Please try again." });
        }
      });
  };

  return (
    <div>
      <Navbar />
      <div className="login-page">
        <div className="login-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            {errors.message && <p className="error">{errors.message}</p>}
            <button type="submit" className="login-button">
              Sign Up
            </button>
          </form>
          <p className="signup-text">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
