// src/pages/BookShelf.jsx
import React from 'react';
import { useBookshelf } from '../../Context/BookshelfContext';
import NavBar from "../../Components/Navbar/NavigationBar";
import './BookShelf.css';

const BookShelf = () => {
  const { shelves, removeFromShelf } = useBookshelf();

  const BookCard = ({ book, onRemove }) => (
    <div className="book-card">
      <img
        src={book.volumeInfo?.imageLinks?.thumbnail || 'https://via.placeholder.com/150x200'}
        alt={book.volumeInfo?.title || 'Book cover'}
      />
      <div className="book-info">
        <h3>{book.volumeInfo?.title || 'Untitled Book'}</h3>
        <p>{book.volumeInfo?.authors?.join(', ') || 'Unknown Author'}</p>
        <button onClick={onRemove} className="remove-btn">
          Remove
        </button>
      </div>
    </div>
  );

  return (
    <div>
        <NavBar />
    <div className="bookshelf-container">
      <h1>My Bookshelf</h1>
      
      <div className="shelf-section">
        <h2>Wishlist ({shelves.wantToRead.length})</h2>
        <div className="books-grid">
          {shelves.wantToRead.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onRemove={() => removeFromShelf('wantToRead', book.id)}
            />
          ))}
        </div>
      </div>

      <div className="shelf-section">
        <h2 className='name'>Already Read ({shelves.alreadyRead.length})</h2>
        <div className="books-grid">
          {shelves.alreadyRead.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onRemove={() => removeFromShelf('alreadyRead', book.id)}
            />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default BookShelf;