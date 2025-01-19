import React, { useState, useEffect } from "react";
import Hero from "../../Components/Hero/Hero";
import "./Home.css";
import Navbar from "../../Components/Navbar/NavigationBar";
import Card from "../../Components/Card/Card";
import axios from 'axios';

const Landing = () => {
  const [bookData, setBookData] = useState([]);

  // Fetch books from the Google Books API
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:thriller&key=AIzaSyAzXezPkeYGmLSZmdmivT3eeUM-oD31Rac`
      );
      setBookData(response.data.items || []); // Safely handle cases with no items
      console.log(response); // Check the response data in the console
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Call fetchBooks when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="back">
        <Hero />
      </div>
      <div className="books">
        <div className="title_1">
          <h1>Trending Books</h1>
        </div>
        {/* Pass the bookData to the Card component */}
        <Card books={bookData} />
      </div>
    </div>
  );
};

export default Landing;
