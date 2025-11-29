import { useState } from 'react';
import styles from './RecentlyVisited.module.css';
import { ExpandableCard } from './ExpandableCard';
import { useAuth } from '../../../../hooks/useAuth';
import { Skeleton } from "../../../common/Skeleton";

import { useRecentlyVisited } from '../../../../hooks/home/useRecentlyVisited';


export const RecentlyVisited = () => {
  const { user } = useAuth();
  const { data: recentHotels, loading } = useRecentlyVisited();
  const [expandedId, setExpandedId] = useState<string | null>(null);


  if (!user) return null;

  if (!loading && recentHotels.length === 0) {
     return null; 
 }
  
  const toggleCard = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

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