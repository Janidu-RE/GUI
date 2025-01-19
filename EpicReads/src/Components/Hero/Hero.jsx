import React, { useState, useEffect } from "react";
import "./Hero.css";
import axios from "axios";
import Card from "../Card/Card.jsx";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [search, setSearch] = useState(""); // Stores the search input value
  const [bookData, setBookData] = useState([]); // Stores fetched book data
  const navigate = useNavigate();


  useEffect(() => {
    if (search.trim() === "") return; // Avoid API calls for empty search terms

    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40&key=AIzaSyAzXezPkeYGmLSZmdmivT3eeUM-oD31Rac`
        );
        setBookData(response.data.items || []); // Safely handle cases with no items
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchBooks();
    }, 500); // Debounce to reduce API calls

    return () => clearTimeout(delayDebounceFn); // Cleanup timeout
  }, [search]);

  const handleSearch = () => {
    
      // Navigate to the search results page with bookData as state
      navigate("/Search", { state: { books: bookData } });
    
  };

  return (
    <div>
      <div className="hero">
        <p className="title">
          Discover, Track, and Plan Your <br />
          Reading Journey
        </p>
        <p className="paragraph">
          Explore detailed book information and effortlessly manage your reading
          journey.
          <br /> Track books you've read, plan your future reads, and discover
          new favorites—all in one place!
        </p>
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search a Book"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="book-container">
      </div>
    </div>
  );
};

export default Hero;
