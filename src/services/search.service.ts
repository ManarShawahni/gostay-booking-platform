import { api } from "./api.config";
import { SearchQueryParams, SearchHotelResult, SearchAmenity } from "../types";

export const searchService = {
  
  async searchHotels(params: SearchQueryParams): Promise<SearchHotelResult[]> {
  const response = await api.get("/api/home/search", {
    params: {
      city: params.destination,
      checkInDate: params.checkInDate,
      checkOutDate: params.checkOutDate,
      adults: params.adults,
      children: params.children,
      rooms: params.rooms,
      starRate: params.starRate || undefined
    }
  });

  return response.data;
  },

  async getAmenities(): Promise<SearchAmenity[]> {
    const response = await api.get("/api/search-results/amenities");
    return response.data;
  }
};
