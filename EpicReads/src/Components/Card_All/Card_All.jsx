import React from "react";
import "./Card_All.css"; // Import the CSS file

const Card = ({ books }) => {
  // If no books are provided or books array is empty
  if (!books || books.length === 0) {
    return <div>No books found. Try searching for something else!</div>;
  }

  return (
    <div className="product-container">
      {books.map((item, index) => {
        // Destructure volumeInfo from each item
        const volumeInfo = item.volumeInfo || {};
        const { title, authors, imageLinks } = volumeInfo;

        // Handle case where thumbnail image might be missing
        const imageUrl = imageLinks ? imageLinks.thumbnail : "https://via.placeholder.com/250x350";

        return (
          <div className="product-card" key={index}>
            <div className="card-image">
              <img
                src={imageUrl}
                alt={title || "Book Cover"}
                className="product-thumb"
              />
              <div className="btn-container">
                <button className="btn">Already Read</button>
                <button className="btn">Willing to Read</button>
              </div>
            </div>
            <div className="product-info">
              <h3 className="card-title">{title || "No Title Available"}</h3>
              <p className="card-author">{authors ? authors.join(", ") : "Unknown Author"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;