import React, { createContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import * as api from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  register: (email: string, password: string) => Promise<User | null>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => null,
  logout: () => {},
  register: async () => null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const validateToken = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const currentUser = await api.getSelf(token);
        setUser(currentUser);
      } catch (error) {
        console.error("Token validation failed", error);
        localStorage.removeItem('authToken');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      const { token, user: loggedInUser } = await api.login(email, password);
      localStorage.setItem('authToken', token);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const register = async (email: string, password: string): Promise<User | null> => {
    try {
      const { token, user: newUser } = await api.register(email, password);
      localStorage.setItem('authToken', token);
      setUser(newUser);
      return newUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
