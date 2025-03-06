import { DefaultSession } from 'next-auth';

export interface User {
  id: string;
  phoneNumber: string;
  accessToken: string;
  refreshToken: string;
  role: 'user' | 'admin';
  email?: string;
  name?: string;
}

// Extend next-auth types
declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: string;
    user: User;
  }

  interface User {
    phoneNumber: string;
    refreshToken: string;
    role: 'user' | 'admin';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    phoneNumber: string;
    role: 'user' | 'admin';
  }
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
} 