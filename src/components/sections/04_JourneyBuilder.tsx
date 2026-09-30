'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, MapPin, Sparkles, Utensils, Hotel, Compass, ArrowRight, Sun, Moon, Coffee, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { EnrichedItinerary } from '@/types';
import { useVoyanta } from '@/context/VoyantaContext';

interface JourneyBuilderProps {
  itineraries: EnrichedItinerary[];
  activeItineraryId?: string;
  onOpenInquiry: (itineraryTitle: string) => void;
}

export default function JourneyBuilder({
  itineraries,
  activeItineraryId,
  onOpenInquiry,
}: JourneyBuilderProps) {
  const { formatPrice } = useVoyanta();

  const initialIti = itineraries.find((i) => i.id === activeItineraryId) || itineraries[0];
  const [selectedItineraryId, setSelectedItineraryId] = useState<string>(initialIti?.id || 'ITI001');
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);

  // Dynamic user customizations for active itinerary
  const [travelPace, setTravelPace] = useState<'Leisurely' | 'Immersive' | 'VIP Fast-Paced'>('Immersive');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'Changi Tarmac VIP Limousine Meet',
  ]);

  const featuredItineraries = itineraries.slice(0, 6);
  const currentItinerary = itineraries.find((i) => i.id === selectedItineraryId) || initialIti;
  const currentDayPlan =
    currentItinerary?.dayPlans?.find((d) => d.day === activeDayNumber) || currentItinerary?.dayPlans?.[0];

  const availableAddons = [
    { id: 'limo', label: 'Changi Tarmac VIP Limousine Meet', price: 350 },
    { id: 'odette', label: '3-Star Michelin Odette Chef Counter Buyout', price: 680 },
    { id: 'yacht', label: 'Sunset Catamaran Cruise to Lazarus Island', price: 1200 },
    { id: 'spa', label: 'Capella Auriga 90-Min Full Moon Herbal Spa', price: 380 },
  ];

  const toggleAddon = (label: string) => {
    setSelectedAddons((prev) =>
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
    );
  };

  const handleCommissionItinerary = () => {
    const customSummary = `${currentItinerary.packageName} (${currentItinerary.days} Days, Pace: ${travelPace}, Upgrades: ${selectedAddons.join(', ') || 'Standard'})`;
    onOpenInquiry(customSummary);
  };

  return (
    <section id="itinerary-builder" className="py-24 sm:py-32 bg-voyanta-bg relative overflow-hidden">
      {/* Decorative Compass Mark */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-editorial text-primary/[0.015] select-none pointer-events-none -ml-20">
        JOURNEY
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-mono tracking-wider text-secondary">
            <Calendar className="w-3.5 h-3.5 text-luxury" />
            <span>04 / INTERACTIVE JOURNEY BUILDER</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl text-primary font-normal tracking-tight">
            Visual Day-by-Day Timeline
          </h2>
          <p className="text-secondary text-base sm:text-lg font-sans leading-relaxed">
            Every itinerary in our archive is crafted around the rhythm of slow, exquisite travel. Explore morning cultural ceremonies, midday private access, and evening Michelin dinners coordinated directly with Singapore departure schedules.
          </p>
        </div>

        {/* Itinerary Selector Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {featuredItineraries.map((iti) => {
            const isSelected = iti.id === selectedItineraryId;
            return (
              <button
                key={iti.id}
                onClick={() => {
                  setSelectedItineraryId(iti.id);
                  setActiveDayNumber(1);
                }}
                className={`px-5 py-3 rounded-2xl text-left shrink-0 transition-all duration-300 border ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-voyanta'
                    : 'bg-white text-secondary hover:text-primary hover:border-luxury border-border'
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[10px] font-mono">
                  <span className={isSelected ? 'text-luxury' : 'text-secondary/70'}>{iti.id}</span>
                  <span className={isSelected ? 'text-white/80' : 'text-secondary/60'}>{iti.days} Days</span>
                </div>
                <div className="font-editorial text-lg font-medium mt-1 truncate max-w-[200px]">
                  {iti.destination}
                </div>
              </button>
            );
          })}
        </div>

        {/* Timeline Interactive Canvas */}
        {currentItinerary && (
          <div className="bg-white rounded-3xl border border-border shadow-voyanta p-6 sm:p-10 space-y-8">
            {/* Top Itinerary Overview Strip */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-border">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-secondary mb-1">
                  <span className="uppercase text-accent font-semibold">{currentItinerary.destination}</span>
                  <span>•</span>
                  <span>{currentItinerary.days} Days Curated Expedition</span>
                </div>
                <h3 className="font-editorial text-3xl sm:text-4xl text-primary font-medium">
                  {currentItinerary.packageName}
                </h3>
                <p className="text-sm text-secondary font-sans mt-1 max-w-2xl leading-relaxed">
                  {currentItinerary.summary}
                </p>
              </div>

              {/* Dynamic Pace Switcher */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                <div className="bg-voyanta-bg p-1 rounded-xl border border-border flex items-center text-xs font-mono">
                  {(['Leisurely', 'Immersive', 'VIP Fast-Paced'] as const).map((pace) => (
                    <button
                      key={pace}
                      onClick={() => setTravelPace(pace)}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        travelPace === pace
                          ? 'bg-primary text-white shadow-xs font-semibold'
                          : 'text-secondary hover:text-primary'
                      }`}
                    >
                      {pace}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleCommissionItinerary}
                  className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-display text-xs uppercase tracking-wider font-semibold shadow-voyanta flex items-center gap-2 transition-all duration-300"
                >
                  <span>Book Custom Timeline</span>
                  <ArrowRight className="w-3.5 h-3.5 text-luxury" />
                </button>
              </div>
            </div>

            {/* Days Horizontal Navigation */}
            <div className="py-2 border-b border-border overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-3 pb-2">
                {currentItinerary.dayPlans.map((plan) => {
                  const isActive = plan.day === activeDayNumber;
                  return (
                    <button
                      key={plan.day}
                      onClick={() => setActiveDayNumber(plan.day)}
                      className={`px-4 py-2.5 rounded-xl font-mono text-xs transition-all duration-300 shrink-0 flex items-center gap-2 ${
                        isActive
                          ? 'bg-secondary text-white font-semibold shadow-sm'
                          : 'bg-voyanta-bg text-secondary hover:bg-border/60'
                      }`}
                    >
                      <span>Day {plan.day}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-luxury" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Day Plan Detailed Breakdown */}
            <AnimatePresence mode="wait">
              {currentDayPlan && (
                <motion.div
                  key={`${selectedItineraryId}-${currentDayPlan.day}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-luxury font-semibold">
                        Day {currentDayPlan.day} Experience Focus • {travelPace} Pace
                      </span>
                      <h4 className="font-editorial text-2xl sm:text-3xl text-primary font-medium mt-0.5">
                        {currentDayPlan.title}
                      </h4>
                    </div>

                    <div className="bg-voyanta-bg border border-border px-3.5 py-1.5 rounded-lg text-xs font-mono text-secondary flex items-center gap-2">
                      <Hotel className="w-4 h-4 text-primary" />
                      <span>{currentDayPlan.stay}</span>
                    </div>
                  </div>

                  {/* Morning, Afternoon, Evening 3-Column Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Morning Card */}
                    <div className="bg-voyanta-bg border border-border p-6 rounded-2xl space-y-3 relative group hover:border-luxury/40 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-secondary flex items-center gap-1.5">
                          <Sun className="w-4 h-4 text-luxury" />
                          Morning
                        </span>
                        <span className="text-[10px] font-mono text-secondary/60">08:00 - 12:30</span>
                      </div>
                      <p className="text-sm text-primary font-sans leading-relaxed">
                        {currentDayPlan.morning}
                      </p>
                    </div>

                    {/* Afternoon Card */}
                    <div className="bg-voyanta-bg border border-border p-6 rounded-2xl space-y-3 relative group hover:border-luxury/40 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-secondary flex items-center gap-1.5">
                          <Coffee className="w-4 h-4 text-accent" />
                          Afternoon
                        </span>
                        <span className="text-[10px] font-mono text-secondary/60">13:00 - 17:30</span>
                      </div>
                      <p className="text-sm text-primary font-sans leading-relaxed">
                        {currentDayPlan.afternoon}
                      </p>
                    </div>

                    {/* Evening Card */}
                    <div className="bg-voyanta-bg border border-border p-6 rounded-2xl space-y-3 relative group hover:border-luxury/40 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-secondary flex items-center gap-1.5">
                          <Moon className="w-4 h-4 text-primary" />
                          Evening
                        </span>
                        <span className="text-[10px] font-mono text-secondary/60">18:30 - Late</span>
                      </div>
                      <p className="text-sm text-primary font-sans leading-relaxed">
                        {currentDayPlan.evening}
                      </p>
                    </div>
                  </div>

                  {/* Gastronomy & Insider Tip Footer */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-voyanta-border">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 text-xs text-secondary">
                      <Utensils className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-primary font-mono uppercase text-[10px] block">
                          Included Gastronomy:
                        </span>
                        <span className="text-primary/90 mt-0.5 block">{currentDayPlan.meals}</span>
                      </div>
                    </div>

                    {currentDayPlan.insiderTip && (
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-luxury/10 text-xs text-secondary">
                        <Sparkles className="w-4 h-4 text-luxury-dark shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-primary font-mono uppercase text-[10px] block">
                            Singapore Curator&apos;s Insider Note:
                          </span>
                          <span className="text-primary/90 mt-0.5 block">{currentDayPlan.insiderTip}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dynamic Addons Selector for this Itinerary */}
                  <div className="p-5 rounded-2xl bg-voyanta-bg border border-border space-y-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-secondary block font-semibold">
                      Add Optional VIP Upgrades to this Itinerary:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {availableAddons.map((addon) => {
                        const isAdded = selectedAddons.includes(addon.label);
                        return (
                          <button
                            key={addon.id}
                            onClick={() => toggleAddon(addon.label)}
                            className={`p-2.5 rounded-xl text-left border flex items-center justify-between text-xs transition-colors ${
                              isAdded
                                ? 'bg-primary text-white border-primary shadow-xs'
                                : 'bg-white text-secondary hover:border-luxury border-border'
                            }`}
                          >
                            <span className="truncate pr-2">{addon.label}</span>
                            <span className="font-mono text-[11px] font-semibold shrink-0">
                              +{formatPrice(addon.price)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
