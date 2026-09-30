'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Star, Sparkles, Check, Gift, ArrowRight, Heart } from 'lucide-react';
import Image from 'next/image';
import { EnrichedHotel } from '@/types';
import { useVoyanta } from '@/context/VoyantaContext';

interface HotelsStaysProps {
  hotels: EnrichedHotel[];
  onBookStay: (hotel: EnrichedHotel) => void;
}

export default function HotelsStays({ hotels, onBookStay }: HotelsStaysProps) {
  const { isHotelInWishlist, toggleWishlistHotel, formatPrice, currency } = useVoyanta();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAll, setShowAll] = useState(false);

  const categories = ['All', 'Heritage Grandeur', 'Biophilic Clifftop Sanctuary'];

  const filteredHotels = selectedCategory === 'All'
    ? hotels
    : hotels.filter((h) => h.category === selectedCategory);

  const displayedHotels = showAll ? filteredHotels : filteredHotels.slice(0, 6);

  return (
    <section id="hotels" className="py-24 sm:py-32 bg-voyanta-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-border pb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-mono tracking-wider text-secondary">
              <Building2 className="w-3.5 h-3.5 text-luxury" />
              <span>06 / HOTELS & STAYS</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl text-primary font-normal tracking-tight">
              Sanctuaries of Rare Distinction
            </h2>
            <p className="text-secondary text-base sm:text-lg font-sans leading-relaxed">
              Every accommodation in the Voyanta portfolio (50 certified partner estates) is an architectural masterpiece. We guarantee verified Singapore traveler VIP privileges including room upgrades, private butler service, and late check-outs.
            </p>
          </div>

          {/* Hotel Category Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowAll(false);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-sm border border-primary'
                    : 'bg-white text-secondary hover:text-primary border border-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Hotels Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedHotels.map((hotel, idx) => {
            const isSaved = isHotelInWishlist(hotel.id);

            return (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden border border-border hover:border-luxury/40 shadow-voyanta hover:shadow-voyanta-hover transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image Section */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-black/20" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-primary font-semibold">
                      {hotel.category}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleWishlistHotel(hotel)}
                        className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
                          isSaved
                            ? 'bg-accent text-white scale-110'
                            : 'bg-white/80 text-primary hover:bg-white hover:text-accent'
                        }`}
                        title={isSaved ? 'Remove from Shortlist' : 'Save Hotel'}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                      </button>

                      <div className="flex gap-0.5 bg-primary/80 backdrop-blur-md px-2 py-1 rounded-full">
                        {[...Array(hotel.stars)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-luxury text-luxury" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-mono text-luxury uppercase tracking-wider block">
                      {hotel.destination}, {hotel.country}
                    </span>
                    <h3 className="font-editorial text-2xl font-medium truncate">
                      {hotel.name}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  {/* Quote */}
                  <p className="text-xs font-serif italic text-secondary border-l-2 border-luxury pl-3 py-0.5">
                    &ldquo;{hotel.quote}&rdquo;
                  </p>

                  {/* Exclusive Singapore Perk */}
                  <div className="p-3.5 rounded-xl bg-luxury/10 border border-luxury/20 space-y-1">
                    <div className="flex items-center gap-1.5 text-luxury-dark text-[11px] font-mono uppercase tracking-wider font-semibold">
                      <Gift className="w-3.5 h-3.5" />
                      <span>Voyanta VIP Privilege</span>
                    </div>
                    <p className="text-xs text-primary/90 font-sans leading-tight">
                      {hotel.curatedPerk}
                    </p>
                  </div>

                  {/* Amenities Pill List */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-secondary/60 block">
                      Signature Inclusions
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {hotel.amenities.slice(0, 3).map((amenity, aIdx) => (
                        <span
                          key={aIdx}
                          className="px-2 py-0.5 rounded-md bg-voyanta-bg text-secondary text-[11px] font-mono border border-border"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & Booking Footer */}
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-secondary uppercase block">
                        From / Night
                      </span>
                      <span className="font-editorial text-2xl font-semibold text-primary">
                        {formatPrice(hotel.pricePerNightSGD)}
                      </span>
                      <span className="text-[10px] font-mono text-secondary ml-1">{currency}</span>
                    </div>

                    <button
                      onClick={() => onBookStay(hotel)}
                      className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-light text-white font-display text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Reserve</span>
                      <ArrowRight className="w-3 h-3 text-luxury" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Toggle */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white font-display text-xs uppercase tracking-wider font-semibold transition-all duration-300"
          >
            {showAll ? 'Show Featured 6 Properties' : `Explore All ${filteredHotels.length} Certified Luxury Residences`}
          </button>
        </div>
      </div>
    </section>
  );
}
