import { CartItem } from "../../../../context/CartContext";
import styles from "./BookingSummary.module.css";

interface Props {
  items: CartItem[];
}

export const BookingSummary = ({ items }: Props) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Booking Summary</h3>

      {items.map((item) => (
        <div key={item.hotelId} className={styles.item}>
          <img src={item.image} alt={item.hotelName} />

          <div className={styles.info}>
            <h4>{item.hotelName}</h4>
            <p className={styles.city}>{item.cityName}</p>
            <p className={styles.price}>${item.price}</p>
          </div>
        </div>
      ))}

      <div className={styles.total}>
        <span>Total:</span>
        <span className={styles.totalValue}>${total}</span>
      </div>
    </div>
  );
};
