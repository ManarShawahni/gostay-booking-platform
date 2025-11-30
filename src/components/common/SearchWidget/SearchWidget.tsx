import React, { useEffect, useRef, useState } from "react";
import styles from "./SearchWidget.module.css";
import { MagnifyingGlassIcon, MapPinIcon, CalendarIcon, UserGroupIcon } from "@heroicons/react/24/outline";

interface SearchParams {
  destination: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  rooms: number;
}

interface Props {
  initialValues?: Partial<SearchParams>;
  onSearch?: (params: SearchParams) => void;
}

export const SearchWidget: React.FC<Props> =({
  initialValues,
  onSearch,
}) => {

  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    destination: "",
    checkInDate: getTodayDate(),
    checkOutDate: getTomorrowDate(),
    adults: 2,
    children: 0,
    rooms: 1,
  });

  const guestDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (initialValues) {
        setSearchParams((prev) => ({
          ...prev,
          ...initialValues,
        }));
      }
    }, [initialValues]);

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (guestDropdownRef.current && !guestDropdownRef.current.contains(event.target as Node)) {
        setShowGuestDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (!searchParams.destination.trim()) {
      alert("Please enter a destination");
      return;
    }

    if (new Date(searchParams.checkInDate) >= new Date(searchParams.checkOutDate)) {
      alert("Check-out date must be after check-in date");
      return;
    }

     if (onSearch) {
      onSearch(searchParams);
      return;
    }

    const queryParams = new URLSearchParams({
      destination: searchParams.destination,
      checkInDate: searchParams.checkInDate,
      checkOutDate: searchParams.checkOutDate,
      adults: searchParams.adults.toString(),
      children: searchParams.children.toString(),
      rooms: searchParams.rooms.toString(),
    });

    window.location.href = `/search?${queryParams.toString()}`;
  };

  const updateGuests = (field: 'adults' | 'children' | 'rooms', delta: number) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: Math.max(field === 'children' ? 0 : 1, prev[field] + delta)
    }));
  };

  const getGuestSummary = () => {
    const parts = [];
    if (searchParams.adults > 0) parts.push(`${searchParams.adults} Adult${searchParams.adults > 1 ? 's' : ''}`);
    if (searchParams.children > 0) parts.push(`${searchParams.children} Child${searchParams.children > 1 ? 'ren' : ''}`);
    if (searchParams.rooms > 1) parts.push(`${searchParams.rooms} Rooms`);
    return parts.join(', ') || '1 Adult, 1 Room';
  };

  return (
    <div className={styles.widget}>

      {/* DESTINATION */}
      <div className={styles.field}>
        <label className={styles.label}>
          <MapPinIcon className={styles.icon} />
          Where to?
        </label>
        <input 
          type="text" 
          placeholder="Search hotels, cities..." 
          className={styles.input} 
          value={searchParams.destination}
          onChange={(e) => setSearchParams(prev => ({ ...prev, destination: e.target.value }))}
          aria-label="Destination"
        />
      </div>

      <div className={styles.divider} aria-hidden="true"></div>

      {/* CHECK-IN */}
      <div className={styles.field}>
        <label className={styles.label}>
          <CalendarIcon className={styles.icon} />
          Check-in
        </label>
        <input 
          type="date" 
          className={styles.input} 
          value={searchParams.checkInDate}
          min={getTodayDate()}
          onChange={(e) => setSearchParams(prev => ({ ...prev, checkInDate: e.target.value }))}
          aria-label="Check-in date"
        />
      </div>

      <div className={styles.divider} aria-hidden="true"></div>

      {/* CHECK-OUT */}
      <div className={styles.field}>
        <label className={styles.label}>
          <CalendarIcon className={styles.icon} />
          Check-out
        </label>
        <input 
          type="date" 
          className={styles.input}
          value={searchParams.checkOutDate}
          min={searchParams.checkInDate}
          onChange={(e) => setSearchParams(prev => ({ ...prev, checkOutDate: e.target.value }))}
          aria-label="Check-out date"
        />
      </div>

      <div className={styles.divider} aria-hidden="true"></div>

      {/* GUESTS */}
      <div className={styles.field} ref={guestDropdownRef}>
        <label className={styles.label}>
          <UserGroupIcon className={styles.icon} />
          Guests
        </label>
        <button
          className={styles.guestTrigger}
          onClick={() => setShowGuestDropdown(!showGuestDropdown)}
          aria-label="Select guests and rooms"
          aria-expanded={showGuestDropdown}
        >
          {getGuestSummary()}
        </button>

        {/* Guest Dropdown */}
        {showGuestDropdown && (
          <div className={styles.guestDropdown}>
            
            {/* Adults */}
            <div className={styles.guestRow}>
              <div>
                <div className={styles.guestLabel}>Adults</div>
                <div className={styles.guestSubLabel}>Ages 13+</div>
              </div>
              <div className={styles.guestControls}>
                <button 
                  className={styles.guestBtn}
                  onClick={() => updateGuests('adults', -1)}
                  disabled={searchParams.adults <= 1}
                  aria-label="Decrease adults"
                >
                  −
                </button>
                <span className={styles.guestCount}>{searchParams.adults}</span>
                <button 
                  className={styles.guestBtn}
                  onClick={() => updateGuests('adults', 1)}
                  disabled={searchParams.adults >= 10}
                  aria-label="Increase adults"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className={styles.guestRow}>
              <div>
                <div className={styles.guestLabel}>Children</div>
                <div className={styles.guestSubLabel}>Ages 0-12</div>
              </div>
              <div className={styles.guestControls}>
                <button 
                  className={styles.guestBtn}
                  onClick={() => updateGuests('children', -1)}
                  disabled={searchParams.children <= 0}
                  aria-label="Decrease children"
                >
                  −
                </button>
                <span className={styles.guestCount}>{searchParams.children}</span>
                <button 
                  className={styles.guestBtn}
                  onClick={() => updateGuests('children', 1)}
                  disabled={searchParams.children >= 10}
                  aria-label="Increase children"
                >
                  +
                </button>
              </div>
            </div>

            {/* Rooms */}
            <div className={styles.guestRow}>
              <div>
                <div className={styles.guestLabel}>Rooms</div>
                <div className={styles.guestSubLabel}>Per booking</div>
              </div>
              <div className={styles.guestControls}>
                <button 
                  className={styles.guestBtn}
                  onClick={() => updateGuests('rooms', -1)}
                  disabled={searchParams.rooms <= 1}
                  aria-label="Decrease rooms"
                >
                  −
                </button>
                <span className={styles.guestCount}>{searchParams.rooms}</span>
                <button 
                  className={styles.guestBtn}
                  onClick={() => updateGuests('rooms', 1)}
                  disabled={searchParams.rooms >= 5}
                  aria-label="Increase rooms"
                >
                  +
                </button>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* SEARCH BUTTON */}
      <button 
        className={styles.searchBtn}
        onClick={handleSearch}
        aria-label="Search hotels"
      >
        <MagnifyingGlassIcon className={styles.searchIcon} />
      </button>

    </div>
  );
};


function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

function getTomorrowDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

export default SearchWidget;