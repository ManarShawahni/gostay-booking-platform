export interface LoginRequest {
  username: string;
  password: string;
}

export type LoginResponse = string;


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
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
}