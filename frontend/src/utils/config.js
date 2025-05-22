// Base API URL for the application
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/user/login`,
  SIGNUP: `${API_BASE_URL}/user/signup`,
  PROFILE: `${API_BASE_URL}/user/me`,
};

// Property endpoints
export const PROPERTY_ENDPOINTS = {
  ALL: `${API_BASE_URL}/property`,
  FEATURED: `${API_BASE_URL}/property/featured`,
  DETAIL: (id) => `${API_BASE_URL}/property/${id}`,
};
