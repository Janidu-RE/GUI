import React from "react";
import "./Card_2.css";

const Card = ({ books }) => {
  // If no books are provided or books array is empty
  if (!books || books.length === 0) {
    return <div></div>;
  }

  return (
    <div className="card-product-container">
      {books.map((item, index) => {
        // Destructure volumeInfo from each item
        const volumeInfo = item.volumeInfo || {};
        const { title, authors, imageLinks } = volumeInfo;

        // Handle case where thumbnail image might be missing
        const imageUrl = imageLinks ? imageLinks.thumbnail : "https://via.placeholder.com/250x350";

        return (
          <div className="card-product-card" key={index}>
            <div className="card-card-image">
              <img
                src={imageUrl}
                alt={title || "Book Cover"}
                className="card-product-thumb"
              />
              <div className="card-btn-container">
                <button className="btn">Already Read</button>
                <button className="btn">Willing to Read</button>
              </div>
            </div>
            <div className="card-product-info">
              <h3 className="card-card-title">{title || "No Title Available"}</h3>
              <p className="card-card-author">{authors ? authors.join(", ") : "Unknown Author"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
