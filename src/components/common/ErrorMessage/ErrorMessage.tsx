import React from "react";
import clsx from "clsx";
import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
  variant?: "error" | "warning" | "info" | "success";
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  variant = "error",
  className,
}) => {
  if (!message) return null;

  return (
    <div className={clsx(styles.errorBox, styles[variant], className)}>
      {message}
    </div>
  );
};
