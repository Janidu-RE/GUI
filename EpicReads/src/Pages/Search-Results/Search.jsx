import React from "react";
import { useLocation } from "react-router-dom";
import Card from '../../Components/Card/Card.jsx'; // Import the Card component
import "./Search.css";

const Search = () => {
  // Use useLocation to access the state passed via navigate
  const location = useLocation();
  const { books } = location.state || {}; // Get the books array from state
  
  return (
    <div className="search-results">
      <h2>Search Results</h2>
      {books && books.length > 0 ? (
        <div className="card-container">
          <Card books={books} /> {/* Pass books to Card component */}
        </div>
      ) : (
        <p>No results found. Try searching for a book.</p>
      )}
    </div>
  );
};

export default Search;
