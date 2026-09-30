'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Search, CheckCircle2, Clock, Globe2, FileText, AlertCircle } from 'lucide-react';
import { EnrichedVisaInfo } from '@/types';

interface VisaCentreProps {
  visaData: EnrichedVisaInfo[];
}

export default function VisaCentre({ visaData }: VisaCentreProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredVisas = visaData.filter((item) => {
    const matchesSearch = item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.singaporeCitizenNotes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.visaStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <section id="visa-centre" className="py-24 sm:py-32 bg-voyanta-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-border pb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-mono tracking-wider text-secondary">
              <ShieldCheck className="w-3.5 h-3.5 text-luxury" />
              <span>08 / VISA INFORMATION CENTRE</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl text-primary font-normal tracking-tight">
              Singapore Border Clearance & Visas
            </h2>
            <p className="text-secondary text-base sm:text-lg font-sans leading-relaxed">
              Consistently celebrated as the world's most seamless airport arrival experience. Official entry protocols, SG Arrival Card (SGAC) timelines, and automated biometric e-Gate access at Changi Airport for travelers from 25 global origins.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-border shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary text-luxury flex items-center justify-center font-mono font-bold text-lg">
              SIN
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-secondary block">
                Changi Automated Clearance
              </span>
              <span className="font-editorial text-xl text-primary font-medium">
                Passport-Free Biometric Gates
              </span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-border shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-secondary/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search nationality, e.g. United States, United Kingdom, Australia, China..."
              className="w-full bg-voyanta-bg pl-10 pr-4 py-2.5 rounded-xl text-xs font-sans text-primary focus:outline-none focus:border-luxury border border-voyanta-border transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {['All', 'Visa-Free', 'Instant ETA / eVisa'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  statusFilter === status
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-voyanta-bg text-secondary hover:text-primary border border-border'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Visa Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredVisas.slice(0, 9).map((visa, idx) => (
              <motion.div
                key={visa.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.05 }}
                className="bg-white border border-border rounded-2xl p-6 shadow-voyanta flex flex-col justify-between space-y-4 hover:border-luxury/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-secondary/70">{visa.id}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold ${
                        visa.visaStatus === 'Visa-Free'
                          ? 'bg-secondary/10 text-secondary border border-secondary/20'
                          : 'bg-luxury/20 text-luxury-dark border border-luxury/30'
                      }`}
                    >
                      {visa.visaStatus}
                    </span>
                  </div>

                  <h3 className="font-editorial text-3xl text-primary font-medium">
                    {visa.country}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 my-4 p-3 rounded-xl bg-voyanta-bg text-xs">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-secondary/60 block">Allowed Stay:</span>
                      <span className="font-semibold text-primary">{visa.durationDays}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-secondary/60 block">Processing:</span>
                      <span className="font-semibold text-primary">{visa.processingTime}</span>
                    </div>
                  </div>

                  <p className="text-xs text-secondary leading-relaxed font-sans">
                    {visa.singaporeCitizenNotes}
                  </p>
                </div>

                <div className="pt-4 border-t border-voyanta-border space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-secondary/70 block">
                    Singapore Entry Checklist
                  </span>
                  {visa.keyRequirements.map((req, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-2 text-xs text-primary/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />
                      <span className="truncate">{req}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredVisas.length === 0 && (
          <div className="text-center py-16 text-secondary font-mono text-sm">
            No specific visa entries match your query. Most international visitors enter Singapore visa-free under reciprocal immigration arrangements.
          </div>
        )}
      </div>
    </section>
  );
}
