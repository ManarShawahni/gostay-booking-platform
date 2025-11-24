import styles from "./Button.module.css";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}

export const Button = ({ children, fullWidth, type = "button", onClick }: Props) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${fullWidth ? styles.fullWidth : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

