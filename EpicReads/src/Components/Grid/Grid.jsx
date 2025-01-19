import React, { useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import "./Grid.css";
import axios from "axios";

function Grid({ count }) { // Destructure the `count` prop
  const cardsContainerRef = useRef(null);
  const [autoSlide, setAutoSlide] = useState(true);

  const cards = [];
  for (let i = 0; i < count; i++) {
    cards.push(<Card key={i} />);
  }

  const scrollNext = () => {
    const container = cardsContainerRef.current;
    container.scrollBy({ left: 310, behavior: "smooth" });
    setAutoSlide(false);
  };

  const scrollBack = () => {
    const container = cardsContainerRef.current;
    container.scrollBy({ left: -310, behavior: "smooth" });
    setAutoSlide(false);
  };

  useEffect(() => {
    const container = cardsContainerRef.current;
    if (autoSlide) {
      const interval = setInterval(() => {
        container.scrollBy({ left: 310, behavior: "smooth" });
      }, 2000);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [autoSlide]);

  return (
    <div className="grid-wrapper">
      <div className="grid" ref={cardsContainerRef}>
        {cards}
      </div>
    </div>
  );
}

export default Grid;
