import type { Metadata } from "next";
import Boundary from "@/components/common/Boundary";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UTC",
  description: "UTC App",
  manifest: "/manifest.json",
  icons: {
    apple: "/globe.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "UTC"
  },
  formatDetection: {
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f8e22a" />
        <link rel="apple-touch-icon" href="/ic_launcher.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="UTC" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="app-container">
          <ReduxProvider>
            <ThemeProvider>
              <Boundary>{children}</Boundary>
            </ThemeProvider>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
