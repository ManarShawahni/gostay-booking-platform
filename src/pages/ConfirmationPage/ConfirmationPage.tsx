import styles from "./ConfirmationPage.module.css";
import { Button } from "../../components/common/Button/Button";
import { useNavigate } from "react-router-dom";

function ConfirmationPage() {
  const navigate = useNavigate();
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

      <Button 
        onClick={() => navigate("/")}
        className={styles.backBtn}
      >
        Back to Home
      </Button>
    </div>
  );
}

export default ConfirmationPage;
