import * as React from "react";
import styles from './NavigationBar.module.css';
import logo_1 from '../../assets/logo_1.png'
import { Link } from 'react-router-dom';

const navLinks = [
  { text: 'Home', to: '/Home' },
  { text: 'Book Categories', to: '/categories' },
  { text: 'Book Shelf', to: '/shelf' }
];

export default function NavigationBar() {
  return (
    <nav className={styles.navigationBar}>
      <div className={styles.navigationWrapper}>
        <div className={styles.navigationLinks}>
          <div >
            <Link to='/'>
              <img
                loading="lazy"
                src={logo_1}
                className={styles.brandLogo}
                alt="EpicReads Logo"
            />
            </Link>
          </div>
          {navLinks.map((link) => (
            <Link 
              key={link.text}
              to={link.to}
              className={styles.navLink}
            >
              {link.text}
            </Link>
          ))}
        </div>
        <div className={styles.authContainer}>
          <a href="/login" className={styles.loginLink}>Login</a>
          <button className={styles.signUpButton}>
            <span className={styles.buttonContent}>Sign Up</span>
          </button>
        </div>
      </div>
    </nav>
  );
}