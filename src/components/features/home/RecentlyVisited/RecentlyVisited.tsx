import { useEffect, useState } from 'react';
import styles from './RecentlyVisited.module.css';
import { ExpandableCard } from './ExpandableCard';
import { useAuth } from '../../../../hooks/useAuth';
import { Skeleton } from "../../../common/Skeleton";


interface VisitedHotel {
  hotelId: string;
  hotelName: string;
  city: string;
  country: string;
  thumbnailUrl: string;
  starRating: number;
  visitDate: string;
  pricePerNight: number;
}

export const RecentlyVisited = () => {
  const { user } = useAuth();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!user) return null;

  const recentHotels: VisitedHotel[] = [
        {
          hotelId: '1',
          hotelName: 'Grand Luxury Hotel',
          city: 'Paris',
          country: 'France',
          thumbnailUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
          starRating: 5,
          visitDate: '2024-12-15',
          pricePerNight: 250,
        },
        {
          hotelId: '2',
          hotelName: 'Beachfront Paradise Resort',
          city: 'Bali',
          country: 'Indonesia',
          thumbnailUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
          starRating: 4,
          visitDate: '2024-12-10',
          pricePerNight: 180,
        },
        {
          hotelId: '3',
          hotelName: 'City Center Business Hotel',
          city: 'Tokyo',
          country: 'Japan',
          thumbnailUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400',
          starRating: 4,
          visitDate: '2024-12-01',
          pricePerNight: 200,
        },
      ];

  const toggleCard = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (!user || recentHotels.length === 0) {
    return null; 
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recently Visited</h2>
        <p className={styles.subtitle}>Your travel history</p>
      </div>

      <div className={styles.cardList}>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                width="100%"
                height="100px"
                className={styles.skeletonItem}
              />
            ))
          : recentHotels.map((hotel) => (
              <ExpandableCard
                key={hotel.hotelId}
                hotel={hotel}
                isExpanded={expandedId === hotel.hotelId}
                onToggle={() => toggleCard(hotel.hotelId)}
              />
            ))}
      </div>
    </section>
  );
};

export default RecentlyVisited;