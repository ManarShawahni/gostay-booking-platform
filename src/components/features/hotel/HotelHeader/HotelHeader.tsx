import styles from "./HotelHeader.module.css"
import {StarRating} from "../../../common/StarRating/StarRating"
import { HotelDetails } from "../../../../types/hotel.types"
import { MapPinIcon } from "@heroicons/react/24/outline"

type Props = {
    hotel: HotelDetails
}

export default function HotelHeader({ hotel }: Props) {
  return (
    <div className={styles.header}>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>{hotel.hotelName}</h1>
        <StarRating rating={hotel.starRating} />
      </div>
      <div className={styles.locationRow}>
        <MapPinIcon className={styles.locationIcon} />
        <p className={styles.location}>{hotel.location}</p>
      </div>
      {hotel.hotelType && (
        <div className={styles.tags}>
          <span className={styles.tag}>{hotel.hotelType}</span>
        </div>
      )}
    </div>
  )
}
