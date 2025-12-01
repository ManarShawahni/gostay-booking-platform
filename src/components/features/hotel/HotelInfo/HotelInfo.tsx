import styles from "./HotelInfo.module.css"
import { HotelDetails } from "../../../../types/hotel.types"

type Props = {
  hotel: HotelDetails
}

export default function HotelInfo({ hotel }: Props) {
  return (
    <div className={styles.box}>
      <h2>Hotel Information</h2>
      <p>{hotel.description}</p>
      <div className={styles.mapContainer}>
        <iframe
          width="100%"
          height="250"
          loading="lazy"
          src={`https://maps.google.com/maps?q=${hotel.latitude},${hotel.longitude}&z=15&output=embed`}
        />
      </div>
    </div>
  )
}
