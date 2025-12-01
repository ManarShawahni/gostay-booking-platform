import { useCart } from "../../hooks/useCart";
import styles from "./CheckoutPage.module.css";

import {SectionHeader} from "../../components/common/SectionHeader/SectionHeader";
import { BookingSummary } from "../../components/features/checkout/BookingSummary/BookingSummary";

function CheckoutPage() {
  const { items } = useCart();

  return (
    <div className={styles.container}>
      <SectionHeader
        title="Checkout"
        subtitle="Review your booking and enter your information"
      />

      <div className={styles.section}>
        <h2 className={styles.label}>Items</h2>
        <BookingSummary items={items} />
      </div>

      <div className={styles.section}>
        <h2 className={styles.label}>Your Information</h2>

        <div className={styles.formPlaceholder}>
         
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <button className={styles.checkoutBtn}>Complete Checkout</button>
      </div>
    </div>
  );
}

export default CheckoutPage;
