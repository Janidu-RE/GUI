import { useState } from 'react';
import styles from './Card.module.css';

function Card() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
        {/* Front of the card */}
        <div className={styles.cardFront}>
          <div className={styles.imageContainer}>
            <img
              loading="lazy"
              src="/assets/book.jpg"
              className={styles.foodImage}
              alt="book cover"
            />
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.contentContainer}>
              <h4 className={styles.title}>Harry Potter and the Half-Blood Prince</h4>
              <div className={styles.button_Container}>
                <button
                  className={styles.more_details}
                  onClick={handleFlip}
                >
                  More Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back of the card */}
        <div className={styles.cardBack}>
          <h4 className={styles.title}>Details</h4>
          <p>Author: J.K. Rowling</p>
          <p>Genre: Fantasy</p>
          <p>Price: $20</p>
          <div className={styles.button_Container}>
            <button className={styles.readButton}>Already Read</button>
            <button className={styles.willingToReadButton}>Willing to Read</button>
            <button
              className={styles.more_details}
              onClick={handleFlip}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
