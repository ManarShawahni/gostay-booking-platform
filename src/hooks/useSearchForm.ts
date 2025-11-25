import { useState } from "react";

export const useSearchForm = () => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);

  const onSearch = () => {
    return {
      destination,
      checkIn,
      checkOut,
      guests,
      rooms,
    };
  };

  return {
    destination,
    setDestination,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guests,
    setGuests,
    rooms,
    setRooms,
    onSearch,
  };
};
