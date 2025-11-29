export interface SearchAmenity {
  id: number;
  name: string;
  description?: string;
}

export interface SearchHotelResult {
  hotelId: number;
  hotelName: string;
  starRating: number;
  latitude: number;
  longitude: number;
  roomPrice: number;
  roomType: string;
  cityName: string;
  roomPhotoUrl: string;
  discount?: number;

  amenities: SearchAmenity[];

  numberOfChildren: number;
  numberOfAdults: number;
  numberOfRooms: number;

  checkInDate: string;
  checkOutDate: string;
}

export interface SearchQueryParams {
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  rooms: number;

  starRate?: number;
  amenities?: string; 
  cityName?: string;
  minPrice?: number;
  maxPrice?: number;
}
