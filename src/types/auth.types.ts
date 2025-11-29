export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  authentication: string;
  userType: 'Admin' | 'User';
}

export interface User {
  username: string;
  userType: 'Admin' | 'User';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest, rememberMe?: boolean) => Promise<LoginResponse | null>;
  logout: () => void;
  isAdmin: boolean;
}