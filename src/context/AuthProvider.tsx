import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { authService } from "../services";
import {
  LoginRequest,
  AuthState,
  User,
  ApiError,
} from "../types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    user: null,
    loading: false,
    error: null,
  });

  // Auto-login from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("authUser");

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

  // Login function
  const login = async (credentials: LoginRequest) => {
    setState((s) => ({ ...s, loading: true, error: null }));

    try {
      const token = await authService.login(credentials);

      const userType = credentials.username === "admin" ? "Admin" : "User";

      const user: User = {
        username: credentials.username,
        userType,
      };

      // Update state
      setState({
        isAuthenticated: true,
        token,
        user,
        loading: false,
        error: null,
      });

      // Persist
      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));
    } catch (err: unknown) {
      const errorObj = err as ApiError;

      setState({
        isAuthenticated: false,
        token: null,
        user: null,
        loading: false,
        error: errorObj.message || "Login failed",
      });
    }
  };

  // Logout
  const logout = () => {
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
