import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearchHotels } from "../../hooks/search/useSearchHotels";
import { Skeleton } from "../../components/common/Skeleton/Skeleton";
import { ErrorMessage } from "../../components/common/ErrorMessage/ErrorMessage";

import { SearchWidget } from "../../components/common/SearchWidget/SearchWidget";
import { SearchHotelCard } from "../../components/features/search/SearchHotelCard";
import { FiltersSidebar } from "../../components/features/search/FiltersSidebar";
import { SearchResultsLayout } from "../../components/features/search/SearchResultsLayout";
import styles from "./SearchResultsPage.module.css";
import { SearchQueryParams } from "../../types";


export default function SearchResultsPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [filters, setFilters] = useState({
    starRate: 0,
    minPrice: 0,
    maxPrice: 1000,
    amenities: [] as string[],
  });


  const query = {
    destination: params.get("destination") || "", 
    checkInDate: params.get("checkInDate") || "",
    checkOutDate: params.get("checkOutDate") || "",
    adults: Number(params.get("adults") || 1),
    children: Number(params.get("children") || 0),
    rooms: Number(params.get("rooms") || 1),
  };

    const handleWidgetSearch = (values: SearchQueryParams) => {
    const q = new URLSearchParams({
      destination: values.destination || "",
      checkInDate: values.checkInDate,
      checkOutDate: values.checkOutDate,
      adults: values.adults.toString(),
      children: values.children.toString(),
      rooms: values.rooms.toString(),
    });

    navigate(`/search?${q.toString()}`);
  };

  const { hotels, loading, error } = useSearchHotels(query);

  const filtered  = hotels.filter((hotel) => {

    const matchesPrice =
      hotel.roomPrice >= filters.minPrice && hotel.roomPrice <= filters.maxPrice;


    const matchesStar =
      filters.starRate === 0 || hotel.starRating >= filters.starRate;

    const matchesAmenities =
      filters.amenities.length === 0 ||
      filters.amenities.every((am) =>
        hotel.amenities?.map((x) => x.name).includes(am)
      );

    return matchesPrice && matchesStar && matchesAmenities;
  });

  return (
      <SearchResultsLayout
        sidebar={<FiltersSidebar onChange={setFilters} />}
      >

      <div className={styles.searchWidgetWrapper}>
        <SearchWidget
          initialValues={{
            destination: query.destination,
            checkInDate: query.checkInDate,
            checkOutDate: query.checkOutDate,
            adults: query.adults,
            children: query.children,
            rooms: query.rooms,
          }}
          onSearch={handleWidgetSearch}
        />
      </div>
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
