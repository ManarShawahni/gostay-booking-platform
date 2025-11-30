import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.brand}>
          <h2 className={styles.title}>GoStay</h2>
          <p className={styles.sub}>Go Anywhere. Stay Everywhere.</p>
        </div>

        <div className={styles.section}>
          <h3>About</h3>
          <p>Contact Us</p>
          <p>Our Story</p>
          <p>Careers</p>
        </div>

        <div className={styles.section}>
          <h3>Social</h3>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>LinkedIn</p>
        </div>

        <div className={styles.section}>
          <h3>Contact</h3>
          <p>+970 599 000 000</p>
          <p>info@gostay.com</p>
        </div>

      </div>

      <p className={styles.copy}>
        © {new Date().getFullYear()} GoStay — All rights reserved.
      </p>
    </footer>
  );
};
