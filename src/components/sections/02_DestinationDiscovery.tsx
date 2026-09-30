'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plane, Sun, Star, ArrowUpRight, Compass, Filter, Sparkles, X } from 'lucide-react';
import Image from 'next/image';
import { EnrichedDestination } from '@/types';
import { useScrollLock } from '@/hooks/useScrollLock';

interface DestinationDiscoveryProps {
  destinations: EnrichedDestination[];
  onSelectDestination: (destName: string) => void;
}

export default function DestinationDiscovery({
  destinations,
  onSelectDestination
}: DestinationDiscoveryProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [activeModalDest, setActiveModalDest] = useState<EnrichedDestination | null>(null);
  useScrollLock(Boolean(activeModalDest));

  const regions = ['All', 'Marina & Downtown', 'Heritage Enclaves', 'Sentosa & Islands', 'Greenery & Wildlife'];

  const filteredDestinations = selectedRegion === 'All'
    ? destinations
    : destinations.filter(d => d.region === selectedRegion);

  const [showAll, setShowAll] = useState(false);
  const displayedDestinations = showAll ? filteredDestinations : filteredDestinations.slice(0, 8);

  return (
    <section id="destinations" className="py-24 sm:py-32 bg-voyanta-bg relative overflow-hidden">
      {/* Background Subtle Editorial Watermark */}
      <div className="absolute top-12 right-0 text-[18vw] font-editorial text-primary/[0.02] select-none pointer-events-none leading-none -mr-16">
        SINGAPORE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-border pb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-mono tracking-wider text-secondary">
              <Compass className="w-3.5 h-3.5 text-luxury" />
              <span>02 / DESTINATION DISCOVERY</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl text-primary font-normal tracking-tight">
              Singapore Enclaves & Island Terroirs
            </h2>
            <p className="text-secondary text-base sm:text-lg font-sans leading-relaxed">
              Drawn from our active archive of 50 Singapore precincts, coastal islands, and heritage conservation quarters. From futuristic Supertree canopies to colonial Palm Court sanctuaries and untouched Southern Island lagoons.
            </p>
          </div>

          {/* Region Filter Buttons */}
          <div className="flex flex-wrap gap-2 items-center">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => {
                  setSelectedRegion(region);
                  setShowAll(false);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  selectedRegion === region
                    ? 'bg-primary text-white shadow-voyanta border border-primary'
                    : 'bg-white text-secondary hover:text-primary hover:border-luxury border border-voyanta-border'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid - Editorial Asymmetrical Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedDestinations.map((dest, idx) => {
            const isFeatured = idx === 0 || idx === 5;
            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
                className={`group relative rounded-2xl overflow-hidden bg-white border border-border hover:border-luxury/50 shadow-voyanta hover:shadow-voyanta-hover transition-all duration-500 flex flex-col justify-between ${
                  isFeatured ? 'md:col-span-2 md:row-span-1' : ''
                }`}
              >
                {/* Image Section */}
                <div className={`relative w-full overflow-hidden ${isFeatured ? 'h-72 sm:h-80' : 'h-64'}`}>
                  <Image
                    src={dest.heroImage}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-primary font-semibold shadow-sm">
                      {dest.region}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md text-[10px] font-mono text-luxury flex items-center gap-1">
                      <Star className="w-3 h-3 fill-luxury text-luxury" />
                      {dest.rating}
                    </span>
                  </div>

                  {/* Limousine Transfer Pill */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1.5 font-mono text-[11px] bg-primary-dark/70 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      <Plane className="w-3 h-3 text-luxury" />
                      {dest.flightFromSingapore}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-secondary/80 font-mono mb-1">
                      <span>{dest.country}</span>
                      <span className="text-[10px] text-luxury">{dest.id}</span>
                    </div>

                    <h3 className="font-editorial text-2xl text-primary font-medium group-hover:text-accent transition-colors">
                      {dest.name}
                    </h3>

                    <p className="text-xs text-secondary/90 font-serif italic mt-1 line-clamp-1">
                      {dest.tagline}
                    </p>

                    <p className="text-xs text-secondary font-sans mt-2.5 line-clamp-2 leading-relaxed">
                      {dest.description}
                    </p>
                  </div>

                  {/* Best time & Action */}
                  <div className="pt-3 border-t border-voyanta-border flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[11px] text-secondary font-mono">
                      <Sun className="w-3.5 h-3.5 text-luxury" />
                      <span className="truncate max-w-[130px]">{dest.bestTimeToVisit.split('(')[0]}</span>
                    </div>

                    <button
                      onClick={() => setActiveModalDest(dest)}
                      className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-primary group-hover:text-accent font-semibold transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
            className="px-8 py-3.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white font-display text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-sm"
          >
            {showAll ? 'Show Fewer Enclaves' : `View All ${filteredDestinations.length} Curated Singapore Enclaves`}
          </button>
        </div>
      </div>

      {/* Destination Detail Modal */}
      <AnimatePresence>
        {activeModalDest && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain"
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalDest(null)}
              className="fixed inset-0 bg-primary/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-voyanta-border my-8"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
            >
              <div className="relative h-72 sm:h-96 w-full shrink-0">
                <Image
                  src={activeModalDest.heroImage}
                  alt={activeModalDest.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                <button
                  onClick={() => setActiveModalDest(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                  aria-label="Close detail"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-mono uppercase tracking-widest text-luxury">
                    {activeModalDest.country} • {activeModalDest.region}
                  </span>
                  <h3 className="font-editorial text-4xl sm:text-5xl font-medium mt-1">
                    {activeModalDest.name}
                  </h3>
                  <p className="font-serif italic text-white/90 text-sm mt-1">
                    {activeModalDest.tagline}
                  </p>
                </div>
              </div>

              <div
                className="p-6 sm:p-8 space-y-6 max-h-[50vh] overflow-y-auto overscroll-contain"
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
              >
                <p className="text-secondary leading-relaxed font-sans text-sm sm:text-base">
                  {activeModalDest.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-voyanta-bg border border-voyanta-border text-xs">
                  <div>
                    <span className="font-mono uppercase text-secondary/60 text-[10px] block">Changi Limousine:</span>
                    <span className="font-semibold text-primary mt-1 block">{activeModalDest.flightFromSingapore}</span>
                  </div>
                  <div>
                    <span className="font-mono uppercase text-secondary/60 text-[10px] block">Prime Season:</span>
                    <span className="font-semibold text-primary mt-1 block">{activeModalDest.bestTimeToVisit}</span>
                  </div>
                  <div>
                    <span className="font-mono uppercase text-secondary/60 text-[10px] block">Climate & Microclimate:</span>
                    <span className="font-semibold text-primary mt-1 block">{activeModalDest.climate}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-primary mb-2 font-medium">
                    Curated Signature Experiences
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalDest.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-mono border border-primary/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-voyanta-border">
                  <span className="text-xs font-mono text-secondary">
                    Dataset Code: <strong className="text-primary">{activeModalDest.id}</strong>
                  </span>
                  <button
                    onClick={() => {
                      onSelectDestination(activeModalDest.name);
                      setActiveModalDest(null);
                    }}
                    className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-display text-xs uppercase tracking-wider font-semibold shadow-voyanta flex items-center gap-2"
                  >
                    <span>Request Itinerary for {activeModalDest.name.split('&')[0]}</span>
                    <ArrowUpRight className="w-4 h-4 text-luxury" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
