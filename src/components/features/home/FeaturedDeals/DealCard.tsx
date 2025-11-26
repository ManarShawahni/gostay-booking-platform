import styles from "./FeaturedDeals.module.css";
import { MapPinIcon, StarIcon } from "@heroicons/react/24/solid";

interface DealCardProps {
  deal: {
    id: string;
    hotelName: string;
    city: string;
    imageUrl: string;
    originalPrice: number;
    discountedPrice: number;
    discount: number;
    starRating: number;
  };
}

export const DealCard = ({ deal }: DealCardProps) => {
  return (
    <div
      className={styles.card}
      onClick={() => console.log("Clicked hotel:", deal.id)}
    >
      <img
        src={deal.imageUrl}
        alt={deal.hotelName}
        className={styles.cardImage}
        loading="lazy"
      />

      <div className={styles.overlay}>
        <div className={styles.badge}>{deal.discount}% OFF</div>

        <div className={styles.cardContent}>
          <div className={styles.location}>
            <MapPinIcon className={styles.locationIcon} />
            {deal.city}
          </div>

          <div className={styles.hotel}>{deal.hotelName}</div>

          <div className={styles.stars}>
            {Array.from({ length: deal.starRating }).map((_, i) => (
              <StarIcon key={i} className={styles.starIcon} />
            ))}
          </div>

          <div className={styles.priceBox}>
            <span className={styles.oldPrice}>${deal.originalPrice}</span>
            <span className={styles.newPrice}>${deal.discountedPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
