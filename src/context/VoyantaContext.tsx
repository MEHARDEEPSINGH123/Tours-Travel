'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { EnrichedPackage, EnrichedHotel, EnrichedDestination } from '@/types';

type Currency = 'SGD' | 'USD' | 'EUR' | 'GBP' | 'AUD' | 'JPY';

interface CurrencyRate {
  rate: number;
  symbol: string;
}

const CURRENCY_RATES: Record<Currency, CurrencyRate> = {
  SGD: { rate: 1.0, symbol: 'S$' },
  USD: { rate: 0.74, symbol: '$' },
  EUR: { rate: 0.69, symbol: '€' },
  GBP: { rate: 0.59, symbol: '£' },
  AUD: { rate: 1.14, symbol: 'A$' },
  JPY: { rate: 114.5, symbol: '¥' },
};

interface VoyantaContextType {
  // Wishlist
  wishlist: EnrichedPackage[];
  savedHotels: EnrichedHotel[];
  toggleWishlistPackage: (pkg: EnrichedPackage) => void;
  isPackageInWishlist: (id: string) => boolean;
  toggleWishlistHotel: (hotel: EnrichedHotel) => void;
  isHotelInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  wishlistDrawerOpen: boolean;
  setWishlistDrawerOpen: (open: boolean) => void;

  // Currency
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  formatPrice: (amountSGD: number) => string;

  // Global Search Modal
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;

  // Active Booking Dossier
  activeDossierPackage: EnrichedPackage | null;
  setActiveDossierPackage: (pkg: EnrichedPackage | null) => void;
}

const VoyantaContext = createContext<VoyantaContextType | undefined>(undefined);

export function VoyantaProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<EnrichedPackage[]>([]);
  const [savedHotels, setSavedHotels] = useState<EnrichedHotel[]>([]);
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>('SGD');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeDossierPackage, setActiveDossierPackage] = useState<EnrichedPackage | null>(null);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('voyanta_wishlist');
      if (saved) setWishlist(JSON.parse(saved));
      const savedH = localStorage.getItem('voyanta_saved_hotels');
      if (savedH) setSavedHotels(JSON.parse(savedH));
      const savedCur = localStorage.getItem('voyanta_currency') as Currency;
      if (savedCur && CURRENCY_RATES[savedCur]) setCurrency(savedCur);
    } catch {
      // Ignore in SSR
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('voyanta_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('voyanta_saved_hotels', JSON.stringify(savedHotels));
    } catch {}
  }, [savedHotels]);

  useEffect(() => {
    try {
      localStorage.setItem('voyanta_currency', currency);
    } catch {}
  }, [currency]);

  // Wishlist toggle methods
  const toggleWishlistPackage = (pkg: EnrichedPackage) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === pkg.id);
      if (exists) {
        return prev.filter((item) => item.id !== pkg.id);
      } else {
        return [...prev, pkg];
      }
    });
  };

  const isPackageInWishlist = (id: string) => wishlist.some((item) => item.id === id);

  const toggleWishlistHotel = (hotel: EnrichedHotel) => {
    setSavedHotels((prev) => {
      const exists = prev.some((item) => item.id === hotel.id);
      if (exists) {
        return prev.filter((item) => item.id !== hotel.id);
      } else {
        return [...prev, hotel];
      }
    });
  };

  const isHotelInWishlist = (id: string) => savedHotels.some((item) => item.id === id);

  const clearWishlist = () => {
    setWishlist([]);
    setSavedHotels([]);
  };

  // Dynamic price formatter
  const formatPrice = (amountSGD: number): string => {
    const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.SGD;
    const converted = amountSGD * rateInfo.rate;
    if (currency === 'JPY') {
      return `${rateInfo.symbol}${Math.round(converted).toLocaleString('en-US')}`;
    }
    return `${rateInfo.symbol}${Math.round(converted).toLocaleString('en-US')}`;
  };

  // Global keyboard shortcut: Cmd+K / Ctrl+K opens search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <VoyantaContext.Provider
      value={{
        wishlist,
        savedHotels,
        toggleWishlistPackage,
        isPackageInWishlist,
        toggleWishlistHotel,
        isHotelInWishlist,
        clearWishlist,
        wishlistDrawerOpen,
        setWishlistDrawerOpen,
        currency,
        setCurrency,
        formatPrice,
        searchModalOpen,
        setSearchModalOpen,
        activeDossierPackage,
        setActiveDossierPackage,
      }}
    >
      {children}
    </VoyantaContext.Provider>
  );
}

export function useVoyanta() {
  const context = useContext(VoyantaContext);
  if (!context) {
    throw new Error('useVoyanta must be used within a VoyantaProvider');
  }
  return context;
}
