import { useCart } from "../../hooks/useCart";
import styles from "./CheckoutPage.module.css";

import {SectionHeader} from "../../components/common/SectionHeader/SectionHeader";
import { BookingSummary } from "../../components/features/checkout/BookingSummary/BookingSummary";
import { BookingForm } from "../../components/features/checkout/BookingForm/BookingForm";

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

        <BookingForm
          onSubmit={() => {}}
          hotelId={items[0]?.hotelId ?? 0}
          roomId={999} 
          checkInDate="2025-01-01"
          checkOutDate="2025-01-02"
        />

      </div>

      <div className={styles.buttonWrapper}>
        <button className={styles.checkoutBtn}>Complete Checkout</button>
      </div>
    </div>
  );
}

export default CheckoutPage;
