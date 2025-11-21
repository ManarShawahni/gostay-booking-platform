import { AxiosError } from 'axios';
import { api } from './api.config';
import { LoginRequest, LoginResponse, ApiError } from '../types';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
export const authService = {

  async login(credentials: LoginRequest): Promise<string> {
    try {
      const response = await api.post<LoginResponse | string>('/api/auth/authenticate', {
        userName: credentials.username,
        password: credentials.password,
      });

    return response.data as string;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      
      // Extract error message from API response or use default
      const errorMessage = err.response?.data?.message 
        || err.message 
        || 'Login failed. Please try again.';
      
      throw {
        message: errorMessage,
        statusCode: err.response?.status || 500,
      } as ApiError;
    }
  },

  /**
   * Logout user
   * Clears authentication token from storage
   */
  async logout(): Promise<void> {
    // Clear token from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    
    // Return resolved promise
    return Promise.resolve();
  },
};