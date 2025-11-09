import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { VT323, Share_Tech, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

// Font configurations
const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

const shareTech = Share_Tech({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fossradar.in'),
  title: {
    default: "FOSSRadar.in - India's Open Source Directory",
    template: "%s | FOSSRadar.in"
  },
  description: "Discover and explore open source projects from India. FOSSRadar is a comprehensive directory celebrating FOSS projects through their founders, creators, contributors, and community impact.",
  keywords: [
    "open source",
    "foss",
    "india",
    "indian developers",
    "open source projects",
    "github",
    "directory",
    "fossradar",
    "programming",
    "software development",
    "indian tech",
    "developer community",
    "kolkata",
    "bangalore",
    "mumbai",
    "delhi",
    "hyderabad"
  ],
  authors: [{ name: "FOSSRadar.in", url: "https://fossradar.in" }],
  creator: "wbfoss",
  publisher: "wbfoss",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://fossradar.in",
    siteName: "FOSSRadar.in",
    title: "FOSSRadar.in - India's Open Source Directory",
    description: "Discover and explore open source projects from India. A comprehensive directory celebrating FOSS projects from Indian founders, creators, and contributors.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FOSSRadar.in - India's Open Source Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FOSSRadar.in - India's Open Source Directory",
    description: "Discover and explore open source projects from India",
    images: ["/og-image.png"],
    creator: "@wbfoss",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://fossradar.in",
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${vt323.variable} ${shareTech.variable} antialiased font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
