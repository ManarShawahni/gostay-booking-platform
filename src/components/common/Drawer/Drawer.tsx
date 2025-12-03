import styles from "./Drawer.module.css";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  open: boolean;
  title?: string;
  width?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const Drawer = ({ open, title, width = "420px", onClose, children }: Props) => {
  return (
    <>
      <div className={`${styles.overlay} ${open ? styles.show : ""}`} onClick={onClose} />

      <div
        className={`${styles.drawer} ${open ? styles.open : ""}`}
        style={{ width }}
      >
        <div className={styles.header}>
          <h3>{title}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <XMarkIcon />
          </button>
        </div>

        <div className={styles.body}>{children}</div>
      </div>
    </>
  );
};
