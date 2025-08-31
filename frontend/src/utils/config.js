// Base API URL for the application
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Fix for double slashes in URL
const formatUrl = (baseUrl, path) => {
  // Remove trailing slash from base and leading slash from path
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}/${cleanPath}`;
};

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: formatUrl(API_BASE_URL, 'api/user/v1/signin'),
  SIGNUP: formatUrl(API_BASE_URL, 'api/user/v1/signup'),
  PROFILE: formatUrl(API_BASE_URL, 'api/user/v1/profile'),
};

// Property endpoints
export const PROPERTY_ENDPOINTS = {
  ALL: formatUrl(API_BASE_URL, 'api/property/v1/get-properties'),
  FEATURED: formatUrl(API_BASE_URL, 'api/property/v1/get-properties'), // Changed to match backend route
  DETAIL: (id) => formatUrl(API_BASE_URL, `api/property/v1/get-property/${id}`),
};
