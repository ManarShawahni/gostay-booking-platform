import { useEffect, useRef, useState } from "react";
import styles from "./FeaturedDeals.module.css";
import { DealCard } from "./DealCard";
import { Skeleton } from "../../../common/Skeleton";
import { homeService } from "../../../../services/home.service";
import { FeaturedDealApp } from "../../../../types";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";


export const FeaturedDeals = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [deals, setDeals] = useState<FeaturedDealApp[]>([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const data = await homeService.getFeaturedDeals();
        setDeals(data);
      } catch (error) {
        console.error("Error fetching featured deals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
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
