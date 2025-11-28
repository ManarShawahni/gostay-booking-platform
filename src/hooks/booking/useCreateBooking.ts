import { useState } from "react";
import { bookingService } from "../../services";
import { CreateBookingRequest, Booking } from "../../types";

export const useCreateBooking = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const createBooking = async (payload: CreateBookingRequest) => {
    try {
      setLoading(true);
      setError(null);

      const result = await bookingService.createBooking(payload);
      setBooking(result);
      setSuccess(true);

      return result;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create booking";

      setError(message);
      setSuccess(false);

      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, loading, booking, error, success };
};
