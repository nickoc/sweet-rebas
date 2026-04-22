import type { Metadata } from "next";
import { Dancing_Script, Lora } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

const dancingScript = Dancing_Script({
  weight: ["400", "700"],
  variable: "--font-dancing-script",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  weight: ["400", "700"],
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sweet Reba's Bakery | Carmel & Salinas, CA",
    template: "%s | Sweet Reba's Bakery",
  },
  description:
    "Artisan cookies, bars, breakfast burritos, custom cakes & pies. Two locations on the Monterey Peninsula.",
  keywords: [
    "Sweet Reba's",
    "bakery",
    "Carmel bakery",
    "Salinas bakery",
    "cookies",
    "breakfast burritos",
    "custom cakes",
    "pies",
    "Monterey Peninsula",
  ],
  openGraph: {
    title: "Sweet Reba's Bakery | Carmel & Salinas, CA",
    description:
      "Artisan cookies, bars, breakfast burritos, custom cakes & pies. Two locations on the Monterey Peninsula.",
    siteName: "Sweet Reba's Bakery",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dancingScript.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-reba-dark text-reba-cream font-body">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  );
}
