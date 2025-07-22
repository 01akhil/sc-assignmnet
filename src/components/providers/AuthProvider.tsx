'use client';

import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { User, AuthState } from '@/lib/constants/types';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  const checkAuth = useCallback(async () => {
    const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (savedUser) {
      setAuth({
        user: savedUser,
        isAuthenticated: true,
        isLoading: false
      });
    } else {
      setAuth({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(async (email: string, password: string) => {
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0]
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    setAuth({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false
    });
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    setAuth({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('todos');
    setAuth({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};