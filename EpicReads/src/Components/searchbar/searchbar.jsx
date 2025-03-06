import React, { useState } from 'react';
import './searchbar.css';

const Searchbar = ({ search, setSearch, genre, setGenre }) => {
  const genres = [
    'Thriller',
    'Fiction',
    'Non Fiction',
    'Children',
    'Fantasy',
    'History',
  ];

  return (
    <div className="searchbar_container">
      <div className="dropdown">
        <button className="dropbtn">
          <img src="./assets/settings.png" className="dropdown-image" alt="Settings" />
        </button>
        <div className="dropdown-content">
          {genres.map((g, index) => (
            <a key={index} href="#" onClick={() => setGenre(g)}>
              {g}
            </a>
          ))}
          <a href="#" onClick={() => setGenre('')}>All Genres</a>
        </div>
      </div>
      <div className="search_container">
        <input
          type="text"
          className="search_bar"
          placeholder="Search books"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </div>
    </div>
  );
};

export default Searchbar;