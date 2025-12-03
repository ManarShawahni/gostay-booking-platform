import { useState, useRef, useEffect } from "react"
import styles from "./BookingWidget.module.css"
import { useSearchParams } from "react-router-dom"
import { HotelDetails } from "../../../../types/hotel.types"
import { Button } from "../../../common/Button/Button"
import { CalendarIcon, UserGroupIcon } from "@heroicons/react/24/outline"
import { useCart } from "../../../../hooks/useCart"

type Props = {
  hotel: HotelDetails
}

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0]
}

function getTomorrowDate(): string {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
}

export default function BookingWidget({ hotel }: Props) {
  const [searchParams] = useSearchParams()
  const { addToCart } = useCart()
  
  const [checkInDate, setCheckInDate] = useState(searchParams.get("checkInDate") || getTodayDate())
  const [checkOutDate, setCheckOutDate] = useState(searchParams.get("checkOutDate") || getTomorrowDate())
  const [adults, setAdults] = useState(Number(searchParams.get("adults") || 1))
  const [children, setChildren] = useState(Number(searchParams.get("children") || 0))
  const [showGuestDropdown, setShowGuestDropdown] = useState(false)
  
  const guestDropdownRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (guestDropdownRef.current && !guestDropdownRef.current.contains(event.target as Node)) {
        setShowGuestDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  
  const basePrice = hotel.availableRooms > 0 ? hotel.rooms[0]?.price || 0 : 0
  
  const nights = checkInDate && checkOutDate 
    ? Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24))
    : 1
  
  const total = basePrice * nights

  const updateGuests = (field: 'adults' | 'children', delta: number) => {
    if (field === 'adults') {
      const newValue = Math.max(1, Math.min(10, adults + delta))
      setAdults(newValue)
    } else {
      const newValue = Math.max(0, Math.min(10, children + delta))
      setChildren(newValue)
    }
  }

  const getGuestSummary = () => {
    const parts = []
    if (adults > 0) parts.push(`${adults} Adult${adults !== 1 ? "s" : ""}`)
    if (children > 0) parts.push(`${children} Child${children !== 1 ? "ren" : ""}`)
    return parts.join(", ") || "1 Adult"
  }

  const handleBookNow = () => {
    addToCart({
      hotelId: hotel.id,
      hotelName: hotel.hotelName,
      cityName: hotel.location,
      image: hotel.imageUrl,
      price: total,
      checkInDate,
      checkOutDate,
      adults,
      children,
    })
  }

  return (
    <div className={styles.box}>
      <div className={styles.priceSection}>
        <div className={styles.priceRow}>
          <span className={styles.price}>${basePrice}</span>
          <span className={styles.priceLabel}>/Night</span>
        </div>
      </div>

      <div className={styles.datesSection}>
        <div className={styles.dateField}>
          <label className={styles.dateLabel}>
            <CalendarIcon className={styles.dateIcon} />
            Check In
          </label>
          <input
            type="date"
            className={styles.dateInput}
            value={checkInDate}
            min={getTodayDate()}
            onChange={(e) => {
              setCheckInDate(e.target.value)
              if (new Date(e.target.value) >= new Date(checkOutDate)) {
                const nextDay = new Date(e.target.value)
                nextDay.setDate(nextDay.getDate() + 1)
                setCheckOutDate(nextDay.toISOString().split('T')[0])
              }
            }}
            aria-label="Check-in date"
          />
        </div>

        <div className={styles.dateField}>
          <label className={styles.dateLabel}>
            <CalendarIcon className={styles.dateIcon} />
            Check Out
          </label>
          <input
            type="date"
            className={styles.dateInput}
            value={checkOutDate}
            min={checkInDate || getTodayDate()}
            onChange={(e) => setCheckOutDate(e.target.value)}
            aria-label="Check-out date"
          />
        </div>

        <div className={styles.dateField} ref={guestDropdownRef}>
          <label className={styles.dateLabel}>
            <UserGroupIcon className={styles.dateIcon} />
            Guests
          </label>
          <button
            className={styles.guestTrigger}
            onClick={() => setShowGuestDropdown(!showGuestDropdown)}
            aria-label="Select guests"
            aria-expanded={showGuestDropdown}
          >
            {getGuestSummary()}
          </button>

          {showGuestDropdown && (
            <div className={styles.guestDropdown}>
              <div className={styles.guestRow}>
                <div>
                  <div className={styles.guestLabel}>Adults</div>
                  <div className={styles.guestSubLabel}>Ages 13+</div>
                </div>
                <div className={styles.guestControls}>
                  <button
                    className={styles.guestBtn}
                    onClick={() => updateGuests('adults', -1)}
                    disabled={adults <= 1}
                    aria-label="Decrease adults"
                  >
                    −
                  </button>
                  <span className={styles.guestCount}>{adults}</span>
                  <button
                    className={styles.guestBtn}
                    onClick={() => updateGuests('adults', 1)}
                    disabled={adults >= 10}
                    aria-label="Increase adults"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.guestRow}>
                <div>
                  <div className={styles.guestLabel}>Children</div>
                  <div className={styles.guestSubLabel}>Ages 0-12</div>
                </div>
                <div className={styles.guestControls}>
                  <button
                    className={styles.guestBtn}
                    onClick={() => updateGuests('children', -1)}
                    disabled={children <= 0}
                    aria-label="Decrease children"
                  >
                    −
                  </button>
                  <span className={styles.guestCount}>{children}</span>
                  <button
                    className={styles.guestBtn}
                    onClick={() => updateGuests('children', 1)}
                    disabled={children >= 10}
                    aria-label="Increase children"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryRowTotal}>
          <span>Total Cost:</span>
          <span>${total}</span>
        </div>
      </div>

      <Button 
        onClick={handleBookNow}
        fullWidth
      >
        Book Now
      </Button>
    </div>
  )
}
