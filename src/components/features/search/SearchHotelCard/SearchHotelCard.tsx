import { Card } from "../../../common/Card/Card";
import { StarRating } from "../../../common/StarRating/StarRating";
import { SearchHotelResult } from "../../../../types";
import styles from "./SearchHotelCard.module.css";
import { MapPinIcon } from "@heroicons/react/24/outline";

interface Props {
  hotel: SearchHotelResult;
}

export const SearchHotelCard = ({ hotel }: Props) => {
  return (
    <Card
      image={hotel.roomPhotoUrl}
      padding="md"
      hover
      className={styles.card}
    >
      <h3 className={styles.name}>{hotel.hotelName}</h3>

      <div className={styles.row}>
        <StarRating rating={hotel.starRating} size={18} />
        
        <div className={styles.locationWrapper}>
            <MapPinIcon className={styles.locationIcon} />
            <span className={styles.city}>{hotel.cityName}</span>
        </div>
      </div>

      <div className={styles.divider}></div>

      <p className={styles.price}>
        ${hotel.roomPrice} 
        <span>/ night</span>
      </p>
    </Card>
  );
};
