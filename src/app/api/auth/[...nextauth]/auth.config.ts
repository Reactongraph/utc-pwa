import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email) {
            throw new Error("Email is required");
          }

          const verifyResponse = await fetch(
            `${BASE_URL}/api/v1/users/sign_in`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
              }),
            }
          );

          const verifyData = await verifyResponse.json();

          if (!verifyData.status || !verifyData.user_details) {
            throw new Error(verifyData.message || "Invalid credentials");
          }

          // Remove sensitive password fields and extract user details
          const { ...userDetails } = verifyData.user_details;

          return {
            ...userDetails,
            role: userDetails.web_role || userDetails.role,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token,
      };

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
};
