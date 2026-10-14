import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";
import CustomCursor from "@/components/common/CustomCursor";
import Chatbot from "@/components/common/Chatbot";

export const metadata: Metadata = {
  title: "Dagsis Tours & Travel Dummy — Curated Journeys Across Singapore | Luxury Travel Atelier",
  description:
    "Discover extraordinary Singapore enclaves, handcrafted luxury itineraries, and unforgettable experiences. Dagsis Tours & Travel Dummy luxury travel atelier offering bespoke private voyages in SGD with Changi VIP coordination.",
  keywords: [
    "Dagsis Tours & Travel Dummy",
    "Dagsis",
    "Luxury Travel Singapore",
    "Raffles Hotel Palm Court",
    "Marina Bay SkyPark",
    "Capella Sentosa",
    "Singapore Private Tours",
    "Singapore Michelin Odette",
    "Singapore Southern Islands Yacht",
    "Singapore Luxury Staycation"
  ],
  authors: [{ name: "Dagsis Tours & Travel Dummy" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-voyanta-bg text-primary font-sans antialiased selection:bg-luxury selection:text-primary">
        <SmoothScroll>
          <CustomCursor />
          {children}
          <Chatbot />
        </SmoothScroll>
      </body>
    </html>
  );
}
