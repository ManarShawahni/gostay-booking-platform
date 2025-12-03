import { useParams, useSearchParams } from "react-router-dom"
import { useHotelDetails } from "../../hooks/hotel/useHotelDetails"
import { useHotelGallery } from "../../hooks/hotel/useHotelGallery"
import { useHotelReviews } from "../../hooks/hotel/useHotelReviews"
import { useAvailableRooms } from "../../hooks/hotel/useAvailableRooms"
import styles from "./HotelDetailPage.module.css"

import HotelHeader from "../../components/features/hotel/HotelHeader/HotelHeader"
import ImageGallery from "../../components/features/hotel/ImageGallery/ImageGallery"
import HotelInfo from "../../components/features/hotel/HotelInfo/HotelInfo"
import Amenities from "../../components/features/hotel/Amenities/Amenities"
import Reviews from "../../components/features/hotel/Reviews/Reviews"
import RoomsSection from "../../components/features/hotel/RoomsSection/RoomsSection"
import BookingWidget from "../../components/features/hotel/BookingWidget/BookingWidget"

export default function HotelDetailPage() {
  const { id } = useParams()
  const hotelId = Number(id)

  const [searchParams] = useSearchParams()

  const checkInDate = searchParams.get("checkInDate") || ""
  const checkOutDate = searchParams.get("checkOutDate") || ""

  const { data: hotel } = useHotelDetails(hotelId)
  const { data: gallery } = useHotelGallery(hotelId)
  const { data: reviews } = useHotelReviews(hotelId)
  const { data: rooms } = useAvailableRooms(hotelId)

  if (!hotel) return null

  return (
    <div className={styles.container}>
      <HotelHeader hotel={hotel} />
      <ImageGallery images={gallery || []} />

      <div className={styles.main}>
        <div className={styles.left}>
          <HotelInfo hotel={hotel} />
          <Amenities list={hotel.amenities} />
          <Reviews reviews={reviews || []} />

          <RoomsSection
            rooms={rooms || []}
            hotelName={hotel.hotelName}
            cityName={hotel.location}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
          />
        </div>

        <div className={styles.right}>
          <BookingWidget hotel={hotel} />
        </div>
      </div>
    </div>
  )
}
