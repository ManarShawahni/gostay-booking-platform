import styles from './TrendingDestinations.module.css';
import { DestinationCard } from './DestinationCard';
import { Skeleton } from "../../../common/Skeleton";

import { useTrendingDestinations } from "../../../../hooks/home/useTrendingDestinations";


export const TrendingDestinations = () => {
  const { data: destinations, loading } = useTrendingDestinations();

  const frameColors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8B94', '#C7CEEA'];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Trending Destinations</h2>
        <p className={styles.subtitle}>Discover the world's most popular spots</p>
      </div>

      <div className={styles.bentoGrid}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} width="100%" height="100%" className={styles.skeletonBox} />
            ))
          : destinations.map((d, index) => (
              <DestinationCard
                key={d.id}
                destination={d}
                frameColor={frameColors[index % frameColors.length]}
                gridClass={`card${(index % 6) + 1}`}
              />
            ))}
      </div>
    </section>
  );
};

export default TrendingDestinations;