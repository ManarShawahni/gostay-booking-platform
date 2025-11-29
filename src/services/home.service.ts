import { api } from "./api.config";
import {
  FeaturedDeal,
  FeaturedDealApp,
  RecentHotel,
  RecentHotelApp,
  TrendingDestination,
  TrendingDestinationApp,
  HomeSearchParams,
  SearchHotelResult
} from "../types";

export const homeService = {

  async searchHotels(params: HomeSearchParams): Promise<SearchHotelResult[]> {
    const response = await api.get("/api/home/search", { params });
    return response.data;
  },

  async getFeaturedDeals() {
    const response = await api.get("/api/home/featured-deals");
    return (response.data as FeaturedDeal[]).map(normalizeFeaturedDeal);
  },

  async getRecentlyVisited(userId: string): Promise<RecentHotelApp[]> {
    const response = await api.get(`/api/home/users/${userId}/recent-hotels`);
    
    return (response.data as RecentHotel[]).map(normalizeRecentHotel);
  },

  async getTrendingDestinations(): Promise<TrendingDestinationApp[]> {
    const response = await api.get("/api/home/destinations/trending");
    return (response.data as TrendingDestination[]).map(normalizeTrending);
  }
};

function normalizeFeaturedDeal(item: FeaturedDeal): FeaturedDealApp {

  const calculatedDiscount = (
    (item.originalRoomPrice - item.finalPrice) / item.originalRoomPrice
  ) * 100;

    return {
      id: String(item.hotelId),
      hotelName: item.hotelName,
      city: item.cityName,
      imageUrl: item.roomPhotoUrl,
      originalPrice: item.originalRoomPrice,
      discountedPrice: item.finalPrice,
      discount: Math.round(calculatedDiscount),
      starRating: item.hotelStarRating,
  };
}

function normalizeRecentHotel(item: RecentHotel): RecentHotelApp {

    return {
      hotelId: String(item.hotelId),
      hotelName: item.hotelName,
      city: item.cityName,
      thumbnailUrl: item.thumbnailUrl,
      starRating: item.starRating,
      visitDate: item.visitDate,
      pricePerNight: item.priceLowerBound, 

    };

}

function normalizeTrending(item: TrendingDestination): TrendingDestinationApp {
  return {
    id: String(item.cityId),
    city: item.cityName,
    country: item.countryName,
    description: item.description,
    imageUrl: item.thumbnailUrl,
    hotelsCount: Math.floor(Math.random() * 200) + 50 
  };
}
