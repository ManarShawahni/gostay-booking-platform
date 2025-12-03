import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { authService } from "../../services";
import {
  LoginRequest,
  AuthState,
  User,
  ApiError,
  LoginResponse
} from "../../types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    user: null,
    loading: true,
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
    } else {
      setState((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  }, []);


const login = async (
  credentials: LoginRequest, 
  rememberMe: boolean = false
): Promise<LoginResponse | null> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const result = await authService.login(credentials);

      const jwt = result.authentication;

      const user: User = {
        username: credentials.username,
        userType: result.userType,
      };

      setState({
        isAuthenticated: true,
        token: result.authentication,
        user,
        loading: false,
        error: null,
      });

      if (rememberMe) {
          localStorage.setItem("authToken", jwt);
          localStorage.setItem("authUser", JSON.stringify(user));
      } else {
          sessionStorage.setItem("authToken", jwt);
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


const logout = () => {
  sessionStorage.clear();
  localStorage.clear();

  window.location.replace("/login");

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
