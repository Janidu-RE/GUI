import React from "react";
import "./Card.css";

const Card = ({ books }) => {
  if (!books || books.length === 0) {
    return <div>No books found. Try searching for something else!</div>;
  }

  return (
    <div className="product-container">
      {books.map((item, index) => {
        const volumeInfo = item.volumeInfo || {};
        const { title, authors, imageLinks } = volumeInfo;

        return (
          <div className="product-card" key={index}>
            <div className="card-image">
              <img
                src={imageLinks?.thumbnail || "https://via.placeholder.com/250x350"}
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
              <p className="card-author">{authors?.join(", ") || "Unknown Author"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
