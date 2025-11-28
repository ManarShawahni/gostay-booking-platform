export interface RoomAmenity {
  id: number;
  name: string;
  description?: string;
}

export interface Room {
  roomId: number;
  roomNumber: number;
  roomPhotoUrl: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  roomAmenities: RoomAmenity[];
  price: number;
  availability: boolean;
}

export interface HotelGalleryImage {
  id: number;
  url: string;
}

export interface HotelReview {
  reviewId: number;
  customerName: string;
  rating: number;
  description: string;
}

export interface HotelDetails {
  id: number;
  hotelName: string;
  location: string;
  description: string;
  hotelType: string;
  starRating: number;
  latitude: number;
  longitude: number;
  rooms: {
    id: number;
    name: string;
    type: string;
    price: number;
    available: boolean;
    maxOccupancy: number;
  }[];
  imageUrl: string;
  availableRooms: number;
  cityId: number;
  amenities: RoomAmenity[];
}
