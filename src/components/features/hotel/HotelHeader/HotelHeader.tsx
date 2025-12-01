import styles from "./HotelHeader.module.css"
import {StarRating} from "../../../common/StarRating/StarRating"
import { HotelDetails } from "../../../../types/hotel.types"

type Props = {
    hotel: HotelDetails
}

export default function HotelHeader({ hotel }: Props) {
  return (
    <div className={styles.header}>
      <h1>{hotel.hotelName}</h1>
      <StarRating rating={hotel.starRating} />
      <p className={styles.location}>{hotel.location}</p>
    </div>
  )
}
