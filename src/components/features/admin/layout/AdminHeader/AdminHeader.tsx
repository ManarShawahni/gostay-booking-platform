import styles from "./AdminHeader.module.css";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../../../../hooks/useAuth";

export const AdminHeader = () => {
  const { logout } = useAuth();

  return (
    <header className={styles.header}>
      <h3 className={styles.title}>Admin Panel</h3>

      <button className={styles.logoutBtn} onClick={logout}>
        <ArrowRightStartOnRectangleIcon />
        Logout
      </button>
    </header>
  );
};
