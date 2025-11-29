import styles from "./AmenityTag.module.css";

interface Props {
  label: string;
  selected?: boolean;
  onToggle: () => void;
}

export const AmenityTag = ({ label, selected, onToggle }: Props) => {
  return (
    <button
      className={`${styles.tag} ${selected ? styles.active : ""}`}
      onClick={onToggle}
    >
      {label}
    </button>
  );
};
