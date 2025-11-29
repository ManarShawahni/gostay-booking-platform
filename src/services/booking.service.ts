import { api } from "./api.config";
import { CreateBookingRequest, Booking } from "../types";

export const bookingService = {
  async createBooking(data: CreateBookingRequest): Promise<Booking> {
    const res = await api.post("/api/bookings", data);
    return res.data;
  },

  async getBookingDetails(bookingId: number): Promise<Booking> {
    const res = await api.get(`/api/bookings/${bookingId}`);
    return res.data;
  },
};
