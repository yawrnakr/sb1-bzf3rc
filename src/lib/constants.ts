export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  WEBSITES: {
    LIST: '/websites',
    DETAILS: (id: string) => `/websites/${id}`,
  },
};

export const CACHE_KEYS = {
  WEBSITES: 'websites',
  USER: 'user',
};

export const ERROR_MESSAGES = {
  GENERAL: 'An error occurred. Please try again.',
  UNAUTHORIZED: 'Please log in to continue.',
  NETWORK: 'Network error. Please check your connection.',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
};