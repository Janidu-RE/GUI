import React from "react";
import { useNavigate } from "react-router-dom";
import "../Card/Card.css";

const Card_Ebook = ({ books }) => {
  const navigate = useNavigate();


  if (!books || books.length === 0) {
    return <div>No books found. Try searching for something else!</div>;
  }

  const handleReadNow = (volumeId) => {
    navigate(`/viewer/${volumeId}`);
  };

  return (
    <div className="product-container">
      {books.map((item, index) => {
        const volumeInfo = item.volumeInfo || {};
        const { title, authors, imageLinks, industryIdentifiers } = volumeInfo;
        const volumeId = item.id;

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
                <button className="btn" onClick={() => handleReadNow(volumeId)}>
                  Read Now
                </button>
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

export default Card_Ebook;