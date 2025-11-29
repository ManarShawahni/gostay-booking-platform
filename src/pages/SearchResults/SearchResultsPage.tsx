import { useSearchParams } from "react-router-dom";
import { useSearchHotels } from "../../hooks/search/useSearchHotels";
import { Card } from "../../components/common/Card/Card";
import { Skeleton } from "../../components/common/Skeleton/Skeleton";
import { ErrorMessage } from "../../components/common/ErrorMessage/ErrorMessage";

import styles from "./SearchResultsPage.module.css";

export default function SearchResultsPage() {
  const [params] = useSearchParams();

  const query = {
    destination: params.get("destination") || "", 
    checkInDate: params.get("checkInDate") || "",
    checkOutDate: params.get("checkOutDate") || "",
    adults: Number(params.get("adults") || 1),
    children: Number(params.get("children") || 0),
    rooms: Number(params.get("rooms") || 1),
    starRate: Number(params.get("starRate") || 0),
    sort: params.get("sort") || "",
  };

  const { hotels, loading, error } = useSearchHotels(query);

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Search Results</h2>

      {loading && (
        <div className={styles.grid}>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height="260px" />
          ))}
        </div>
      )}

      {error && <ErrorMessage message={error} />}

      {!loading && hotels.length === 0 && (
        <p className={styles.noResults}>No hotels found.</p>
      )}

      {!loading && hotels.length > 0 && (
        <div className={styles.grid}>
          {hotels.map((hotel) => (
            <Card
              key={hotel.id}
              image={hotel.photoUrl || "/images/hotel-placeholder.jpg"}
              padding="md"
              hover
            >
              <h3 className={styles.hotelName}>{hotel.name}</h3>

              <p className={styles.starRating}>{hotel.starRating} Stars</p>

              <p className={styles.price}>
                {hotel.pricePerNight
                  ? `$${hotel.pricePerNight} / night`
                  : "Price not available"}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
