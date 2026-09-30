'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareQuote, Star, CheckCircle2, ChevronLeft, ChevronRight, MapPin, Quote } from 'lucide-react';
import Image from 'next/image';
import { EnrichedReview } from '@/types';

interface ReviewsStoriesProps {
  reviews: EnrichedReview[];
}

function ReviewerAvatar({ src, name }: { src: string; name: string }) {
  const [error, setError] = useState(false);

  const initials = name
    .split(' ')
    .filter((n) => n.length > 0 && n[0].match(/[a-zA-Z]/))
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('') || 'VIP';

  return (
    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-luxury/40 bg-primary flex items-center justify-center shrink-0 shadow-sm">
      {!error && src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="56px"
          className="object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-primary to-primary-light text-luxury flex items-center justify-center font-editorial font-bold text-lg select-none">
          {initials}
        </div>
      )}
    </div>
  );
}

export default function ReviewsStories({ reviews }: ReviewsStoriesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // We display the top testimonials in a large editorial spread, plus an interactive review cards strip
  const spotlightReviews = reviews.slice(0, 6);
  const activeReview = spotlightReviews[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % spotlightReviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + spotlightReviews.length) % spotlightReviews.length);
  };

  return (
    <section id="reviews" className="py-24 sm:py-32 bg-voyanta-bg relative overflow-hidden">
      {/* Decorative Quote Mark */}
      <div className="absolute top-12 left-10 text-[25vw] font-editorial text-primary/[0.02] select-none pointer-events-none leading-none">
        &ldquo;
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-border pb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-mono tracking-wider text-secondary">
              <MessageSquareQuote className="w-3.5 h-3.5 text-luxury" />
              <span>11 / REVIEWS & STORIES</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl text-primary font-normal tracking-tight">
              Testimonials of Transcendent Travel
            </h2>
            <p className="text-secondary text-base sm:text-lg font-sans leading-relaxed">
              Drawn from 200 verified Singapore resident journeys. Read firsthand accounts of bespoke Kaiseki buyouts in Kyoto, helicopter landings in Zermatt, and seamless door-to-door Changi transfers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-border bg-white text-primary hover:bg-primary hover:text-white transition-colors shadow-sm"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-border bg-white text-primary hover:bg-primary hover:text-white transition-colors shadow-sm"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Large Editorial Spotlight Testimonial */}
        {activeReview && (
          <div className="bg-white rounded-3xl border border-border shadow-voyanta p-8 sm:p-12 lg:p-16 mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left: Star rating & Quote */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center gap-1">
                    {[...Array(activeReview.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-luxury text-luxury" />
                    ))}
                    <span className="ml-2 text-xs font-mono text-secondary">
                      5.0 Verified Voyage • {activeReview.id}
                    </span>
                  </div>

                  <blockquote className="font-editorial text-2xl sm:text-4xl lg:text-5xl text-primary font-normal leading-tight tracking-tight">
                    &ldquo;{activeReview.comment}&rdquo;
                  </blockquote>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-secondary">
                    <span className="flex items-center gap-1 text-primary font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      {activeReview.residentialDistrict}
                    </span>
                    <span>•</span>
                    <span className="text-secondary/70">Journey: {activeReview.destinationTraveled}</span>
                    <span>•</span>
                    <span className="text-secondary/60">{activeReview.date}</span>
                  </div>
                </div>

                {/* Right: Author Capsule */}
                <div className="lg:col-span-4 bg-voyanta-bg rounded-2xl p-6 border border-border space-y-4">
                  <div className="flex items-center gap-4">
                    <ReviewerAvatar
                      src={activeReview.avatar}
                      name={activeReview.author}
                    />
                    <div>
                      <h4 className="font-editorial text-xl font-medium text-primary">
                        {activeReview.author}
                      </h4>
                      <span className="text-xs font-mono text-secondary/70 block">
                        {activeReview.residentialDistrict}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-voyanta-border flex items-center gap-2 text-xs text-secondary font-mono">
                    <CheckCircle2 className="w-4 h-4 text-secondary-light shrink-0" />
                    <span>Verified Singapore Changi Departure</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Small Review Tiles Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spotlightReviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-luxury-dark">{rev.id}</span>
                  <div className="flex gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-luxury text-luxury" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-secondary leading-relaxed line-clamp-3 font-sans">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-voyanta-border flex items-center justify-between text-[11px] font-mono text-secondary">
                <span className="font-semibold text-primary">{rev.author}</span>
                <span className="text-secondary/60">{rev.residentialDistrict.split(',')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
