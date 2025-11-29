export interface FeaturedDeal {
  hotelId: number;
  originalRoomPrice: number;
  discount: number;
  finalPrice: number;
  cityName: string;
  hotelName: string;
  hotelStarRating: number;
  title: string;
  description: string;
  roomPhotoUrl: string;
}

export interface FeaturedDealApp {
  id: string; 
  hotelName: string;
  city: string;
  imageUrl: string;
  originalPrice: number; 
  discountedPrice: number; 
  discount: number;
  starRating: number;
}

//===========================================

export interface RecentHotel {
  hotelId: number;
  hotelName: string;
  starRating: number;
  visitDate: string; 
  cityName: string;
  thumbnailUrl: string;
  priceLowerBound: number;
  priceUpperBound: number;
}

export interface RecentHotelApp {
  hotelId: string;
  hotelName: string;
  city: string; 
  thumbnailUrl: string;
  starRating: number;
  visitDate: string;
  pricePerNight: number; 
}

//=========================================


export interface TrendingDestination {
  cityId: number;
  cityName: string;
  countryName: string;
  description: string;
  thumbnailUrl: string;
}


export interface TrendingDestinationApp {
  id: string;
  city: string;
  country: string;
  description: string;
  imageUrl: string;
  hotelsCount: number;
}
//=========================================
export interface HomeSearchParams {
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  rooms: number;
  amenities?: string;
  starRate?: number;
}
