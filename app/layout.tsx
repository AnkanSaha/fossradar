import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { VT323, Share_Tech, Inter } from "next/font/google";
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
  title: "FOSSRadar.in - India's Open Source Directory",
  description: "Discover and explore open source projects from India",
  keywords: ["open source", "foss", "india", "projects", "directory", "fossradar"],
  authors: [{ name: "FOSSRadar.in" }],
  openGraph: {
    title: "FOSSRadar.in - India's Open Source Directory",
    description: "Discover and explore open source projects from India",
    type: "website",
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
      </body>
    </html>
  );
}
