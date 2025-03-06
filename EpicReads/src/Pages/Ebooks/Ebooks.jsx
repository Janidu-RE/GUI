import React, { useState, useEffect } from 'react';
import Card from '../../Components/card_Ebook/card_Ebook.jsx';
import axios from 'axios';
import Navbar from '../../Components/Navbar/NavigationBar.jsx';
import Searchbar from '../../Components/searchbar/searchbar.jsx';

const Ebooks = () => {
  const [eBooks, setEbooks] = useState([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (searchQuery = '', genreFilter = '') => {
    setLoading(true);
    try {
      // Always include the free-ebooks filter
      let queryParams = ['free-ebooks'];
      
      if (searchQuery) {
        queryParams.push(searchQuery);
      }
      if (genreFilter) {
        queryParams.push(`subject:${genreFilter}`);
      }

      const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${queryParams.join('+')}&filter=free-ebooks&maxResults=40&key=AIzaSyAzXezPkeYGmLSZmdmivT3eeUM-oD31Rac`;

      const response = await axios.get(apiUrl);
      setEbooks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle initial load and genre/search changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBooks(search, genre);
    }, 500); // Add slight debounce to search

    return () => clearTimeout(timer);
  }, [search, genre]);

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
        <div className="loading-indicator">Loading free ebooks...</div>
      ) : (
        <Card books={eBooks} />
      )}
    </div>
  );
};

export default Ebooks;