import { useState, useCallback } from 'react';
import { api } from '../api';
import { API_ENDPOINTS, ERROR_MESSAGES } from '../constants';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      localStorage.setItem('auth_token', data.token);
      return data;
    } catch (err) {
      setError(ERROR_MESSAGES.GENERAL);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
      localStorage.removeItem('auth_token');
    } catch (err) {
      console.error('Logout error:', err);
    }
  }, []);

  return {
    login,
    logout,
    isLoading,
    error,
  };
}