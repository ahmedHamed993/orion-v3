import type { Metadata } from "next";
import { Cairo, Geist, Geist_Mono } from "next/font/google";
import "../globals.css"
import Providers from "@/components/providers/providers";
const cairo = Cairo({
  variable:"--font-cairo",
  // subsets:['arabic']
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

        {children}
      </Providers>
      </body>
    </html>
  );
}
