import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/stores/cart-provider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GiftyyPlace — Premium Curated Gift Hampers",
  description:
    "Discover exquisitely curated gift hampers or build your own custom creation. Luxury gifting for every occasion — from artisan chocolates to personalized keepsakes.",
  keywords: [
    "gift hampers",
    "luxury gifts",
    "custom gift baskets",
    "corporate gifting",
    "premium hampers",
    "personalized gifts",
  ],
  openGraph: {
    title: "GiftyyPlace — Premium Curated Gift Hampers",
    description:
      "Exquisitely curated gift hampers and custom creations for every occasion.",
    type: "website",
    locale: "en_IN",
    siteName: "GiftyyPlace",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased font-sans`}
      >
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
