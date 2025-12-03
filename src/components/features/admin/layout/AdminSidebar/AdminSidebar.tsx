import { NavLink } from "react-router-dom";
import styles from "./AdminSidebar.module.css";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export const AdminSidebar = ({ isOpen, onToggle }: Props) => {
  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.show : ""}`} onClick={onToggle} />
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <h2 className={styles.logo}>Admin</h2>
          <button className={styles.toggleBtn} onClick={onToggle} aria-label={isOpen ? "Close sidebar" : "Open sidebar"}>
            {isOpen ? <XMarkIcon /> : <Bars3Icon />}
          </button>
        </div>

        <nav className={styles.nav}>
          <NavLink to="/admin" end className={({ isActive }) => isActive ? styles.active : ""}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/cities" className={({ isActive }) => isActive ? styles.active : ""}>
            Cities
          </NavLink>

          <NavLink to="/admin/hotels" className={({ isActive }) => isActive ? styles.active : ""}>
            Hotels
          </NavLink>

          <NavLink to="/admin/rooms" className={({ isActive }) => isActive ? styles.active : ""}>
            Rooms
          </NavLink>
        </nav>
      </aside>
    </>
  );
};
