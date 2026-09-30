'use client';

import { motion } from 'framer-motion';
import { Shield, FileCheck, Lock, CheckCircle2, DollarSign } from 'lucide-react';
import { EnrichedPolicy } from '@/types';

interface BookingPoliciesProps {
  bookingPolicies: EnrichedPolicy[];
}

export default function BookingPolicies({ bookingPolicies }: BookingPoliciesProps) {
  return (
    <section id="booking-policies" className="py-24 sm:py-32 bg-white relative border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-border pb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono tracking-wider text-primary">
              <FileCheck className="w-3.5 h-3.5 text-luxury" />
              <span>09 / BOOKING POLICIES</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl text-primary font-normal tracking-tight">
              Booking Terms & Escrow Protections
            </h2>
            <p className="text-secondary text-base sm:text-lg font-sans leading-relaxed">
              Every Voyanta journey operates under Singapore Tourism Board (STB) regulatory licensing (TA #03829). All client deposits are secured in regulated trust accounts with transparent Singapore Dollar (SGD) billing and Changi VIP synchronization.
            </p>
          </div>

          <div className="bg-voyanta-bg p-4 rounded-2xl border border-border shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary text-luxury flex items-center justify-center font-mono font-bold text-lg">
              <Lock className="w-5 h-5 text-luxury" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-secondary block">
                STB Trust Safeguard
              </span>
              <span className="font-editorial text-xl text-primary font-medium">
                100% Escrow Protected
              </span>
            </div>
          </div>
        </div>

        {/* 3 Trust Assurance Pillars */}
        <div className="bg-voyanta-bg rounded-2xl border border-border p-6 mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-editorial text-lg text-primary font-medium">STB Regulated Escrow</h4>
              <p className="text-xs text-secondary mt-0.5 leading-relaxed">
                Deposits held strictly in trust under Singapore Tourism Board Travel Agent License #03829.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-luxury shrink-0 mt-0.5" />
            <div>
              <h4 className="font-editorial text-lg text-primary font-medium">Transparent SGD Invoicing</h4>
              <p className="text-xs text-secondary mt-0.5 leading-relaxed">
                All quotes include 9% Singapore GST and hotel service charges with zero foreign exchange fees.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <h4 className="font-editorial text-lg text-primary font-medium">Changi Airport Fast-Track</h4>
              <p className="text-xs text-secondary mt-0.5 leading-relaxed">
                Seamless tarmac limousine meet-and-greet synchronized with real-time Changi flight schedules.
              </p>
            </div>
          </div>
        </div>

        {/* 15 Booking Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookingPolicies.map((pol, idx) => (
            <motion.div
              key={pol.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
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
        </div>
      </div>
    </section>
  );
}
