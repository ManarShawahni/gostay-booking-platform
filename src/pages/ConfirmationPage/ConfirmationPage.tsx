import styles from "./ConfirmationPage.module.css";

function ConfirmationPage() {
  const success = localStorage.getItem("bookingSuccess");

  if (!success) {
    return <p className={styles.notFound}>No booking found.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Thank you!</h1>
      <p className={styles.message}>
        Your booking has been successfully completed.
      </p>

      <button 
        className={styles.backBtn}
        onClick={() => window.location.href = "/"}
      >
        Back to Home
      </button>
    </div>
  );
}

export default ConfirmationPage;
