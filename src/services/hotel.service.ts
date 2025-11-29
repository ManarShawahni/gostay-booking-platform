import { api } from "./api.config";
import {
  HotelDetails,
  HotelGalleryImage,
  HotelReview,
  Room,
} from "../types";

export const hotelService = {
  async getHotelDetails(hotelId: number): Promise<HotelDetails> {
    const res = await api.get(`/api/hotels/${hotelId}`);
    return res.data;
  },

  async getHotelGallery(hotelId: number): Promise<HotelGalleryImage[]> {
    const res = await api.get(`/api/hotels/${hotelId}/gallery`);
    return res.data;
  },

  async getAvailableRooms(hotelId: number): Promise<Room[]> {
    const res = await api.get(`/api/hotels/${hotelId}/available-rooms`);
    return res.data;
  },

  async getHotelReviews(hotelId: number): Promise<HotelReview[]> {
    const res = await api.get(`/api/hotels/${hotelId}/reviews`);
    return res.data;
  },
};
