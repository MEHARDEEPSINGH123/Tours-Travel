'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Utensils, Landmark, ShoppingBag, Eye, Compass, Star, MapPin, Heart, ThumbsUp } from 'lucide-react';
import { EnrichedRecommendation } from '@/types';

interface LocalRecommendationsProps {
  recommendations: EnrichedRecommendation[];
}

export default function LocalRecommendations({
  recommendations
}: LocalRecommendationsProps) {
  const [activeTab, setActiveTab] = useState<'All' | 'Food' | 'Culture' | 'Shopping' | 'Attractions' | 'Experiences'>('All');
  const [selectedPrecinct, setSelectedPrecinct] = useState<string>('All');
  const [likes, setLikes] = useState<Record<string, number>>({});

  const categories = [
    { key: 'All', label: 'All Curations', icon: Compass },
    { key: 'Food', label: 'Gastronomy & Wine', icon: Utensils },
    { key: 'Culture', label: 'Heritage & Living Arts', icon: Landmark },
    { key: 'Experiences', label: 'Rare Experiences', icon: Sparkles },
    { key: 'Attractions', label: 'Sanctuaries & Wonders', icon: Eye },
    { key: 'Shopping', label: 'Ateliers & Shopping', icon: ShoppingBag },
  ];

  const precincts = ['All', 'Marina Bay', 'Sentosa', 'Katong', 'Dempsey', 'Southern Islands', 'Chinatown'];

  const filteredRecs = recommendations.filter((r) => {
    const matchesCategory = activeTab === 'All' || r.category === activeTab;
    const matchesPrecinct =
      selectedPrecinct === 'All' || r.destination.toLowerCase().includes(selectedPrecinct.toLowerCase());
    return matchesCategory && matchesPrecinct;
  });

  const displayedRecs = filteredRecs.slice(0, 8);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section id="recommendations" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 border-b border-border pb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-mono tracking-wider text-accent">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>07 / LOCAL RECOMMENDATIONS</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl text-primary font-normal tracking-tight">
              Singapore Insider Archive
            </h2>
            <p className="text-secondary text-base sm:text-lg font-sans leading-relaxed">
              Curated from 100 private resident recommendations. Unlisted chef&apos;s tables at Odette, private Peranakan shophouse attics in Katong, and dawn mist walks in Gardens by the Bay—vetted firsthand by our Singapore concierges.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-secondary uppercase tracking-widest block">
              Curator Database
            </span>
            <span className="font-editorial text-2xl text-primary font-medium">
              {filteredRecs.length} Unlisted Secrets
            </span>
          </div>
        </div>

        {/* Dynamic Controls: Category Tabs + Precinct Filter */}
        <div className="space-y-4 mb-10">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key as any)}
                  className={`px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shrink-0 ${
                    isActive
                      ? 'bg-primary text-white shadow-voyanta border border-primary'
                      : 'bg-voyanta-bg text-secondary hover:text-primary hover:border-luxury border border-border'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-luxury' : 'text-secondary'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Precinct Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-voyanta-border">
            <span className="text-[10px] font-mono uppercase text-secondary/60 mr-1">Precinct:</span>
            {precincts.map((precinct) => (
              <button
                key={precinct}
                onClick={() => setSelectedPrecinct(precinct)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  selectedPrecinct === precinct
                    ? 'bg-secondary text-white font-semibold shadow-2xs'
                    : 'bg-white text-secondary hover:text-primary border border-voyanta-border'
                }`}
              >
                {precinct}
              </button>
            ))}
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedRecs.map((rec, idx) => {
              const currentLikes = (likes[rec.id] || 0);

              return (
                <motion.div
                  key={rec.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: (idx % 4) * 0.05 }}
                  className="group bg-voyanta-bg border border-border hover:border-luxury/50 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:shadow-voyanta transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md bg-white text-[10px] font-mono uppercase tracking-widest text-primary font-semibold border border-border">
                        {rec.category}
                      </span>
                      <span className="text-xs font-mono text-luxury-dark font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-luxury text-luxury" />
                        {rec.voyantaScore}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono text-secondary/80 flex items-center gap-1 mb-1">
                        <MapPin className="w-3 h-3 text-accent" />
                        {rec.destination}
                      </span>
                      <h3 className="font-editorial text-2xl text-primary font-medium group-hover:text-accent transition-colors leading-snug">
                        {rec.title}
                      </h3>
                    </div>

                    <p className="text-xs font-sans text-secondary leading-relaxed pt-1">
                      {rec.editorialReview}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-voyanta-border flex items-center justify-between text-[11px] font-mono text-secondary">
                    <span className="text-luxury-dark font-medium">{rec.tag}</span>

                    {/* Interactive Like Counter */}
                    <button
                      onClick={(e) => handleLike(rec.id, e)}
                      className="flex items-center gap-1 text-secondary/70 hover:text-accent transition-colors p-1"
                      title="Recommend this tip"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{currentLikes > 0 ? `+${currentLikes}` : 'Helpful'}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
