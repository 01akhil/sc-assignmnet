import { createContext } from 'react';
import { User } from '../lib/constants/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType {
  auth: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  auth: { user: null, isAuthenticated: false, isLoading: true },
  login: async () => {},
  register: async () => {},
  logout: () => {}
});