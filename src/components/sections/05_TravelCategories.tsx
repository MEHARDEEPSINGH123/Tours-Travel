'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';
import Image from 'next/image';
import { EnrichedCategory } from '@/types';

interface TravelCategoriesProps {
  categories: EnrichedCategory[];
  onSelectCategory: (categoryName: string) => void;
}

export default function TravelCategories({
  categories,
  onSelectCategory
}: TravelCategoriesProps) {
  // We showcase the 8 core styles with option to expand the full 20 from dataset
  const [showAll, setShowAll] = useState(false);
  const displayedCategories = showAll ? categories : categories.slice(0, 8);

  return (
    <section id="categories" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-border pb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono tracking-wider text-primary">
              <Layers className="w-3.5 h-3.5 text-luxury" />
              <span>05 / TRAVEL CATEGORIES</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl text-primary font-normal tracking-tight">
              Curated Travel Archetypes
            </h2>
            <p className="text-secondary text-base sm:text-lg font-sans leading-relaxed">
              Whether you seek secluded multi-generational luxury villas, private mountain heli-expeditions, or restorative thermal onsen retreats, each category is shaped around Singapore traveler discernment.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-secondary block uppercase tracking-widest">
              Voyanta Curated Spectrum
            </span>
            <span className="font-editorial text-2xl text-primary font-medium">
              8 Defined Disciplines
            </span>
          </div>
        </div>

        {/* Categories Grid - Magazine Editorial Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
              onClick={() => onSelectCategory(cat.name)}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-voyanta border border-border"
            >
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-black/20 group-hover:from-primary/95 transition-all duration-500" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-primary font-semibold">
                  {cat.badge}
                </span>
                <span className="text-xs font-mono text-luxury bg-primary/80 backdrop-blur-md px-2 py-0.5 rounded">
                  {cat.packageCount} Voyages
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-voyanta-sand/70">
                    {cat.theme}
                  </span>
                  <h3 className="font-editorial text-3xl font-medium tracking-tight">
                    {cat.name}
                  </h3>
                </div>

                <p className="text-xs font-sans text-voyanta-sand/80 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {cat.tagline}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-mono text-luxury uppercase tracking-wider group-hover:underline">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Categories Toggle */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-3 rounded-full border border-secondary text-secondary hover:text-primary hover:border-primary text-xs font-mono uppercase tracking-wider transition-colors"
          >
            {showAll ? 'Show Core 8 Categories' : `Expand All ${categories.length} Category Classifications`}
          </button>
        </div>
      </div>
    </section>
  );
}
