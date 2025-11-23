import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { authService } from "../services";
import {
  LoginRequest,
  AuthState,
  User,
  ApiError,
  LoginResponse
} from "../types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    user: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    const savedUser = localStorage.getItem("authUser") || sessionStorage.getItem("authUser");

    if (savedToken && savedUser) {
      setState({
        isAuthenticated: true,
        token: savedToken,
        user: JSON.parse(savedUser),
        loading: false,
        error: null,
      });
    }
  }, []);

  // Login
const login = async (
  credentials: LoginRequest, 
  rememberMe: boolean = false
): Promise<LoginResponse | null> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const result = await authService.login(credentials);

      const user: User = {
        username: credentials.username,
        userType: result.userType,
      };

      setState({
        isAuthenticated: true,
        token: result.token,
        user,
        loading: false,
        error: null,
      });

      if (rememberMe) {
          localStorage.setItem("authToken", result.token);
          localStorage.setItem("authUser", JSON.stringify(user));
      } else {
          sessionStorage.setItem("authToken", result.token);
          sessionStorage.setItem("authUser", JSON.stringify(user));
      }

      return result;
    } catch (err) {
      const errorObj = err as ApiError;

      setState({
        isAuthenticated: false,
        token: null,
        user: null,
        loading: false,
        error: errorObj.message || "Login failed",
      });

      return null;
    }
  };

  // Logout
  const logout = () => {

    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("authUser");

    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");

    setState({
      isAuthenticated: false,
      token: null,
      user: null,
      loading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        isAdmin: state.user?.userType === "Admin"
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
