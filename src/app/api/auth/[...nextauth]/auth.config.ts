import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Mobile OTP',
      credentials: {
        phoneNumber: { label: "Phone Number", type: "tel" },
        otp: { label: "OTP", type: "text" },
        deviceId: { label: "Device ID", type: "text" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.phoneNumber) {
            throw new Error('Phone number is required');
          }

          if (!credentials.otp) {
            return null;
          }

          const deviceInfo = {
            deviceName: 'Web Browser',
            deviceType: 'browser',
            browserInfo: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
          };

          const verifyResponse = await fetch(`${BASE_URL}/user/verify-login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phoneNumber: credentials.phoneNumber,
              otp: credentials.otp,
              deviceId: credentials.deviceId || 'web-default',
              deviceInfo,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (!verifyData.status || !verifyData.data) {
            throw new Error(verifyData.message || 'Invalid OTP');
          }

          return {
            id: verifyData.data._id,
            phoneNumber: verifyData.data.phoneNumber,
            accessToken: verifyData.data.accessToken,
            refreshToken: verifyData.data.refreshToken,
            role: 'user',
          };
        } catch (error) {
          console.error('Authentication error:', error);
          throw error;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.phoneNumber = user.phoneNumber;
        token.role = user.role;
      }

      if (token.accessToken) {
        try {
          const refreshResponse = await fetch(`${BASE_URL}/user/refresh-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              refreshToken: token.refreshToken,
              deviceId: 'web-default',
            }),
          });

          const refreshData = await refreshResponse.json();
          if (refreshData.data?.accessToken) {
            token.accessToken = refreshData.data.accessToken;
          }
        } catch (error) {
          console.error('Token refresh failed:', error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.phoneNumber = token.phoneNumber;
        session.user.role = token.role;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
}; 