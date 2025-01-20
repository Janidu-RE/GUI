import React, { useState, useEffect } from "react";
import Hero from "../../Components/Hero/Hero";
import "./Home.css";
import Navbar from "../../Components/Navbar/NavigationBar";
import Card from "../../Components/Card-genre/card_2.jsx";
import axios from "axios";

const Home = () => {
  const [fictionBooks, setFiction] = useState([]);
  const [clidrenBooks, setChildren] = useState([]);
  const [nonFictionBooks, setNonFiction] = useState([]);
  

  // Fetch books from the Google Books API
  const fetchBooks = async (query,setBookData) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${query}&maxResults=20&key=AIzaSyAzXezPkeYGmLSZmdmivT3eeUM-oD31Rac`
      );
      setBookData(response.data.items || []); // Safely handle cases with no items
      console.log(response); // Check the response data in the console
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Call fetchBooks when the component mounts
  useEffect(() => {
    fetchBooks("fiction",setFiction);
    fetchBooks("children",setChildren);
    fetchBooks("nonfiction",setNonFiction);
  }, []);


  return (
    <div>
      <Navbar />
      <div className="back">
        <Hero />
      </div>
      <div className="books">
        
        <div className="bookTitle">
          <h3>FICTION</h3>
        </div>
        {/* Pass the bookData to the Card component */}
        <Card books={fictionBooks} />

        <div className="bookTitle">
          <h3>NON-FICTION</h3>
        </div>
        {/* Pass the bookData to the Card component */}
        <Card books={nonFictionBooks} />

        <div className="bookTitle">
          <h3>CHILDREN</h3>
        </div>
        {/* Pass the bookData to the Card component */}
        <Card books={clidrenBooks} />


      
      </div>
    </div>
  );
};

export default Home;
