export interface ImageData {
  id?: number;
  url: string;
  caption?: string;
  thumbnailUrl?: string;
}

export interface Location {
  cityName: string;
  countryName?: string;
  latitude?: number;
  longitude?: number;
}

export interface PriceRange {
  priceLowerBound: number;
  priceUpperBound: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
