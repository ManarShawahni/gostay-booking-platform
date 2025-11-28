import { api } from "./api.config";
import {
  FeaturedDeal,
  RecentHotel,
  TrendingDestination,
  HomeSearchParams,
  SearchHotelResult
} from "../types";

export const homeService = {

  async searchHotels(params: HomeSearchParams): Promise<SearchHotelResult[]> {
    const response = await api.get("/api/home/search", { params });
    return response.data;
  },

  async getFeaturedDeals(): Promise<FeaturedDeal[]> {
    const response = await api.get("/api/home/featured-deals");
    return response.data;
  },

  async getRecentlyVisited(userId: string): Promise<RecentHotel[]> {
    const response = await api.get(`/api/home/users/${userId}/recent-hotels`);
    return response.data;
  },

  async getTrendingDestinations(): Promise<TrendingDestination[]> {
    const response = await api.get("/api/home/destinations/trending");
    return response.data;
  }
};
