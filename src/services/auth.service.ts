import { AxiosError } from "axios";
import { api } from "./api.config";
import { LoginRequest, LoginResponse, ApiError } from "../types";

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<string>("/api/auth/authenticate", {
        userName: credentials.username,
        password: credentials.password,
      });

      const token = response.data; 

      const userType =
        credentials.username.toLowerCase() === "admin" ? "Admin" : "User";

      return {
        token,
        userType,
      };
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      throw {
        message:
          err.response?.data?.message ||
          err.message ||
          "Login failed. Please try again.",
        statusCode: err.response?.status || 500,
      };
    }
  },

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");

    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("authUser");
  },
};
