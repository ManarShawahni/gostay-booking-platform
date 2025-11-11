export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userType: 'Admin' | 'User';
}

export interface User {
  username: string;
  userType: 'Admin' | 'User';
}

export interface AuthState {
  isAuthenticated: boolean;  // Is user logged in?
  user: User | null;          // User info 
  token: string | null;       // JWT token
  loading: boolean;           // Are we currently logging in?
  error: string | null;       // Any login error message
}