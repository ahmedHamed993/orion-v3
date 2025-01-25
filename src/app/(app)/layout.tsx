import type { Metadata } from "next";
import { Cairo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Providers from "@/components/providers/providers";
import Cart from "@/components/cart/cart";
import { getMeta } from "@/api-calls/meta";

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


export async function generateMetadata() {
  const meta = await getMeta();
  return {
    title: meta?.project_name,
    description: meta?.project_name,
    icons: {
      icon: meta?.vendor?.img,
    },
    openGraph: {
      title: meta?.project_name,
      description: meta?.project_name,
      siteName: meta?.project_name,
      images: [
        {
          url: meta?.vendor?.img, // Must be an absolute URL
          width: 256,
          height: 256,
        },
      ],
    }
  }
}
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
