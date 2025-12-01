import styles from "./Reviews.module.css"
import {StarRating} from "../../../common/StarRating/StarRating"
import { HotelReview } from "../../../../types/hotel.types"

type Props = {
    reviews: HotelReview[]
}

export default function Reviews({ reviews }: Props) {
  return (
    <div className={styles.section}>
      <h2>Reviews</h2>
      {reviews.map((r) => (
        <div key={r.reviewId} className={styles.review}>
          <StarRating rating={r.rating} />
          <p>{r.customerName}</p>
          <p>{r.description}</p>
        </div>
      ))}
    </div>
  )
}
