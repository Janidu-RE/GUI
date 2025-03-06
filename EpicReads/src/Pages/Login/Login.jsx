import React, { useState } from "react";
import "./Login.css";
import Navbar from "../../Components/Navbar/NavigationBar.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8001/login', {
        username,
        password
      });

      if (response.data.message === 'Login successful') {
        // Store user data in localStorage or context
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // Navigate to home page and pass the alert message via state
        navigate("/", { state: { alertMessage: "Login Successful" } });
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || 'Login failed');
      } else {
        setError('Network error. Please try again.');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-page">
        <div className="login-container">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
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
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <p className="signup-text">
            Don't have an account? <Link to="/Signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
