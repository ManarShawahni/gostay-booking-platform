import styles from './TrendingDestinations.module.css';
import { MapPinIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

interface DestinationCardProps {
  destination: {
    id: string;
    cityName: string;
    country: string;
    description: string;
    imageUrl: string;
    hotelsCount: number;
  };
  frameColor: string;
  gridClass: string;
}

export const DestinationCard = ({ destination, frameColor, gridClass }: DestinationCardProps) => {
  const handleClick = () => {
    window.location.href = `/search?destination=${destination.cityName}`;
  };

  return (
    <div
      className={`${styles.destinationCard} ${styles[gridClass]}`}
      style={{ borderColor: frameColor }}
      onClick={handleClick}
    >
      <img
        src={destination.imageUrl}
        alt={destination.cityName}
        className={styles.cardImage}
        loading="lazy"
      />

      <div className={styles.cardOverlay}>
        <div className={styles.cardContent}>
          <div className={styles.cityInfo}>
            <h3 className={styles.cityName}>{destination.cityName}</h3>
            <p className={styles.country}>
              <MapPinIcon className={styles.icon} />
              {destination.country}
            </p>
          </div>

          <div className={styles.stats}>
            <BuildingOfficeIcon className={styles.icon} />
            <span>{destination.hotelsCount} hotels</span>
          </div>
        </div>
      </div>

      <div
        className={styles.colorDot}
        style={{ backgroundColor: frameColor }}
      />
    </div>
  );
};