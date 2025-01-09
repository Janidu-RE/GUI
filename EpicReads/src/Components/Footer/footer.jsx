import React from "react";
import "./Footer.css"; 
import logo from '../../assets/logo.png'
import styles from '../Navbar/NavigationBar.module.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <div className={styles.brandContainer}>
                                <img
                                  loading="lazy"
                                  src={logo}
                                  className={styles.brandLogo}
                                  alt="EpicReads Logo"
                                />
                                <div className={styles.brandName}>EpicReads</div>
                              </div>
                    <p className="footer-description">
                        Your one-stop destination to discover, track, and plan your reading journey.
                    </p>
                </div>

                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Book Categories</a></li>
                        <li><a href="#">Book Shelf</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>

                <div className="footer-social">
                    <h4>Follow Us</h4>
                    <a href="#" className="social-icon"><i className="fab fa-facebook "></i></a>
                    <a href="#" className="social-icon"><i className="fab fa-twitter "></i></a>
                    <a href="#" className="social-icon"><i className="fab fa-instagram "></i></a>
                    <a href="#" className="social-icon"><i className="fab fa-linkedin "></i></a>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2025 EpicReads. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
