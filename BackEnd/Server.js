const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Database setup
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to SQLite database');
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// Signup endpoint
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.get(
    'SELECT * FROM users WHERE email = ? OR username = ?',
    [email, username],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (row) {
        const errors = {};
        if (row.email === email) errors.email = 'Email already exists';
        if (row.username === username) errors.username = 'Username already exists';
        return res.status(409).json({ errors });
      }

      // Store plain text password
      db.run(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password],
        function(err) {
          if (err) {
            return res.status(500).json({ error: 'Failed to create user' });
          }
          res.status(201).json({ message: 'User created successfully' });
        }
      );
    }
  );
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  db.get(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Compare plain text passwords
      if (password !== user.password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      res.json({ 
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});