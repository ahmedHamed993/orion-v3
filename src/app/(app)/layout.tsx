import type { Metadata } from "next";
import { Cairo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Providers from "@/components/providers/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable:"--font-cairo",
  subsets:['arabic']
})

export const metadata: Metadata = {
  title: "Next 15 - try next auth",
  description: "trying next auth ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir='rtl' suppressHydrationWarning>
      <body
        className={`${cairo.className} antialiased`}
      >
      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > */}
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
