import React from "react";
import styles from "./HomePage.module.css";

import { SearchWidget } from "../../components/common/SearchWidget";
import  FeaturedDeals from "../../components/features/home/FeaturedDeals";
import { RecentlyVisited } from "../../components/features/home/RecentlyVisited";
import { TrendingDestinations } from "../../components/features/home/TrendingDestinations";

export const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Go Anywhere. Stay Everywhere.</h1>
          <p>Find the best deals across thousands of destinations.</p>
        </div>
      </section>

      {/* Search Widget */}
      <section className={styles.searchSection}>
        <SearchWidget />
      </section>

      {/* Featured Deals */}
      <section id="deals-section" className={styles.section}>
        <FeaturedDeals />
      </section>

      {/* Recently Visited */}
      <section className={styles.section}>
        <RecentlyVisited />
      </section>

      {/* Trending Destinations */}
      <section id="dest-section" className={styles.section}>
        <TrendingDestinations />
      </section>

    </div>
  );
};
