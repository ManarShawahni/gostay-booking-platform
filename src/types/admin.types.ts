export interface City {
  id: number;
  name: string;
  description: string;
}

export interface Hotel {
  id: number;
  hotelName: string;
  description: string;
  hotelType: string;
  starRating: number;
  latitude: number;
  longitude: number;
  imageUrl: string;
  cityId: number;
}

export interface RawRoom {
  id: number;
  roomNumber?: number | string;
  name?: string;
  price?: number;
  available?: boolean;
  availability?: boolean;
  maxOccupancy?: number;
  capacityOfAdults?: number;
  capacityOfChildren?: number;
}

export interface Room {
  id: number;
  hotelId: number;
  hotelName: string;
  roomNumber: number;
  capacityOfAdults: number;
  capacityOfChildren: number;
  price: number;
  availability: boolean;
}

export type RoomPayload = Omit<Room, "id" | "hotelName">;

export interface Reservation {
  id: number;
  userId: number;
  hotelId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
}