import { useState, useEffect } from "react";

import styles from './TrendingDestinations.module.css';
import { DestinationCard } from './DestinationCard';

import { Skeleton } from "../../../common/Skeleton";

interface Destination {
  id: string;
  cityName: string;
  country: string;
  description: string;
  imageUrl: string;
  hotelsCount: number;
}

export const TrendingDestinations = () => {
  const [loading, setLoading] = useState(true);

  const destinations: Destination[] = [
    {
      id: '1',
      cityName: 'Paris',
      country: 'France',
      description: 'City of Light',
      imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
      hotelsCount: 234,
    },
    {
      id: '2',
      cityName: 'Tokyo',
      country: 'Japan',
      description: 'Modern meets Traditional',
      imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
      hotelsCount: 189,
    },
    {
      id: '3',
      cityName: 'Dubai',
      country: 'UAE',
      description: 'Luxury & Innovation',
      imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
      hotelsCount: 312,
    },
    {
      id: '4',
      cityName: 'New York',
      country: 'USA',
      description: 'The Big Apple',
      imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
      hotelsCount: 456,
    },
    {
      id: '5',
      cityName: 'Bali',
      country: 'Indonesia',
      description: 'Island Paradise',
      imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
      hotelsCount: 178,
    },
    {
      id: '6',
      cityName: 'Rome',
      country: 'Italy',
      description: 'Eternal City',
      imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
      hotelsCount: 267,
    },
  ];

  const frameColors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8B94', '#C7CEEA'];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

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