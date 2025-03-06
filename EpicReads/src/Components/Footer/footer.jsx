import React from "react";
import "./Footer.css"; 
import logo from '../../assets/logo.png'
import styles from '../Navbar/NavigationBar.module.css';
import logo_1 from '../../assets/logo_1.png'
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <div>
                                <img
                                  loading="lazy"
                                  src={logo_1}
                                  alt="EpicReads Logo"
                                />
                              </div>
                    <p className="footer-description">
                        Your one-stop destination to discover, track, and plan your reading journey.
                    </p>
                </div>

                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/AllBooks">All Books</Link></li>
                        <li><Link to="/Bookshelf">Book Shelf</Link></li>
                        <li><Link to="/Ebook">Ebooks</Link></li>
                    </ul>
                </div>

                <div className="footer-social">
                    <h4>Follow Us</h4>
                    <a href="#" className="social-icon"><i className="fab fa-facebook "></i></a>
                    <a href="#" className="social-icon"><i className="fab fa-twitter "></i></a>
                    <a href="#" className="social-icon"><i className="fab fa-instagram "></i></a>
                    <a href="#" className="social-icon"><i className="fab fa-youtube "></i></a>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2025 EpicReads. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
