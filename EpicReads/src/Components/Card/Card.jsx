import styles from './Card.module.css'

function Card(){
    return (
        <div className={styles.card}>
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
              <h4 className={styles.title}>Harry Potter and the half blood prince</h4>
              <div className={styles.timeContainer}>
                <img
                  loading="lazy"
                  src="clock.svg"
                  className={styles.timeIcon}
                  alt=""
                />
                <span className={styles.timeText}>10 Mins</span>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Card