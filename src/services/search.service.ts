import { api } from "./api.config";
import { SearchQueryParams, SearchHotelResult, SearchAmenity } from "../types";

export const searchService = {
  
  async searchHotels(params: SearchQueryParams): Promise<SearchHotelResult[]> {
    const response = await api.get("/api/hotels", { params });
    return response.data;
  },

  async getAmenities(): Promise<SearchAmenity[]> {
    const response = await api.get("/api/search-results/amenities");
    return response.data;
  }
};
