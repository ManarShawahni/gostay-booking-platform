import { Card } from "../../../common/Card/Card";
import { StarRating } from "../../../common/StarRating/StarRating";
import { SearchHotelResult } from "../../../../types";
import styles from "./SearchHotelCard.module.css";
import { MapPinIcon, ShoppingCartIcon, CheckIcon } from "@heroicons/react/24/outline";
import {useCart} from "../../../../hooks/useCart";
import { useNavigate } from "react-router-dom";


interface Props {
  hotel: SearchHotelResult;
}

export const SearchHotelCard = ({ hotel }: Props) => {
  const navigate = useNavigate();

  const { addToCart, isInCart } = useCart();

  const added = isInCart(hotel.hotelId);

  return (
    <Card
      image={hotel.roomPhotoUrl}
      padding="md"
      hover
      className={styles.card}
      onClick={() => navigate(`/hotel/${hotel.hotelId}`)}

    >

      <button
        className={`${styles.cartBtn} ${added ? styles.added : ""}`}
        disabled={added}
        onClick={(e) => {
          e.stopPropagation()
          addToCart({
            hotelId: hotel.hotelId,
            hotelName: hotel.hotelName,
            cityName: hotel.cityName,
            image: hotel.roomPhotoUrl,
            price: hotel.roomPrice,
          })
        }}
      >
        {added ? (
          <CheckIcon className={styles.checkIcon} />
        ) : (
          <ShoppingCartIcon className={styles.cartIcon} />
        )}
      </button>

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
