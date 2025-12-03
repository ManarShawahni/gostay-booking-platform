import styles from "./Button.module.css";
import { ReactNode } from "react";
import { clsx } from "clsx";

interface Props {
  children: ReactNode;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}

export const Button = ({ children, fullWidth, type = "button", onClick, className, disabled }: Props) => {
  return (
    <button
      type={type}
      className={clsx(styles.button, fullWidth && styles.fullWidth, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

