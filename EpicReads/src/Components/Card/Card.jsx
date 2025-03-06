import React, { useState } from 'react';
import { useBookshelf } from '../../Context/BookshelfContext';
import './Card.css';

const Card = ({ books }) => {
  const { addToShelf } = useBookshelf();
  const [alert, setAlert] = useState(null);

// In Card.jsx - Update the handleAddToShelf function
const handleAddToShelf = (shelf, item) => {
  addToShelf(shelf, item);
  
  // Use the same message format as Card_2
  const shelfName = shelf.replace(/([A-Z])/g, " $1").toLowerCase();
  setAlert(`Book added to ${shelfName}!`);
  
  setTimeout(() => setAlert(null), 3000);
};

// Update the alert JSX in Card.jsx to match Card_2's structure
{alert && (
  <div className="success-alert">
    <span className="checkmark">✔</span>
    <span className="alert-content">{alert}</span>
  </div>
)}

  return (
    <div className="product-container">
      {alert && (
        <div className="success-alert">
          ✔ {alert}
        </div>
      )}
      {books.map((item) => {
        const volumeInfo = item.volumeInfo || {};
        const imageLinks = volumeInfo.imageLinks || {};

        return (
          <div className="product-card" key={item.id}>
            <div className="card-image">
              <img
                src={imageLinks.thumbnail || 'https://via.placeholder.com/250x350'}
                alt={volumeInfo.title}
                className="product-thumb"
              />
              <div className="btn-container">
                <button 
                  className="btn"
                  onClick={() => handleAddToShelf('alreadyRead', item)}
                >
                  Already Read
                </button>
                <button 
                  className="btn"
                  onClick={() => handleAddToShelf('wantToRead', item)}
                >
                  Willing to Read
                </button>
              </div>
            </div>
            <div className="product-info">
              <h3 className="card-title">{volumeInfo.title || 'Untitled'}</h3>
              <p className="card-author">
                {volumeInfo.authors?.join(', ') || 'Unknown Author'}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
