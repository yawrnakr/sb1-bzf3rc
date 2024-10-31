import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

// Create a custom error class for API errors
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Create and configure the axios instance
export const api: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Handle unauthorized errors
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }

    // Transform error to custom APIError
    throw new APIError(
      error.response?.data?.message || 'An unexpected error occurred',
      error.response?.status,
      error.response?.data?.code
    );
  }
);

// API endpoints
export const endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    register: '/auth/register',
    resetPassword: '/auth/reset-password',
  },
  websites: {
    list: '/websites',
    details: (id: string) => `/websites/${id}`,
    create: '/websites',
    update: (id: string) => `/websites/${id}`,
    delete: (id: string) => `/websites/${id}`,
    metrics: (id: string) => `/websites/${id}/metrics`,
  },
  users: {
    profile: '/users/profile',
    settings: '/users/settings',
    notifications: '/users/notifications',
  },
};

// Type-safe API request functions
export const apiClient = {
  async get<T>(url: string, config?: AxiosRequestConfig) {
    const response = await api.get<T>(url, config);
    return response.data;
  },

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await api.post<T>(url, data, config);
    return response.data;
  },

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await api.put<T>(url, data, config);
    return response.data;
  },

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    const response = await api.delete<T>(url, config);
    return response.data;
  },

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await api.patch<T>(url, data, config);
    return response.data;
  },
};

export default api;