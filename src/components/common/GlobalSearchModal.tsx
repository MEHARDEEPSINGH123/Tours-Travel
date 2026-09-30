'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Building2, Package, Sparkles, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useVoyanta } from '@/context/VoyantaContext';
import { packages, destinations, hotels, recommendations } from '@/lib/dataset';
import { useScrollLock } from '@/hooks/useScrollLock';

interface GlobalSearchModalProps {
  onSelectPackage: (pkgTitle: string) => void;
  onSelectDestination: (destName: string) => void;
}

export default function GlobalSearchModal({
  onSelectPackage,
  onSelectDestination,
}: GlobalSearchModalProps) {
  const { searchModalOpen, setSearchModalOpen, formatPrice } = useVoyanta();
  useScrollLock(searchModalOpen);
  const [query, setQuery] = useState('');

  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return {
        matchedPackages: packages.slice(0, 3),
        matchedDestinations: destinations.slice(0, 3),
        matchedHotels: hotels.slice(0, 3),
        matchedRecs: recommendations.slice(0, 3),
      };
    }

    const q = query.toLowerCase();

    return {
      matchedPackages: packages
        .filter((p) => p.name.toLowerCase().includes(q) || p.destination.toLowerCase().includes(q) || p.travelStyle.toLowerCase().includes(q))
        .slice(0, 5),
      matchedDestinations: destinations
        .filter((d) => d.name.toLowerCase().includes(q) || d.region.toLowerCase().includes(q) || d.tagline.toLowerCase().includes(q))
        .slice(0, 4),
      matchedHotels: hotels
        .filter((h) => h.name.toLowerCase().includes(q) || h.destination.toLowerCase().includes(q))
        .slice(0, 4),
      matchedRecs: recommendations
        .filter((r) => r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q) || r.destination.toLowerCase().includes(q))
        .slice(0, 4),
    };
  }, [query]);

  const hasAnyResults =
    filteredResults.matchedPackages.length > 0 ||
    filteredResults.matchedDestinations.length > 0 ||
    filteredResults.matchedHotels.length > 0 ||
    filteredResults.matchedRecs.length > 0;

  return (
    <AnimatePresence>
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 overflow-y-auto overscroll-contain"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchModalOpen(false)}
            className="fixed inset-0 bg-primary/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-border overflow-hidden z-10"
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-border flex items-center gap-3 bg-voyanta-bg shrink-0">
              <Search className="w-5 h-5 text-secondary shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Singapore packages, Marina Bay, Raffles, Michelin dining, yacht charters..."
                className="w-full bg-transparent text-sm sm:text-base text-primary font-sans focus:outline-none placeholder:text-secondary/50"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-full text-secondary/50 hover:text-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-white text-[10px] font-mono text-secondary border border-border shadow-2xs">
                ESC
              </kbd>
            </div>

            {/* Results Container */}
            <div
              className="max-h-[60vh] overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-6"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
            >
              {!hasAnyResults ? (
                <div className="py-12 text-center text-xs text-secondary font-mono">
                  No matching Singapore experiences found for &ldquo;{query}&rdquo;.
                </div>
              ) : (
                <>
                  {/* Packages */}
                  {filteredResults.matchedPackages.length > 0 && (
                    <div className="space-y-2.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-secondary/70 flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-accent" />
                        Packages & Journeys
                      </span>
                      <div className="grid grid-cols-1 gap-2">
                        {filteredResults.matchedPackages.map((pkg) => (
                          <div
                            key={pkg.id}
                            onClick={() => {
                              setSearchModalOpen(false);
                              onSelectPackage(`${pkg.name} (${pkg.id})`);
                            }}
                            className="p-3 rounded-xl hover:bg-voyanta-bg border border-transparent hover:border-border transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                                <Image
                                  src={pkg.heroImage}
                                  alt={pkg.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="truncate">
                                <h5 className="font-editorial text-base text-primary font-medium group-hover:text-accent truncate transition-colors">
                                  {pkg.name}
                                </h5>
                                <span className="text-[11px] font-mono text-secondary flex items-center gap-1.5">
                                  <MapPin className="w-3 h-3 text-luxury" />
                                  {pkg.destination} • {pkg.days} Days
                                </span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="font-mono text-xs font-semibold text-primary block">
                                {formatPrice(pkg.price_sgd)}
                              </span>
                              <span className="text-[10px] font-mono text-secondary/60">
                                {pkg.travelStyle}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Destinations */}
                  {filteredResults.matchedDestinations.length > 0 && (
                    <div className="space-y-2.5 pt-2 border-t border-voyanta-border">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-secondary/70 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-luxury" />
                        Singapore Precincts & Islands
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {filteredResults.matchedDestinations.map((dest) => (
                          <div
                            key={dest.id}
                            onClick={() => {
                              setSearchModalOpen(false);
                              onSelectDestination(dest.name);
                            }}
                            className="p-3 rounded-xl hover:bg-voyanta-bg border border-transparent hover:border-border transition-colors cursor-pointer flex items-center gap-3 group"
                          >
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                              <Image
                                src={dest.heroImage}
                                alt={dest.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="truncate">
                              <h5 className="font-editorial text-sm text-primary font-medium group-hover:text-accent truncate transition-colors">
                                {dest.name}
                              </h5>
                              <span className="text-[10px] font-mono text-secondary/70 block truncate">
                                {dest.region}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hotels */}
                  {filteredResults.matchedHotels.length > 0 && (
                    <div className="space-y-2.5 pt-2 border-t border-voyanta-border">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-secondary/70 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-primary" />
                        Luxury Residences & Stays
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {filteredResults.matchedHotels.map((hotel) => (
                          <div
                            key={hotel.id}
                            onClick={() => {
                              setSearchModalOpen(false);
                              onSelectPackage(`Stay at ${hotel.name}`);
                            }}
                            className="p-3 rounded-xl hover:bg-voyanta-bg border border-transparent hover:border-border transition-colors cursor-pointer flex items-center justify-between gap-2 group"
                          >
                            <div className="truncate">
                              <h5 className="font-editorial text-sm text-primary font-medium group-hover:text-accent truncate transition-colors">
                                {hotel.name}
                              </h5>
                              <span className="text-[10px] font-mono text-secondary/70 block truncate">
                                {hotel.destination}
                              </span>
                            </div>
                            <span className="font-mono text-xs font-semibold text-primary shrink-0">
                              {formatPrice(hotel.pricePerNightSGD)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Quick Footer Hints */}
            <div className="p-3 bg-voyanta-bg border-t border-border flex items-center justify-between text-[11px] font-mono text-secondary/70">
              <span>Press ESC to close</span>
              <span>100 Packages • 50 Destinations • 50 Hotels</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
