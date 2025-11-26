import styles from './RecentlyVisited.module.css';
import { StarIcon, MapPinIcon, CalendarIcon, CurrencyDollarIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

interface ExpandableCardProps {
  hotel: {
    hotelId: string;
    hotelName: string;
    city: string;
    country: string;
    thumbnailUrl: string;
    starRating: number;
    visitDate: string;
    pricePerNight: number;
  };
  isExpanded: boolean;
  onToggle: () => void;
}

export const ExpandableCard = ({ hotel, isExpanded, onToggle }: ExpandableCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `/hotel/${hotel.hotelId}`;
  };

  return (
    <div
      className={`${styles.expandableCard} ${isExpanded ? styles.expanded : ''}`}
      onClick={onToggle}
    >
      {/* Header (Always Visible) */}
      <div className={styles.cardHeader}>
        <img
          src={hotel.thumbnailUrl}
          alt={hotel.hotelName}
          className={styles.thumbnail}
        />

        <div className={styles.headerInfo}>
          <h3 className={styles.hotelName}>{hotel.hotelName}</h3>
          <div className={styles.location}>
            <MapPinIcon className={styles.smallIcon} />
            <span>{hotel.city}, {hotel.country}</span>
          </div>
        </div>

        <div className={styles.headerRating}>
          {Array.from({ length: hotel.starRating }).map((_, i) => (
            <StarIcon key={i} className={styles.star} />
          ))}
        </div>

        <ChevronDownIcon
          className={`${styles.chevron} ${isExpanded ? styles.rotated : ''}`}
        />
      </div>

      {/* Details (Visible when expanded) */}
      <div className={styles.cardDetails}>
        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <CalendarIcon className={styles.detailIcon} />
            <div>
              <div className={styles.detailLabel}>Last Visit</div>
              <div className={styles.detailValue}>{formatDate(hotel.visitDate)}</div>
            </div>
          </div>

          <div className={styles.detailItem}>
            <CurrencyDollarIcon className={styles.detailIcon} />
            <div>
              <div className={styles.detailLabel}>Price Per Night</div>
              <div className={styles.detailValue}>${hotel.pricePerNight}</div>
            </div>
          </div>
        </div>

        <button className={styles.viewDetailsBtn} onClick={handleViewDetails}>
          View Details →
        </button>
      </div>
    </div>
  );
};