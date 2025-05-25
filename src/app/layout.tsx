import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import ScrollToTop from "@/components/ScrollToTop";

// Primary Font: Geist for headings and titles
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Secondary Font: Inter for body text, buttons, hyperlinks
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Enginaro Industrial",
  description: "Enginaro Industrial Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased relative bg-background`}
      >
        <NavigationBar />
        <main>
          {children}
        </main>
        <ScrollToTop />
      </body>
    </html>
  );
}
