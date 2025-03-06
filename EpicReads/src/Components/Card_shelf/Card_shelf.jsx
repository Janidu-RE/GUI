import React from "react";
import "./Card_All.css"; // Use the same CSS for consistent styling

const BookshelfCard = ({ book, section, onRemove }) => {
  const { volumeInfo } = book;
  const { title, authors, imageLinks } = volumeInfo || {};
  const imageUrl = imageLinks ? imageLinks.thumbnail : "https://via.placeholder.com/250x350";

  return (
    <div className="product-card">
      <div className="card-image">
        <img src={imageUrl} alt={title || "Book Cover"} className="product-thumb" />
        <div className="btn-container">
          <button className="btn" onClick={() => onRemove(book.id, section)}>
            Remove
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="card-title">{title || "No Title Available"}</h3>
        <p className="card-author">{authors ? authors.join(", ") : "Unknown Author"}</p>
      </div>
    </div>
  );
};

export default BookshelfCard;