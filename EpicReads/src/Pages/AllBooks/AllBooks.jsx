import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Don't forget to import axios
import Card from "../../Components/Card/Card.jsx";
import Navbar from '../../Components/Navbar/NavigationBar.jsx';
import Searchbar from '../../Components/searchbar/searchbar.jsx';
import "./AllBooks.css"

const AllBooks = () => {
  const [eBooks, setEbooks] = useState([]); // State to store fetched books
  const [search, setSearch] = useState(''); // State for search query
  const [genre, setGenre] = useState(''); // State for selected genre
  const [loading, setLoading] = useState(false); // State to handle loading state

  // Fetch books from the API based on search and genre
  const fetchBooks = async (query = 'free-ebooks', genre = '') => {
    setLoading(true);
    try {
      let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&key=AIzaSyAzXezPkeYGmLSZmdmivT3eeUM-oD31Rac`;
      
      // If a genre is selected, append it to the query
      if (genre) {
        apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}+subject:${genre}&maxResults=40&key=AIzaSyAzXezPkeYGmLSZmdmivT3eeUM-oD31Rac`;
      }

      const response = await axios.get(apiUrl);
      setEbooks(response.data.items || []); // Safely handle cases with no items
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch default books when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch books when the genre changes
  useEffect(() => {
    if (genre) {
      fetchBooks('', genre); // Fetch books for the selected genre
    } else {
      fetchBooks(); // Fetch all books if no genre is selected
    }
  }, [genre]);

  // Fetch books when the search query changes
  useEffect(() => {
    if (search) {
      fetchBooks(search, genre); // Fetch books based on search and genre
    } else {
      fetchBooks('', genre); // Fetch books based on genre only
    }
  }, [search]);

  return (
    <div>
      <Navbar />
      <Searchbar
        search={search}
        setSearch={setSearch}
        genre={genre}
        setGenre={setGenre}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Card books={eBooks} />
      )}
    </div>
  );
};

export default AllBooks;