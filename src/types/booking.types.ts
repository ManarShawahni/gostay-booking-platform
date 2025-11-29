export interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface CreateBookingRequest {
  hotelId: number;
  roomId: number;

  checkInDate: string;
  checkOutDate: string;

  numberOfAdults: number;
  numberOfChildren: number;

  guestInfo: GuestInfo;

  paymentMethod: string;
  specialRequests?: string;
}

export interface Booking {
  bookingId: number;
  confirmationNumber: string;
  hotelName: string;
  roomType: string;

  checkInDate: string;
  checkOutDate: string;

  totalPrice: number;
  status: BookingStatus;

  guestInfo: GuestInfo;
}

export enum BookingStatus {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  CANCELLED = "Cancelled",
  COMPLETED = "Completed",
}
