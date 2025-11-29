import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchHotels } from "../../hooks/search/useSearchHotels";
import { Skeleton } from "../../components/common/Skeleton/Skeleton";
import { ErrorMessage } from "../../components/common/ErrorMessage/ErrorMessage";

import { SearchHotelCard } from "../../components/features/search/SearchHotelCard";
import { FiltersSidebar } from "../../components/features/search/FiltersSidebar";
import { SearchResultsLayout } from "../../components/features/search/SearchResultsLayout";
import styles from "./SearchResultsPage.module.css";


export default function SearchResultsPage() {
  const [params] = useSearchParams();

  const [filters, setFilters] = useState({
    starRate: 0,
    minPrice: 0,
    maxPrice: 1000,
  });


  const query = {
    destination: params.get("destination") || "", 
    checkInDate: params.get("checkInDate") || "",
    checkOutDate: params.get("checkOutDate") || "",
    adults: Number(params.get("adults") || 1),
    children: Number(params.get("children") || 0),
    rooms: Number(params.get("rooms") || 1),
  };

  const { hotels, loading, error } = useSearchHotels(query);

  const filtered  = hotels.filter((hotel) => {
    const price = hotel.roomPrice || 0;
    const star = hotel.starRating || 0;

    const matchesPrice =
      price >= filters.minPrice && price <= filters.maxPrice;

    const matchesStar =
      filters.starRate === 0 || star >= filters.starRate;

    return matchesPrice && matchesStar;
  });

  return (
      <SearchResultsLayout
        sidebar={<FiltersSidebar onChange={(f) => setFilters(f)} />}
      >
      <div className={styles.header}>
        <h2 className={styles.title}>Search Results</h2>
        {!loading && (
          <p className={styles.subtitle}>
            Found <span className={styles.count}>{filtered.length}</span> hotels
          </p>
        )}
      </div>

      {error && <ErrorMessage message={error} />}

      {loading && (
        <div className={styles.grid}>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height="280px" />
          ))}
        </div>
      )}

      {!loading && !error &&  filtered.length === 0 && (
        <div className={styles.empty}>
          <p className={styles.noResults}>No hotels match your filters.</p>
          <p className={styles.noResultsHint}>
            Try adjusting your search criteria
          </p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className={styles.grid}>
          {filtered.map((hotel) => (
            <SearchHotelCard key={hotel.hotelId} hotel={hotel} />
          ))}
        </div>
      )}
    </SearchResultsLayout>
  );
}
