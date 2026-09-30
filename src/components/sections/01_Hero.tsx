'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Sparkles, MapPin, Compass, Shield, Plane, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const HERO_SLIDES = [
  {
    title: "Marina Bay & Gardens by the Bay",
    country: "Singapore",
    caption: "Supertrees, SkyPark Horizons & Bayfront Grandeur",
    flight: "18 mins private limousine from Changi T3",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2000&auto=format&fit=crop",
    quote: "Futuristic biophilic architecture, after-hours Cloud Forest mist domes, and sunset yacht cruises."
  },
  {
    title: "Raffles Hotel & Palm Court",
    country: "Singapore",
    caption: "1887 Colonial Grande Dame & 3-Star Michelin Odette",
    flight: "20 mins direct from Changi Airport",
    image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=2000&auto=format&fit=crop",
    quote: "Timeless colonial suites where legends walk, paired with world-class fine dining at the National Gallery."
  },
  {
    title: "Capella Sentosa & Southern Islands",
    country: "Singapore",
    caption: "Rainforest Clifftop Pool Villas & Private Catamaran Haven",
    flight: "25 mins express limousine from Changi",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2000&auto=format&fit=crop",
    quote: "Secluded island rainforest sanctuaries and private catamaran charters to untouched turquoise lagoons."
  },
  {
    title: "Katong & Joo Chiat Heritage",
    country: "Singapore",
    caption: "Pastel Peranakan Shophouses & Heirloom Nyonya Banquets",
    flight: "15 mins direct from Changi Airport",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2000&auto=format&fit=crop",
    quote: "Living heritage, ornate Straits Chinese ceramic tiles, and candlelit dinners at Candlenut."
  }
];

export default function Hero({ onOpenInquiry }: { onOpenInquiry: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-primary text-white">
      {/* Background Slides with Crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover object-center filter brightness-[0.75] contrast-[1.05]"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Sophisticated Editorial Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/30 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-primary/20 to-primary/80" />
      </div>

      {/* Top Editorial Floating Ribbon */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 sm:pt-12 px-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-luxury/20 border border-luxury/40 text-luxury font-mono text-[11px] uppercase tracking-widest font-semibold backdrop-blur-sm">
              Vol. XXIV • Voyanta Singapore Edition
            </span>
            <span className="hidden sm:inline text-white/50 text-xs font-mono">
              The Luxury Singapore Experience Atelier
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-white/70">
            <span className="flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-luxury" />
              Changi Airport VIP Limousine
            </span>
            <span className="text-white/30">•</span>
            <span className="text-luxury">All Prices in SGD</span>
          </div>
        </div>
      </div>

      {/* Main Editorial Hero Typography & Story */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 py-12 sm:py-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          {/* Left Column: Headlines */}
          <div className="lg:col-span-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono tracking-wider text-voyanta-sand"
            >
              <Sparkles className="w-3.5 h-3.5 text-luxury" />
              <span>01 / IMMERSIVE LANDING EXPERIENCE</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="font-editorial text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.05]"
            >
              Curated Journeys Across <span className="italic font-light text-luxury">Singapore</span> and Beyond
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg sm:text-2xl text-voyanta-sand/90 font-sans max-w-2xl font-light leading-relaxed"
            >
              Discover extraordinary destinations, handcrafted itineraries and unforgettable experiences.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-4 flex flex-wrap items-center gap-4"
            >
              <a
                href="#destinations"
                className="px-8 py-4 rounded-full bg-luxury hover:bg-luxury-light text-primary font-display font-semibold text-sm uppercase tracking-wider shadow-voyanta flex items-center gap-3 transition-all duration-300 hover:gap-4 hover:shadow-voyanta-glow"
              >
                <span>Explore Journeys</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenInquiry}
                className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-display font-medium text-sm uppercase tracking-wider backdrop-blur-md border border-white/25 transition-all duration-300 hover:border-luxury"
              >
                Request Custom Itinerary
              </button>
            </motion.div>
          </div>

          {/* Right Column: Active Destination Story Capsule */}
          <div className="lg:col-span-4">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-primary-dark/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-luxury flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" />
                  Featured Enclave
                </span>
                <span className="text-[10px] font-mono text-white/60">
                  {slide.flight}
                </span>
              </div>

              <div>
                <h3 className="font-editorial text-3xl text-white font-medium">
                  {slide.title}
                </h3>
                <p className="text-xs font-sans text-voyanta-sand/70 uppercase tracking-widest mt-0.5">
                  {slide.country}
                </p>
              </div>

              <p className="text-xs font-serif italic text-white/90 border-l-2 border-luxury pl-3 py-0.5">
                &ldquo;{slide.quote}&rdquo;
              </p>

              {/* Destination Slide Selectors */}
              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <div className="flex gap-2">
                  {HERO_SLIDES.map((s, idx) => (
                    <button
                      key={s.title}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentSlide ? 'w-8 bg-luxury' : 'w-2 bg-white/30 hover:bg-white/60'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <a
                  href="#itinerary-builder"
                  className="text-[11px] font-mono text-luxury hover:underline flex items-center gap-1"
                >
                  View Itinerary
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Bar with Pillars */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 pb-8 pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/15 text-white/80">
          <div className="space-y-0.5">
            <span className="font-mono text-xl sm:text-2xl font-semibold text-luxury block">
              100+
            </span>
            <span className="text-xs text-white/70 font-sans block">
              Singapore Luxury Packages
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="font-mono text-xl sm:text-2xl font-semibold text-luxury block">
              50
            </span>
            <span className="text-xs text-white/70 font-sans block">
              Precincts & Islands
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="font-mono text-xl sm:text-2xl font-semibold text-luxury block">
              SIN
            </span>
            <span className="text-xs text-white/70 font-sans block">
              Changi VIP Limousine Meet
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="font-mono text-xl sm:text-2xl font-semibold text-luxury block">
              100%
            </span>
            <span className="text-xs text-white/70 font-sans block">
              Transparent SGD Pricing
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-6">
          <a
            href="#destinations"
            className="flex flex-col items-center gap-1.5 text-white/60 hover:text-luxury transition-colors text-[10px] font-mono tracking-widest uppercase"
          >
            <span>Scroll To Discover</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            >
              <ArrowDown className="w-4 h-4 text-luxury" />
            </motion.div>
          </a>
        </div>
      </div>
    </section>
  );
}
