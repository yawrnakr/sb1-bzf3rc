// API Response Types
export interface APIResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

// Error Types
export interface APIErrorResponse {
  message: string;
  code?: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

// Website Types
export interface WebsiteCreateData {
  url: string;
  name: string;
  topics: string[];
  gam_id: string;
}

export interface WebsiteUpdateData {
  name?: string;
  topics?: string[];
  status?: string;
}

// User Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  company?: string;
  avatar?: string;
  settings: UserSettings;
}

export interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    types: string[];
  };
  theme: 'light' | 'dark' | 'system';
  timezone: string;
}

// Metric Types
export interface MetricsResponse {
  traffic: {
    total: number;
    daily: number;
    monthly: number;
    trend: number;
    sources: Array<{
      source: string;
      percentage: number;
    }>;
  };
  revenue: {
    total: number;
    daily: number;
    monthly: number;
    trend: number;
  };
  performance: {
    pageViews: number;
    bounceRate: number;
    avgSessionDuration: number;
  };
}