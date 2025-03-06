import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    phoneNumber: string;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    user: {
      phoneNumber: string;
    } & DefaultSession['user'];
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    phoneNumber: string;
    accessToken: string;
    refreshToken: string;
  }
} 