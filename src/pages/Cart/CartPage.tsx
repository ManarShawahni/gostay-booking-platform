import { useCart } from "../../hooks/useCart";
import { CartItem } from "./CartItem";
import styles from "./CartPage.module.css";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCart();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Cart</h1>

      {items.length === 0 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : (
        <>
          <div className={styles.list}>
            {items.map((item) => (
              <CartItem
                key={item.hotelId}
                item={item}
                onRemove={() => removeFromCart(item.hotelId)}
              />
            ))}
          </div>

          <div className={styles.summary}>
            <p className={styles.total}>
              Total: <span>${total}</span>
            </p>

            <div className={styles.actions}>
              <button className={styles.clearBtn} onClick={clearCart}>
                Clear Cart
              </button>

              <Link to="/checkout" className={styles.checkoutBtn}>
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
