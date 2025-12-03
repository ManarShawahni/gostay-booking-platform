import { StarIcon } from "@heroicons/react/24/solid";
import styles from "./StarRating.module.css";

interface StarRatingProps {
  rating: number;
  size?: number;
}

export const StarRating = ({ rating, size = 18 }: StarRatingProps) => {
  return (
    <div className={styles.wrapper}>
      {Array.from({ length: rating }).map((_, i) => (
        <StarIcon
          key={i}
          className={styles.star}
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
};
