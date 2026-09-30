'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Sparkles, ShieldCheck, ArrowRight, Check, Heart, Search, SlidersHorizontal, Users, DollarSign, X } from 'lucide-react';
import Image from 'next/image';
import { EnrichedPackage } from '@/types';
import { useVoyanta } from '@/context/VoyantaContext';
import { useScrollLock } from '@/hooks/useScrollLock';

interface FeaturedExperiencesProps {
  packages: EnrichedPackage[];
  onBookPackage: (pkg: EnrichedPackage) => void;
  onViewItinerary: (itineraryId: string) => void;
}

export default function FeaturedExperiences({
  packages,
  onBookPackage,
  onViewItinerary,
}: FeaturedExperiencesProps) {
  const { isPackageInWishlist, toggleWishlistPackage, formatPrice, currency } = useVoyanta();

  // Dynamic filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [selectedDuration, setSelectedDuration] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'days'>('featured');
  const [maxBudget, setMaxBudget] = useState<number>(3500);
  const [showAllPackages, setShowAllPackages] = useState(false);

  // Quick Calculator Modal state
  const [customizingPkg, setCustomizingPkg] = useState<EnrichedPackage | null>(null);
  useScrollLock(Boolean(customizingPkg));
  const [guestCount, setGuestCount] = useState<number>(2);
  const [addonLimousine, setAddonLimousine] = useState(true);
  const [addonMichelin, setAddonMichelin] = useState(false);
  const [addonYacht, setAddonYacht] = useState(false);

  const styles = ['All', 'Luxury', 'Cultural', 'Food & Wine', 'Island Escapes', 'Wellness', 'Adventure'];

  // Filter & sort logic
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const matchesSearch =
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStyle = selectedStyle === 'All' || pkg.travelStyle === selectedStyle;

      const matchesDuration =
        selectedDuration === 'All' ||
        (selectedDuration === 'short' && pkg.days <= 4) ||
        (selectedDuration === 'medium' && pkg.days >= 5 && pkg.days <= 7) ||
        (selectedDuration === 'long' && pkg.days >= 8);

      const matchesBudget = pkg.price_sgd <= maxBudget;

      return matchesSearch && matchesStyle && matchesDuration && matchesBudget;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price_sgd - b.price_sgd;
      if (sortBy === 'price-desc') return b.price_sgd - a.price_sgd;
      if (sortBy === 'days') return a.days - b.days;
      return 0; // default featured
    });
  }, [packages, searchQuery, selectedStyle, selectedDuration, sortBy, maxBudget]);

  const displayedPackages = showAllPackages ? filteredPackages : filteredPackages.slice(0, 6);

  // Calculation for customizing package
  const calculatedCustomTotalSGD = useMemo(() => {
    if (!customizingPkg) return 0;
    let base = customizingPkg.price_sgd * guestCount;
    if (addonLimousine) base += 350;
    if (addonMichelin) base += 680 * guestCount;
    if (addonYacht) base += 1200;
    return base;
  }, [customizingPkg, guestCount, addonLimousine, addonMichelin, addonYacht]);

  return (
    <section id="experiences" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 border-b border-border pb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-mono tracking-wider text-accent">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>03 / FEATURED TRAVEL EXPERIENCES</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl text-primary font-normal tracking-tight">
              Singapore Bespoke Anthology
            </h2>
            <p className="text-secondary text-base sm:text-lg font-sans leading-relaxed">
              Dynamically filter our 100 certified Singapore voyages. Every experience includes 5-star colonial or clifftop residences, private limousine chauffeurs, and dedicated concierge coordination.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-secondary uppercase tracking-widest block">
              Active Archive
            </span>
            <span className="font-editorial text-2xl text-primary font-medium">
              {filteredPackages.length} Voyages Available
            </span>
          </div>
        </div>

        {/* Dynamic Interactive Filter & Search Control Center */}
        <div className="bg-voyanta-bg border border-border p-6 rounded-3xl shadow-sm mb-12 space-y-6">
          {/* Top row: Search input, Duration filter, Sort by */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input (5 Cols) */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-secondary/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search packages by name, precinct, or keywords..."
                className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl text-xs font-sans text-primary focus:outline-none focus:border-luxury border border-voyanta-border transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/40 hover:text-primary text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Duration Filter (3 Cols) */}
            <div className="md:col-span-4">
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full bg-white px-3.5 py-2.5 rounded-xl text-xs font-sans text-primary border border-voyanta-border focus:outline-none focus:border-luxury cursor-pointer"
              >
                <option value="All">All Durations (3 - 12 Days)</option>
                <option value="short">Short Escapes (3 - 4 Days)</option>
                <option value="medium">Immersive Journeys (5 - 7 Days)</option>
                <option value="long">Grand Residencies (8+ Days)</option>
              </select>
            </div>

            {/* Sort by (3 Cols) */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-white px-3.5 py-2.5 rounded-xl text-xs font-sans text-primary border border-voyanta-border focus:outline-none focus:border-luxury cursor-pointer"
              >
                <option value="featured">Sort: Curated Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="days">Duration: Shortest First</option>
              </select>
            </div>
          </div>

          {/* Bottom row: Style pills + Interactive Budget Slider */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4 border-t border-border">
            {/* Style Pills */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] font-mono uppercase text-secondary/60 mr-1 hidden sm:inline">
                Style:
              </span>
              {styles.map((style) => (
                <button
                  key={style}
                  onClick={() => {
                    setSelectedStyle(style);
                    setShowAllPackages(false);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                    selectedStyle === style
                      ? 'bg-primary text-white shadow-sm border border-primary'
                      : 'bg-white text-secondary hover:text-primary hover:border-luxury border border-voyanta-border'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>

            {/* Interactive Price Budget Slider */}
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-border shrink-0">
              <span className="text-[10px] font-mono uppercase text-secondary/70 whitespace-nowrap">
                Max Budget:
              </span>
              <input
                type="range"
                min="800"
                max="3500"
                step="50"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-28 sm:w-36 accent-primary cursor-pointer"
              />
              <span className="font-mono text-xs font-semibold text-primary whitespace-nowrap">
                {formatPrice(maxBudget)}
              </span>
            </div>
          </div>
        </div>

        {/* Results Counter if filtered */}
        {(searchQuery || selectedStyle !== 'All' || selectedDuration !== 'All' || maxBudget < 3500) && (
          <div className="mb-6 flex items-center justify-between text-xs font-mono text-secondary">
            <span>
              Matching: <strong className="text-primary">{filteredPackages.length}</strong> of 100 packages
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStyle('All');
                setSelectedDuration('All');
                setMaxBudget(3500);
                setSortBy('featured');
              }}
              className="text-accent hover:underline text-[11px]"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Storytelling Cards (Editorial Magazine Spreads) */}
        {filteredPackages.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-voyanta-bg rounded-3xl border border-border">
            <h4 className="font-editorial text-2xl text-primary font-medium">
              No Voyages Match Your Criteria
            </h4>
            <p className="text-xs text-secondary font-sans max-w-sm mx-auto">
              Try adjusting your search terms or increasing your budget slider to discover available Singapore journeys.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {displayedPackages.map((pkg, idx) => {
              const isReversed = idx % 2 === 1;
              const isSaved = isPackageInWishlist(pkg.id);

              return (
                <motion.article
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6 }}
                  className="group rounded-3xl bg-voyanta-bg border border-border hover:border-luxury/40 p-6 sm:p-8 lg:p-10 shadow-voyanta hover:shadow-voyanta-hover transition-all duration-500 overflow-hidden"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Visual Story Window (5 Cols) */}
                    <div className={`lg:col-span-5 relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-md ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                      <Image
                        src={pkg.heroImage}
                        alt={pkg.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-black/20" />

                      {/* Top Floating Badge & Wishlist Heart */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-primary font-semibold shadow-sm">
                          {pkg.travelStyle}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleWishlistPackage(pkg)}
                            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
                              isSaved
                                ? 'bg-accent text-white scale-110'
                                : 'bg-white/80 text-primary hover:bg-white hover:text-accent'
                            }`}
                            title={isSaved ? 'Remove from Shortlist' : 'Save to Shortlist'}
                          >
                            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                          </button>

                          <span className="px-3 py-1 rounded-full bg-primary/90 text-luxury text-[10px] font-mono uppercase tracking-wider backdrop-blur-md">
                            {pkg.availability}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Duration & Code */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                        <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">
                          <Clock className="w-3.5 h-3.5 text-luxury" />
                          {pkg.days} Days / {pkg.days - 1} Nights
                        </span>
                        <span className="text-luxury bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">
                          {pkg.id}
                        </span>
                      </div>
                    </div>

                    {/* Story Details (7 Cols) */}
                    <div className={`lg:col-span-7 space-y-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-xs font-mono text-secondary">
                          <span className="uppercase tracking-widest text-accent font-semibold">{pkg.destination}</span>
                          <span>•</span>
                          <span>{pkg.country}</span>
                          <span>•</span>
                          <span>{pkg.groupSize}</span>
                        </div>

                        <h3 className="font-editorial text-3xl sm:text-4xl text-primary font-medium tracking-tight">
                          {pkg.name}
                        </h3>
                      </div>

                      {/* Key Highlights */}
                      <div className="space-y-2.5 pt-1">
                        <h4 className="text-[11px] font-mono uppercase tracking-wider text-secondary/70">
                          Curated Journey Highlights
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {pkg.highlights.map((highlight, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2 text-xs text-primary/90">
                              <Check className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                              <span className="leading-tight">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing & Booking Card Strip */}
                      <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-secondary block">
                            All-Inclusive Singapore Odyssey
                          </span>
                          <div className="flex items-baseline gap-2 mt-0.5">
                            <span className="font-editorial text-3xl sm:text-4xl font-semibold text-primary">
                              {formatPrice(pkg.price_sgd)}
                            </span>
                            <span className="text-xs font-mono text-secondary">
                              {currency} / Person (Twin-Share)
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <button
                            onClick={() => onViewItinerary(pkg.itineraryId)}
                            className="px-4 py-2.5 rounded-xl border border-secondary text-secondary hover:text-primary hover:border-primary text-xs font-mono uppercase tracking-wider transition-colors"
                          >
                            Timeline
                          </button>

                          <button
                            onClick={() => setCustomizingPkg(pkg)}
                            className="px-4 py-2.5 rounded-xl bg-white border border-border text-primary hover:border-luxury text-xs font-mono uppercase tracking-wider transition-colors"
                          >
                            Customize
                          </button>

                          <button
                            onClick={() => onBookPackage(pkg)}
                            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-display text-xs uppercase tracking-wider font-semibold shadow-voyanta flex items-center gap-2 transition-all duration-300"
                          >
                            <span>Reserve</span>
                            <ArrowRight className="w-3.5 h-3.5 text-luxury" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {filteredPackages.length > 6 && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setShowAllPackages(!showAllPackages)}
              className="px-8 py-3.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white font-display text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-sm"
            >
              {showAllPackages ? 'Show Featured 6 Packages' : `Browse All ${filteredPackages.length} Available Packages`}
            </button>
          </div>
        )}
      </div>

      {/* Interactive Customize & Price Calculator Modal */}
      <AnimatePresence>
        {customizingPkg && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain"
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCustomizingPkg(null)}
              className="fixed inset-0 bg-primary/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-border overflow-hidden z-10 my-8 p-6 sm:p-8 overscroll-contain"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
                    Dynamic Itinerary Calculator
                  </span>
                  <h4 className="font-editorial text-2xl text-primary font-medium mt-0.5">
                    {customizingPkg.name}
                  </h4>
                </div>
                <button
                  onClick={() => setCustomizingPkg(null)}
                  className="p-1 rounded-full text-secondary hover:text-primary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Calculator Controls */}
              <div className="py-6 space-y-5 text-xs font-sans">
                {/* Number of Travelers */}
                <div>
                  <label className="block font-mono uppercase text-secondary/70 text-[10px] tracking-wider mb-2">
                    Party Size (Travelers)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 4, 8].map((num) => (
                      <button
                        key={num}
                        onClick={() => setGuestCount(num)}
                        className={`py-2 rounded-xl font-mono text-xs border transition-all ${
                          guestCount === num
                            ? 'bg-primary text-white border-primary shadow-xs font-semibold'
                            : 'bg-voyanta-bg text-secondary border-border hover:border-luxury'
                        }`}
                      >
                        {num} {num === 1 ? 'Solo' : `${num} Guests`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* VIP Add-ons Checkboxes */}
                <div className="space-y-2.5">
                  <span className="block font-mono uppercase text-secondary/70 text-[10px] tracking-wider">
                    Exclusive Singapore Upgrades
                  </span>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-voyanta-bg border border-border cursor-pointer hover:border-luxury/40 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={addonLimousine}
                        onChange={(e) => setAddonLimousine(e.target.checked)}
                        className="rounded accent-primary w-4 h-4 cursor-pointer"
                      />
                      <span className="text-primary font-medium">Changi VIP Tarmac Maybach Limousine</span>
                    </div>
                    <span className="font-mono text-secondary font-semibold">
                      +{formatPrice(350)}
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-voyanta-bg border border-border cursor-pointer hover:border-luxury/40 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={addonMichelin}
                        onChange={(e) => setAddonMichelin(e.target.checked)}
                        className="rounded accent-primary w-4 h-4 cursor-pointer"
                      />
                      <span className="text-primary font-medium">3-Star Michelin Odette Private Table Buyout</span>
                    </div>
                    <span className="font-mono text-secondary font-semibold">
                      +{formatPrice(680 * guestCount)}
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-voyanta-bg border border-border cursor-pointer hover:border-luxury/40 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={addonYacht}
                        onChange={(e) => setAddonYacht(e.target.checked)}
                        className="rounded accent-primary w-4 h-4 cursor-pointer"
                      />
                      <span className="text-primary font-medium">Southern Islands 50ft Catamaran Sunset Cruise</span>
                    </div>
                    <span className="font-mono text-secondary font-semibold">
                      +{formatPrice(1200)}
                    </span>
                  </label>
                </div>

                {/* Total Calculated Live */}
                <div className="p-4 rounded-2xl bg-luxury/10 border border-luxury/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-luxury-dark tracking-wider block">
                      Live Calculated Price ({currency})
                    </span>
                    <span className="font-editorial text-3xl text-primary font-semibold">
                      {formatPrice(calculatedCustomTotalSGD)}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-secondary">
                    for {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'} all-in
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    const customTitle = `${customizingPkg.name} [Custom: ${guestCount} Guests, Limousine:${addonLimousine}, Odette:${addonMichelin}, Yacht:${addonYacht} - Total: ${formatPrice(calculatedCustomTotalSGD)}]`;
                    setCustomizingPkg(null);
                    onBookPackage({
                      ...customizingPkg,
                      name: customTitle,
                    });
                  }}
                  className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-light text-white font-display text-xs uppercase tracking-wider font-semibold shadow-voyanta flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-luxury" />
                  <span>Reserve This Customized Voyage</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
