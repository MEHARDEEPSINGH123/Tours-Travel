'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send, Calendar, Users, MapPin, Sparkles, PhoneCall } from 'lucide-react';
import { useScrollLock } from '@/hooks/useScrollLock';

interface QuickInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPackage?: string;
  preselectedDestination?: string;
}

export default function QuickInquiryModal({
  isOpen,
  onClose,
  preselectedPackage,
  preselectedDestination
}: QuickInquiryModalProps) {
  useScrollLock(isOpen);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    guests: '2 Guests',
    preferredMonth: 'October 2026',
    destination: preselectedDestination || 'Marina Bay & Civic District',
    packageInterest: preselectedPackage || 'Curated Bespoke Voyage',
    travelPace: 'Immersive & Leisurely',
    specialNotes: ''
  });

  // Keep form synchronized with incoming props when modal opens
  useState(() => {
    // Initial state setup
  });

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        destination: preselectedDestination || prev.destination || 'Marina Bay & Civic District',
        packageInterest: preselectedPackage || prev.packageInterest || 'Curated Bespoke Voyage'
      }));
    }
  }, [isOpen, preselectedPackage, preselectedDestination]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-voyanta-bg border border-border rounded-2xl shadow-2xl overflow-hidden z-10 my-8"
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Header accent ribbon */}
            <div className="bg-primary text-voyanta-sand px-6 py-4 flex items-center justify-between border-b border-secondary/40 shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-luxury" />
                <span className="text-xs uppercase tracking-widest font-mono text-luxury">
                  Voyanta Singapore Private Atelier
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-voyanta-sand/70 hover:text-white p-1 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto overscroll-contain"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
            >
              {!isSubmitted ? (
                <div>
                  <div className="mb-6">
                    <h3 className="font-editorial text-3xl sm:text-4xl text-primary font-medium tracking-tight mb-2">
                      Design Your Bespoke Journey
                    </h3>
                    <p className="text-sm text-secondary font-sans leading-relaxed">
                      Connect with our Singapore Senior Journey Curators at our Orchard suite or via private encrypted channel. All quotes tailored in Singapore Dollars (SGD) with Changi VIP coordination.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-mono tracking-wider text-primary mb-1.5 font-medium">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Su-Lyn Tan"
                          className="w-full bg-white border border-voyanta-border rounded-lg px-3.5 py-2.5 text-sm text-primary focus:outline-none focus:border-luxury transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-mono tracking-wider text-primary mb-1.5 font-medium">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="su-lyn@singapore.com"
                          className="w-full bg-white border border-voyanta-border rounded-lg px-3.5 py-2.5 text-sm text-primary focus:outline-none focus:border-luxury transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-mono tracking-wider text-primary mb-1.5 font-medium">
                          Singapore / WhatsApp Contact *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+65 9123 4567"
                          className="w-full bg-white border border-voyanta-border rounded-lg px-3.5 py-2.5 text-sm text-primary focus:outline-none focus:border-luxury transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-mono tracking-wider text-primary mb-1.5 font-medium">
                          Party Size
                        </label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="w-full bg-white border border-voyanta-border rounded-lg px-3.5 py-2.5 text-sm text-primary focus:outline-none focus:border-luxury transition-colors"
                        >
                          <option>Solo Voyager</option>
                          <option>Couple / 2 Guests</option>
                          <option>Family (3-5 Guests)</option>
                          <option>Private Multi-Gen Group (6-12 Guests)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-mono tracking-wider text-primary mb-1.5 font-medium">
                          Destination of Interest
                        </label>
                        <input
                          type="text"
                          value={formData.destination}
                          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                          className="w-full bg-white border border-voyanta-border rounded-lg px-3.5 py-2.5 text-sm text-primary focus:outline-none focus:border-luxury transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-mono tracking-wider text-primary mb-1.5 font-medium">
                          Preferred Travel Period
                        </label>
                        <select
                          value={formData.preferredMonth}
                          onChange={(e) => setFormData({ ...formData, preferredMonth: e.target.value })}
                          className="w-full bg-white border border-voyanta-border rounded-lg px-3.5 py-2.5 text-sm text-primary focus:outline-none focus:border-luxury transition-colors"
                        >
                          <option>October 2026 (Autumn Foliage)</option>
                          <option>December 2026 (Festive Holiday)</option>
                          <option>January / February 2027 (CNY Long Weekend)</option>
                          <option>March / April 2027 (Cherry Blossom)</option>
                          <option>Summer 2027 (Alpine & Coastal)</option>
                          <option>Flexible / Open to Curator Recommendation</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-mono tracking-wider text-primary mb-1.5 font-medium">
                        Specific Desires or Dietary Preferences
                      </label>
                      <textarea
                        rows={3}
                        value={formData.specialNotes}
                        onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                        placeholder="e.g. Raffles Palm Court Suite, 3-Star Michelin Odette table buyout, private catamaran to Lazarus Island, anniversary celebration..."
                        className="w-full bg-white border border-voyanta-border rounded-lg px-3.5 py-2.5 text-sm text-primary focus:outline-none focus:border-luxury transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-light text-white font-display text-sm uppercase tracking-wider font-semibold shadow-voyanta flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Connecting with Singapore Concierge...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-luxury" />
                            Submit Private Inquiry • Voyanta Concierge
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-center text-secondary/70">
                      Singapore Tourism Board TA#03829 • Strict Non-Disclosure Privacy Guarantee • Zero Spam
                    </p>
                  </form>
                </div>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-9 h-9 text-secondary" />
                  </div>
                  <h4 className="font-editorial text-3xl text-primary font-medium">
                    Journey Request Confirmed
                  </h4>
                  <p className="text-sm text-secondary max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-primary">{formData.fullName}</span>. A Senior Journey Curator from our Singapore Atelier will connect via WhatsApp or email within 4 business hours with your preliminary dossier for <span className="font-semibold text-primary">{formData.destination}</span>.
                  </p>

                  <div className="bg-white border border-voyanta-border p-4 rounded-xl max-w-sm mx-auto text-left text-xs space-y-1.5 text-secondary">
                    <div className="flex justify-between">
                      <span className="font-mono uppercase text-[10px]">Reference:</span>
                      <span className="font-semibold text-primary">VYT-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono uppercase text-[10px]">Currency:</span>
                      <span className="font-semibold text-primary">SGD (S$)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono uppercase text-[10px]">Atelier:</span>
                      <span className="font-semibold text-primary">Voyanta Singapore HQ</span>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    Return to Editorial
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
