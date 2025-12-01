import styles from "./BookingWidget.module.css"
import { useNavigate } from "react-router-dom"

import { HotelDetails } from "../../../../types/hotel.types"

type Props = {
  hotel: HotelDetails
}

export default function BookingWidget({ hotel }: Props) {
  const navigate = useNavigate()

  return (
    <div className={styles.box}>
      <h3>${hotel.availableRooms > 0 ? hotel.rooms[0].price : 0} / night</h3>
      <button
        onClick={() => navigate("/checkout")}
        className={styles.btn}
      >
        Book Now
      </button>
    </div>
  )
}
