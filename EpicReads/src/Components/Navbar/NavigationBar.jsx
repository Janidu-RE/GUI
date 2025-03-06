import * as React from "react";
import styles from './NavigationBar.module.css';
import logo_1 from '../../assets/logo_1.png';
import { Link, useNavigate } from 'react-router-dom';

const navLinks = [
  { text: 'All Books', to: '/Allbooks' },
  { text: 'Ebooks', to: '/Ebook' },
  { text: 'Book Shelf', to: '/bookshelf' }
];

export default function NavigationBar() {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className={styles.navigationBar}>
      <div className={styles.navigationWrapper}>
        <div className={styles.navigationLinks}>
          <div>
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
          {user ? (
            <>
              <span className={styles.welcomeMessage}>
                Welcome Back, <span className={styles.username}>{user.username}</span>
              </span>
              <button onClick={handleSignOut} className={styles.signOutButton}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/Login" className={styles.loginLink}>Login</Link>
              <button className={styles.signUpButton}>
                <Link to="/Signup" className={styles.buttonContent}>Sign Up</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}