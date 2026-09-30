'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { EnrichedCalendarDay } from '@/types';
import { useVoyanta } from '@/context/VoyantaContext';

interface TravelCalendarProps {
  calendarData: EnrichedCalendarDay[];
  onSelectDeparture: (day: EnrichedCalendarDay) => void;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function TravelCalendar({
  calendarData,
  onSelectDeparture
}: TravelCalendarProps) {
  const { formatPrice, currency } = useVoyanta();
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(8); // September default (F1 Grand Prix season)
  const [selectedDay, setSelectedDay] = useState<EnrichedCalendarDay | null>(null);

  const daysInCurrentMonth = calendarData.filter(d => d.monthIndex === selectedMonthIndex);

  const handlePrevMonth = () => {
    setSelectedMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setSelectedMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  };

  const activeDay = selectedDay || daysInCurrentMonth[0];

  return (
    <section id="calendar" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-border pb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono tracking-wider text-primary">
              <CalendarIcon className="w-3.5 h-3.5 text-luxury" />
              <span>12 / TRAVEL CALENDAR</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl text-primary font-normal tracking-tight">
              365-Day Departure Almanac
            </h2>
            <p className="text-secondary text-base sm:text-lg font-sans leading-relaxed">
              Dynamically rendered from 365 calendar availability records. Synchronized with Singapore official public holidays, festive long weekends, and signature annual spectacles like the Singapore Grand Prix night race and Marina Bay New Year gala.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePrevMonth}
              className="p-3 rounded-full border border-border bg-voyanta-bg text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center min-w-[140px]">
              <span className="font-editorial text-2xl font-medium text-primary block">
                {MONTHS[selectedMonthIndex]}
              </span>
              <span className="text-[10px] font-mono uppercase text-luxury-dark tracking-widest block">
                2027 Season
              </span>
            </div>
            <button
              onClick={handleNextMonth}
              className="p-3 rounded-full border border-border bg-voyanta-bg text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Month Selectors Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {MONTHS.map((m, idx) => (
            <button
              key={m}
              onClick={() => {
                setSelectedMonthIndex(idx);
                setSelectedDay(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 ${
                selectedMonthIndex === idx
                  ? 'bg-primary text-white font-semibold shadow-xs'
                  : 'bg-voyanta-bg text-secondary hover:text-primary hover:bg-border/60'
              }`}
            >
              {m.slice(0, 3)}
            </button>
          ))}
        </div>

        {/* Calendar & Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Days Matrix (8 Cols) */}
          <div className="lg:col-span-8 bg-voyanta-bg rounded-3xl p-6 sm:p-8 border border-border shadow-voyanta">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div className="text-xs font-mono text-secondary">
                <span>Month: <strong>{MONTHS[selectedMonthIndex]}</strong></span>
                <span className="mx-2">•</span>
                <span>Season: <strong>{daysInCurrentMonth[0]?.season}</strong></span>
              </div>

              <div className="flex items-center gap-4 text-[11px] font-mono text-secondary">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                  Guaranteed
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                  Limited (2 Left)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-luxury" />
                  SG Event
                </span>
              </div>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="text-center text-[10px] font-mono text-secondary/60 uppercase py-1">
                  {d}
                </div>
              ))}

              {daysInCurrentMonth.map((dayItem) => {
                const isSelected = activeDay?.day === dayItem.day;
                const isLimited = dayItem.status.includes('Limited');
                const hasHoliday = Boolean(dayItem.holidayTag);

                return (
                  <button
                    key={dayItem.day}
                    onClick={() => setSelectedDay(dayItem)}
                    className={`relative aspect-square rounded-xl p-1.5 flex flex-col justify-between text-left transition-all duration-300 border ${
                      isSelected
                        ? 'bg-primary text-white border-primary shadow-md scale-105 z-10'
                        : hasHoliday
                        ? 'bg-luxury/15 border-luxury/40 text-primary hover:bg-luxury/25'
                        : 'bg-white border-border/80 text-primary hover:border-luxury/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold">{dayItem.dayOfMonth}</span>
                      {hasHoliday && (
                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-dark animate-pulse" />
                      )}
                    </div>

                    <div className="text-[9px] font-mono truncate">
                      {isLimited ? (
                        <span className={isSelected ? 'text-accent-light' : 'text-accent font-semibold'}>2 Left</span>
                      ) : (
                        <span className={isSelected ? 'text-white/70' : 'text-secondary/70'}>Avail</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Day Inspector Card (4 Cols) */}
          <div className="lg:col-span-4">
            {activeDay && (
              <motion.div
                key={activeDay.day}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-voyanta space-y-6"
              >
                <div className="border-b border-border pb-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-luxury-dark font-semibold">
                      Day #{activeDay.day} / 365
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-secondary/10 text-secondary text-[10px] font-mono uppercase">
                      {activeDay.status}
                    </span>
                  </div>
                  <h3 className="font-editorial text-3xl text-primary font-medium">
                    {activeDay.dateStr}
                  </h3>
                  <p className="text-xs font-sans text-secondary">
                    Season: <strong className="text-primary">{activeDay.season}</strong>
                  </p>
                </div>

                {/* Singapore Holiday Notice if applicable */}
                {activeDay.holidayTag && (
                  <div className="p-3.5 rounded-xl bg-luxury/15 border border-luxury/30 space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-luxury-dark font-semibold block">
                      Singapore Official Festival / Grand Spectacle
                    </span>
                    <p className="text-xs text-primary font-medium">
                      {activeDay.holidayTag}
                    </p>
                  </div>
                )}

                {/* Recommended Package for this departure */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-secondary/70 block">
                    Featured Departure Voyage
                  </span>
                  <h4 className="font-editorial text-2xl text-primary font-medium leading-snug">
                    {activeDay.featuredPackage}
                  </h4>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="font-editorial text-2xl font-semibold text-primary">
                      {formatPrice(activeDay.priceStartSGD)}
                    </span>
                    <span className="text-xs font-mono text-secondary">/ person ({currency})</span>
                  </div>
                </div>

                {/* CTA Action */}
                <div className="pt-2">
                  <button
                    onClick={() => onSelectDeparture(activeDay)}
                    className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-light text-white font-display text-xs uppercase tracking-wider font-semibold shadow-voyanta flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <span>Reserve {activeDay.dateStr} Departure</span>
                    <ArrowRight className="w-4 h-4 text-luxury" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
