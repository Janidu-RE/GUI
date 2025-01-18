import * as React from "react";
import styles from './NavigationBar.module.css';
import logo_1 from '../../assets/logo_1.png'
import { Link } from 'react-router-dom';

const navLinks = [
  { text: 'Home', to: '/Home' },
  { text: 'Ebooks', to: '/Ebook' },
  { text: 'Book Shelf', to: '/Shelf' }
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
          <Link to="/Login" className={styles.loginLink}>Login</Link>
          <button className={styles.signUpButton}>
            <Link to="/Signup" className={styles.buttonContent}>Sign Up</Link>
          </button>
        </div>
      </div>
    </nav>
  );
}