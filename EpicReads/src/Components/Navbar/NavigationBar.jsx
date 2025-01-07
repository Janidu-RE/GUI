import * as React from "react";
import styles from './NavigationBar.module.css';
import logo from '../../assets/logo.png'

const navLinks = [
  { text: 'Home', href: '/' },
  { text: 'Book Categories', href: '/categories' },
  { text: 'Book Shelf', href: '/shelf' }
];

export default function NavigationBar() {
  return (
    <nav className={styles.navigationBar}>
      <div className={styles.navigationWrapper}>
        <div className={styles.navigationLinks}>
          <div className={styles.brandContainer}>
            <img
              loading="lazy"
              src={logo}
              className={styles.brandLogo}
              alt="EpicReads Logo"
            />
            <div className={styles.brandName}>EpicReads</div>
          </div>
          {navLinks.map((link) => (
            <a 
              key={link.text}
              href={link.href}
              className={styles.navLink}
            >
              {link.text}
            </a>
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