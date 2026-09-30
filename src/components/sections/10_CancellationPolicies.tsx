'use client';

import { motion } from 'framer-motion';
import { RefreshCw, Shield, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { EnrichedPolicy } from '@/types';

interface CancellationPoliciesProps {
  cancellationPolicies: EnrichedPolicy[];
}

export default function CancellationPolicies({ cancellationPolicies }: CancellationPoliciesProps) {
  return (
    <section id="cancellation-policies" className="py-24 sm:py-32 bg-voyanta-bg relative border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-border pb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-mono tracking-wider text-accent">
              <RefreshCw className="w-3.5 h-3.5 text-accent" />
              <span>10 / CANCELLATION POLICIES</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl text-primary font-normal tracking-tight">
              Cancellation Shield & Flexible Guarantees
            </h2>
            <p className="text-secondary text-base sm:text-lg font-sans leading-relaxed">
              Designed for effortless flexibility and discretion. Features 30-day flexible rebooking windows, Changi flight delay automatic land realignment, and transparent refund schedules without arbitrary administrative fees.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-border shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/15 text-accent flex items-center justify-center font-mono font-bold text-lg">
              <RefreshCw className="w-5 h-5 text-accent" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-secondary block">
                Flexible Rescheduling
              </span>
              <span className="font-editorial text-xl text-primary font-medium">
                30-Day Window Guarantee
              </span>
            </div>
          </div>
        </div>

        {/* 3 Cancellation Guarantees */}
        <div className="bg-white rounded-2xl border border-border p-6 mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-sm">
          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <h4 className="font-editorial text-lg text-primary font-medium">30-Day Credit Transfer</h4>
              <p className="text-xs text-secondary mt-0.5 leading-relaxed">
                Cancel up to 30 days prior for 100% credit transfer valid 24 months across all Singapore stays.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-editorial text-lg text-primary font-medium">Changi Disruption Shield</h4>
              <p className="text-xs text-secondary mt-0.5 leading-relaxed">
                Automatic land-arrangement realignment at zero penalty if flights into Changi are disrupted.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-luxury shrink-0 mt-0.5" />
            <div>
              <h4 className="font-editorial text-lg text-primary font-medium">Prompt SGD Refunds</h4>
              <p className="text-xs text-secondary mt-0.5 leading-relaxed">
                Eligible refunds credited directly within 5–7 business days with transparent statements.
              </p>
            </div>
          </div>
        </div>

        {/* 15 Cancellation Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cancellationPolicies.map((pol, idx) => (
            <motion.div
              key={pol.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (idx % 3) * 0.05 }}
              className="bg-white border border-border rounded-2xl p-6 shadow-voyanta flex flex-col justify-between space-y-4 hover:border-accent/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-secondary mb-2">
                  <span className="text-accent font-semibold">{pol.id}</span>
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
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
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
        </div>
      </div>
    </section>
  );
}
