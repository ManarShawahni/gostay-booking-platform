import React from "react";
import styles from "./SearchField.module.css";

interface SearchFieldProps {
  label: string;
  children: React.ReactNode;
}

export const SearchField: React.FC<SearchFieldProps> = ({ label, children }) => {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
    </div>
  );
};
