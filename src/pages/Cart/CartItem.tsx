import styles from "./CartItem.module.css";
import { CartItem as Item } from "../../context/Cart/CartContext";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  item: Item;
  onRemove: () => void;
}

export const CartItem = ({ item, onRemove }: Props) => {
  return (
    <div className={styles.card}>
      <img src={item.image} alt={item.hotelName} className={styles.image} />

      <div className={styles.info}>
        <h3 className={styles.name}>{item.hotelName}</h3>
        <p className={styles.city}>{item.cityName}</p>
        <p className={styles.price}>${item.price}</p>
      </div>

      <button className={styles.removeBtn} onClick={onRemove}>
        <XMarkIcon />
      </button>
    </div>
  );
};
