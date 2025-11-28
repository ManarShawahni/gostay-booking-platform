import { useEffect, useState } from "react";
import { bookingService } from "../../services";
import { Booking } from "../../types";

export const useBookingDetails = (bookingId: number) => {
  const [data, setData] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await bookingService.getBookingDetails(bookingId);
        setData(res);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [bookingId]);

  return { data, loading };
};
