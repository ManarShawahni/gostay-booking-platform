import { useEffect, useState } from "react";
import { citiesService } from "../../../services/admin/cities.service";
import { hotelsService } from "../../../services/admin/hotels.service";
import { City, Hotel } from "../../../types/admin.types";
import styles from "./AdminDashboard.module.css";

export const AdminDashboard = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    citiesService.getAll().then(setCities);
    hotelsService.getAll().then(setHotels);

    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);


  const starRatings = [5, 4, 3, 2, 1];
  const hotelsByRating = starRatings.map((star) => ({
    label: `${star} Star`,
    count: hotels.filter((h) => h.starRating === star).length,
  }));
  const maxRating = Math.max(...hotelsByRating.map((r) => r.count), 1);

  const types = [...new Set(hotels.map((h) => h.hotelType).filter(Boolean))];
  const hotelsByType = types.map((type) => ({
    label: type,
    count: hotels.filter((h) => h.hotelType === type).length,
  }));
  const maxType = Math.max(...hotelsByType.map((t) => t.count), 1);

  const avgRating =
    hotels.length > 0
      ? (hotels.reduce((sum, h) => sum + (h.starRating || 0), 0) / hotels.length).toFixed(1)
      : 0;

  const fiveStarCount = hotels.filter((h) => h.starRating === 5).length;

  const typeColors = ["var(--chart-blue)", "var(--chart-green)", "var(--chart-orange)", "var(--chart-violet)", "var(--chart-red)"];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Welcome back, Admin</p>
        </div>
        <div className={styles.dateCard}>
          <span className={styles.time}>{time.toLocaleTimeString()}</span>
          <span className={styles.date}>{time.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className={styles.cards}>
        <div className={`${styles.card} ${styles.cardPurple}`}>
          <span className={styles.cardLabel}>Total Cities</span>
          <span className={styles.cardValue}>{cities.length}</span>
        </div>
        <div className={`${styles.card} ${styles.cardCoral}`}>
          <span className={styles.cardLabel}>Total Hotels</span>
          <span className={styles.cardValue}>{hotels.length}</span>
        </div>
        <div className={`${styles.card} ${styles.cardMint}`}>
          <span className={styles.cardLabel}>Avg Rating</span>
          <span className={styles.cardValue}>{avgRating}⭐</span>
        </div>
        <div className={`${styles.card} ${styles.cardAmber}`}>
          <span className={styles.cardLabel}>5-Star Hotels</span>
          <span className={styles.cardValue}>{fiveStarCount}</span>
        </div>
      </div>

      {/* Charts Row */}
      <div className={styles.charts}>
        <div className={styles.chart}>
          <h2 className={styles.chartTitle}>Hotels by Star Rating</h2>
          {hotelsByRating.map((item) => (
            <div key={item.label} className={styles.bar}>
              <span className={styles.barLabel}>{item.label}</span>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ width: `${(item.count / maxRating) * 100}%` }}
                />
              </div>
              <span className={styles.barValue}>{item.count}</span>
            </div>
          ))}
        </div>

        <div className={styles.chart}>
          <h2 className={styles.chartTitle}>Hotels by Type</h2>
          {hotelsByType.map((item, i) => (
            <div key={item.label} className={styles.bar}>
              <span className={styles.barLabel}>{item.label}</span>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ 
                    width: `${(item.count / maxType) * 100}%`,
                    background: typeColors[i % typeColors.length]
                  }}
                />
              </div>
              <span className={styles.barValue}>{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className={styles.bottomRow}>
        {/* Donut Chart */}
        <div className={styles.chart}>
          <h2 className={styles.chartTitle}>Type Distribution</h2>
          <div className={styles.donutContainer}>
            <div className={styles.donut}>
              {hotelsByType.map((item, i) => {
                const total = hotelsByType.reduce((sum, t) => sum + t.count, 0);
                const percent = total > 0 ? Math.round((item.count / total) * 100) : 0;
                return (
                  <div key={item.label} className={styles.donutItem}>
                    <span className={styles.donutColor} style={{ background: typeColors[i % typeColors.length] }} />
                    <span className={styles.donutLabel}>{item.label}</span>
                    <span className={styles.donutPercent}>{percent}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Hotels */}
        <div className={styles.chart}>
          <h2 className={styles.chartTitle}>Top Rated Hotels</h2>
          <div className={styles.topList}>
            {hotels
              .filter((h) => h.starRating === 5)
              .slice(0, 5)
              .map((hotel, i) => (
                <div key={hotel.id} className={styles.topItem}>
                  <span className={styles.topRank}>{i + 1}</span>
                  <span className={styles.topName}>{hotel.hotelName}</span>
                  <span className={styles.topStars}>⭐⭐⭐⭐⭐</span>
                </div>
              ))}
            {fiveStarCount === 0 && <p className={styles.empty}>No 5-star hotels</p>}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.chart}>
          <h2 className={styles.chartTitle}>Quick Stats</h2>
          <div className={styles.quickStats}>
            <div className={styles.quickStat}>
              <span className={styles.quickValue}>{types.length}</span>
              <span className={styles.quickLabel}>Hotel Types</span>
            </div>
            <div className={styles.quickStat}>
              <span className={styles.quickValue}>{hotels.filter(h => h.starRating >= 4).length}</span>
              <span className={styles.quickLabel}>Premium (4★+)</span>
            </div>
            <div className={styles.quickStat}>
              <span className={styles.quickValue}>{hotels.filter(h => h.starRating <= 3).length}</span>
              <span className={styles.quickLabel}>Standard (3★-)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
