import styles from "./RoomsSection.module.css"
import { useCart } from "../../../../hooks/useCart"
import { Room } from "../../../../types/hotel.types"
import { Button } from "../../../common/Button/Button"

type Props = {
  rooms: Room[]
  hotelName: string
  cityName: string
  checkInDate: string
  checkOutDate: string
}

export default function RoomsSection({
  rooms,
  hotelName,
  cityName,
  checkInDate,
  checkOutDate
}: Props) {
  const { addToCart } = useCart()

  return (
    <div className={styles.section}>
      <h2>Available Rooms</h2>

      {rooms.map((room) => (
        <div key={room.roomId} className={styles.card}>
          <img src={room.roomPhotoUrl} className={styles.img} />
          <div className={styles.info}>
            <h3>{room.roomType}</h3>
            <p>Adults: {room.capacityOfAdults}</p>
            <p>Children: {room.capacityOfChildren}</p>
            <p>${room.price}</p>
          </div>

          <Button onClick={() => addToCart({
            hotelId: room.roomId,
            hotelName,
            cityName,
            image: room.roomPhotoUrl,
            price: room.price,
            checkInDate,
            checkOutDate,
          })}>
            Add to Cart
          </Button>
        </div>
      ))}
    </div>
  )
}
