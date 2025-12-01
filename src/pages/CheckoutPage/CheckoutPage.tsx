import { useCart } from "../../hooks/useCart";
import styles from "./CheckoutPage.module.css";
import { useNavigate } from "react-router-dom";

import {SectionHeader} from "../../components/common/SectionHeader/SectionHeader";
import { BookingSummary } from "../../components/features/checkout/BookingSummary/BookingSummary";
import { BookingForm } from "../../components/features/checkout/BookingForm/BookingForm";

function CheckoutPage() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.setItem("bookingSuccess", "true");
    clearCart();
    navigate("/confirmation");
  };

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
          onSubmit={handleSubmit}
          hotelId={1}
          roomId={1}
          checkInDate="2025-01-01"
          checkOutDate="2025-01-05"
        />
      </div>
    </div>
  );
}

export default CheckoutPage;
