import styles from "./Amenities.module.css"
import HotelAmenityTag from "../HotelAmenityTag/HotelAmenityTag"
import { RoomAmenity } from "../../../../types/hotel.types"

type Props = {
  list: RoomAmenity[]
}

export default function Amenities({ list }: Props) {
  return (
    <div className={styles.section}>
      <h2>Amenities</h2>
      <div className={styles.grid}>
        {list.map((a) => (
          <HotelAmenityTag key={a.id} name={a.name} />
        ))}
      </div>
    </div>
  )
}
