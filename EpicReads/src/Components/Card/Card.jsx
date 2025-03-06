// src/components/Card/Card.jsx
import React from 'react';
import { useBookshelf } from '../../Context/BookshelfContext';
import './Card.css';

const Card = ({ books }) => {
  const { addToShelf } = useBookshelf();

  return (
    <div className="product-container">
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
                  onClick={() => addToShelf('alreadyRead', item)}
                >
                  Already Read
                </button>
                <button 
                  className="btn"
                  onClick={() => addToShelf('wantToRead', item)}
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