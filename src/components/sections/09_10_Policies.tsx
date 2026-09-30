'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, FileCheck, RefreshCw, Lock, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { EnrichedPolicy } from '@/types';

interface PoliciesProps {
  bookingPolicies: EnrichedPolicy[];
  cancellationPolicies: EnrichedPolicy[];
}

export default function PoliciesSection({
  bookingPolicies,
  cancellationPolicies
}: PoliciesProps) {
  const [activeTab, setActiveTab] = useState<'booking' | 'cancellation'>('booking');

  const policiesList = activeTab === 'booking' ? bookingPolicies : cancellationPolicies;

  return (
    <section id="policies" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-border pb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono tracking-wider text-primary">
              <Shield className="w-3.5 h-3.5 text-luxury" />
              <span>09 & 10 / BOOKING & CANCELLATION POLICIES</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl text-primary font-normal tracking-tight">
              Uncompromising Transparency
            </h2>
            <p className="text-secondary text-base sm:text-lg font-sans leading-relaxed">
              Every Voyanta journey operates under Singapore Tourism Board (STB) regulatory licensing. Complete peace of mind with 60-day flexible cancellation windows, transparent SGD deposits, and Changi flight synchronization.
            </p>
          </div>

          {/* Policy Switcher Toggle */}
          <div className="bg-voyanta-bg p-1.5 rounded-2xl border border-border flex items-center">
            <button
              onClick={() => setActiveTab('booking')}
              className={`px-6 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'booking'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              <FileCheck className="w-4 h-4 text-luxury" />
              <span>Booking Policies (15)</span>
            </button>

            <button
              onClick={() => setActiveTab('cancellation')}
              className={`px-6 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'cancellation'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              <RefreshCw className="w-4 h-4 text-accent" />
              <span>Cancellation Shield (15)</span>
            </button>
          </div>
        </div>

        {/* Singapore Trust Assurance Bar */}
        <div className="bg-voyanta-bg rounded-2xl border border-border p-6 mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-editorial text-lg text-primary font-medium">STB Escrow Safeguard</h4>
              <p className="text-xs text-secondary mt-0.5 leading-relaxed">
                Deposits held securely in trust under Singapore Tourism Board Travel Agent License #03829.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <h4 className="font-editorial text-lg text-primary font-medium">60-Day Flexible Transfer</h4>
              <p className="text-xs text-secondary mt-0.5 leading-relaxed">
                Modify departure dates or transfer credit seamlessly without arbitrary penalties.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-luxury shrink-0 mt-0.5" />
            <div>
              <h4 className="font-editorial text-lg text-primary font-medium">Changi Disruption Shield</h4>
              <p className="text-xs text-secondary mt-0.5 leading-relaxed">
                Automatic land-arrangement realignment if your flight from Singapore Changi is delayed.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {policiesList.map((pol, idx) => (
              <motion.div
                key={`${activeTab}-${pol.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.05 }}
                className="bg-white border border-border rounded-2xl p-6 shadow-voyanta flex flex-col justify-between space-y-4 hover:border-luxury/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-secondary mb-2">
                    <span className="text-luxury-dark font-semibold">{pol.id}</span>
                    <span className="uppercase text-[10px] bg-voyanta-bg px-2 py-0.5 rounded border border-border">
                      {pol.policy}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl text-primary font-medium mb-2">
                    {pol.title}
                  </h3>

                  <p className="text-xs text-secondary leading-relaxed font-sans mb-4">
                    {pol.summary}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-voyanta-border">
                    {pol.detailedPoints.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-primary/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                        <span className="leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-voyanta-border text-[10px] font-mono text-secondary/70">
                  {pol.singaporeConsumerNotice}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
