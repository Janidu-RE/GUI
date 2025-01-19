import React from "react";
import { useLocation } from "react-router-dom";
import Card from "../../Components/Card/Card.jsx"; // Import the Card component
import "./Search.css";
import Navbar from "../../Components/Navbar/NavigationBar";

const Search = () => {
  // Use useLocation to access the state passed via navigate
  const location = useLocation();
  const { books } = location.state || {}; // Get the books array from state

  return (
    <div>
      <Navbar />
    <div className="search-results">
      <h2 className="Search-title">Search Results</h2>
      {books && books.length > 0 ? (
        <div className="card-container">
          <Card books={books} /> {/* Pass books to Card component */}
        </div>
      ) : (
        <p>No results found. Try searching for a book.</p>
      )}
      </div>
    </div>
  );
};

export default Search;
