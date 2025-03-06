export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
  },
} as const; 