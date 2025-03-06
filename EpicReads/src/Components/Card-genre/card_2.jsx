import React, { useEffect, useRef, useState } from "react";
import { useBookshelf } from '../../Context/BookshelfContext';
import "./Card_2.css";

const Card = ({ books }) => {
  const { addToShelf } = useBookshelf();
  const containerRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [intervalId, setIntervalId] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "" });

  const calculateScrollStep = () => {
    if (!containerRef.current) return 270;
    const firstCard = containerRef.current.querySelector(".card-product-card");
    if (!firstCard) return 270;
    
    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = 20;
    return cardWidth + gap;
  };

  const handleScrollLeft = () => {
    if (containerRef.current) {
      const scrollStep = calculateScrollStep();
      containerRef.current.scrollLeft -= scrollStep;
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      const scrollStep = calculateScrollStep();
      containerRef.current.scrollLeft += scrollStep;
    }
  };

  const handleAddToShelf = (shelf, item) => {
    addToShelf(shelf, item);
    setAlert({ show: true, message: `Book added to ${shelf.replace(/([A-Z])/g, " $1").toLowerCase()}!` });

    setTimeout(() => {
      setAlert({ show: false, message: "" });
    }, 3000);
  };

  useEffect(() => {
    if (autoScroll && books.length > 0) {
      const id = setInterval(() => {
        if (!containerRef.current) return;
        
        const scrollStep = calculateScrollStep();
        const container = containerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += scrollStep;
        }
      }, 1500);
      
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [autoScroll, books]);

  if (!books || books.length === 0) {
    return <div></div>;
  }

  return (
    <div 
      className="card-slider-wrapper"
      onMouseEnter={() => setAutoScroll(false)}
      onMouseLeave={() => setAutoScroll(true)}
    >
      {alert.show && (
        <div className="success-alert">
          <span className="checkmark">✔</span> {alert.message}
        </div>
      )}

      <div className="card-product-container" ref={containerRef}>
        {books.map((item, index) => {
          const volumeInfo = item.volumeInfo || {};
          const { title, authors, imageLinks } = volumeInfo;
          const imageUrl = imageLinks?.thumbnail || "https://via.placeholder.com/250x350";

          return (
            <div className="card-product-card" key={index}>
              <div className="card-card-image">
                <img
                  src={imageUrl}
                  alt={title || "Book Cover"}
                  className="card-product-thumb"
                />
                <div className="card-btn-container">
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
              <div className="card-product-info">
                <h3 className="card-card-title">{title || "No Title Available"}</h3>
                <p className="card-card-author">{authors?.join(", ") || "Unknown Author"}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="slider-btn left" onClick={handleScrollLeft}>&lt;</button>
      <button className="slider-btn right" onClick={handleScrollRight}>&gt;</button>
    </div>
  );
};

export default Card;
