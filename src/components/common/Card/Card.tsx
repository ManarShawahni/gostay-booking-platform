import React, { forwardRef, ElementType } from "react";
import clsx from "clsx";
import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
  image?: string;
  alt?: string;
  onClick?: () => void;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  as?: ElementType;
}

export const Card = forwardRef<HTMLElement, CardProps>(
  (
    {
      children,
      image,
      alt = "",
      onClick,
      hover = true,
      padding = "md",
      className,
      as: Component = "div",
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        onClick={onClick}
        className={clsx(
          styles.card,
          hover && styles.hover,
          styles[`pad-${padding}`],
          onClick && styles.clickable,
          className
        )}
      >
        {image && (
          <div className={styles.imageWrapper}>
            <img src={image} alt={alt} className={styles.image} />
          </div>
        )}

        <div className={styles.content}>{children}</div>
      </Component>
    );
  }
);

Card.displayName = "Card";
