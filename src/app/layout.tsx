import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";
import CustomCursor from "@/components/common/CustomCursor";

export const metadata: Metadata = {
  title: "Voyanta — Curated Journeys Across Singapore | Luxury Travel Atelier",
  description:
    "Discover extraordinary Singapore enclaves, handcrafted luxury itineraries, and unforgettable experiences. Singapore-based luxury travel atelier offering bespoke private voyages in SGD with Changi VIP coordination.",
  keywords: [
    "Voyanta",
    "Luxury Travel Singapore",
    "Raffles Hotel Palm Court",
    "Marina Bay SkyPark",
    "Capella Sentosa",
    "Singapore Private Tours",
    "Singapore Michelin Odette",
    "Singapore Southern Islands Yacht",
    "Singapore Luxury Staycation"
  ],
  authors: [{ name: "Voyanta Singapore" }],
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
        </SmoothScroll>
      </body>
    </html>
  );
}
