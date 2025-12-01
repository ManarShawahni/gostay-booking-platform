import styles from "./RoomsSection.module.css"
import { useCart } from "../../../../hooks/useCart"
import { Room } from "../../../../types/hotel.types"
import { SearchHotelResult } from "../../../../types/search.types"

type Props = {
  rooms: Room[]
  hotelName: string
  cityName: string
  starRating: number
  latitude: number
  longitude: number
  checkInDate: string
  checkOutDate: string
}

export default function RoomsSection({
  rooms,
  hotelName,
  cityName,
  starRating,
  latitude,
  longitude,
  checkInDate,
  checkOutDate
}: Props) {
  const { addToCart } = useCart()

  return (
    <div className={styles.section}>
      <h2>Available Rooms</h2>

      {rooms.map((room) => {
        const hotelItem: SearchHotelResult = {
          hotelId: room.roomId,
          hotelName,
          starRating,
          latitude,
          longitude,

          roomType: room.roomType,
          roomPhotoUrl: room.roomPhotoUrl,
          roomPrice: room.price,

          cityName,

          discount: 0,
          amenities: room.roomAmenities.map((a) => ({
            id: a.id,
            name: a.name,
            description: a.description
          })),

          numberOfAdults: room.capacityOfAdults,
          numberOfChildren: room.capacityOfChildren,
          numberOfRooms: 1,

          checkInDate,
          checkOutDate
        }

        return (
          <div key={room.roomId} className={styles.card}>
            <img src={room.roomPhotoUrl} className={styles.img} />
            <div className={styles.info}>
              <h3>{room.roomType}</h3>
              <p>Adults: {room.capacityOfAdults}</p>
              <p>Children: {room.capacityOfChildren}</p>
              <p>${room.price}</p>
            </div>

            <button
              className={styles.btn}
              onClick={() => addToCart(hotelItem)}
            >
              Add to Cart
            </button>
          </div>
        )
      })}
    </div>
  )
}
