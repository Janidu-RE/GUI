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
              <div className={styles.button_Container}>
                <button className={styles.more_details}>More Details</button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Card