import React from "react";
import "./Login.css";

const Login = () => {
    return (
        <div className="login-page">
          <div className="container">
            <div className="login-container">
                <h1 className="login-title">Welcome Back</h1>
                <p className="login-subtitle">Log in to your account to continue your reading journey.</p>
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required />
                    </div>
                    <button type="submit" className="login-btn">Log In</button>
                </form>
                <p className="signup-text">
                    Don't have an account? <a href="/signup">Sign up</a>
                </p>
            </div>
            <dev className="side-container">

            </dev>
          </div>
        </div>
    );
};

export default Login;
