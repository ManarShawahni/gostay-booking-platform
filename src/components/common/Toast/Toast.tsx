import styles from "./Toast.module.css";

export const Toast = ({ message }: { message: string }) => {
  return <div className={styles.toast}>{message}</div>;
};
