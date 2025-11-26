import { useEffect, useRef, useState } from "react";
import styles from "./FeaturedDeals.module.css";
import { DealCard } from "./DealCard";
import { Skeleton } from "../../../common/Skeleton";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export const FeaturedDeals = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);

  const deals = [
    {
      id: "1",
      hotelName: "Paradise Resort",
      city: "Maldives",
      imageUrl:
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
      originalPrice: 1500,
      discountedPrice: 1050,
      discount: 30,
      starRating: 5,
    },
    {
      id: "2",
      hotelName: "Beachfront Villa",
      city: "Bali",
      imageUrl:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
      originalPrice: 1000,
      discountedPrice: 800,
      discount: 20,
      starRating: 4,
    },
    {
      id: "3",
      hotelName: "Ocean View Hotel",
      city: "Hawaii",
      imageUrl:
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      originalPrice: 1800,
      discountedPrice: 1530,
      discount: 15,
      starRating: 5,
    },
    {
      id: "4",
      hotelName: "Sunset Resort",
      city: "Santorini",
      imageUrl:
        "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800",
      originalPrice: 1200,
      discountedPrice: 960,
      discount: 20,
      starRating: 4,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;


    scrollRef.current.scrollBy({
      left: direction === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Featured Deals</h2>
          <p className={styles.subtitle}>Exclusive offers picked for you</p>
        </div>

        <div className={styles.controls}>
          <button
            className={styles.navBtn}
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeftIcon className={styles.navIcon} />
          </button>

          <button
            className={styles.navBtn}
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRightIcon className={styles.navIcon} />
          </button>
        </div>
      </div>

       <div className={styles.scrollArea} ref={scrollRef}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                width="320px"
                height="420px"
                className={styles.skeletonCard}
              />
            ))
          : deals.map((deal) => <DealCard key={deal.id} deal={deal} />)}
      </div>
    </section>
  );
};

export default FeaturedDeals;
