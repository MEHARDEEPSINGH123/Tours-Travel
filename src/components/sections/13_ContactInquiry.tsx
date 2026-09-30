'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Sparkles, Send, CheckCircle2, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

export default function ContactInquiry() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'Kyoto & Arashiyama',
    dates: 'Autumn 2026',
    guests: '2 Travellers',
    budgetSGD: 'S$8,000 - S$15,000 / couple',
    vision: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-primary text-white relative overflow-hidden">
      {/* Editorial Watermark */}
      <div className="absolute bottom-0 right-0 text-[18vw] font-editorial text-white/[0.02] select-none pointer-events-none leading-none -mb-16">
        ATELIER
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Singapore Atelier & Presence (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury/20 border border-luxury/40 text-xs font-mono tracking-wider text-luxury">
                <Sparkles className="w-3.5 h-3.5 text-luxury" />
                <span>13 / CONTACT & INQUIRY</span>
              </div>
              <h2 className="font-editorial text-4xl sm:text-6xl text-white font-normal tracking-tight">
                Initiate Your Journey
              </h2>
              <p className="text-voyanta-sand/80 text-base sm:text-lg font-sans leading-relaxed">
                Connect with our Senior Journey Curators in Singapore. We welcome private appointments at our Orchard Road Atelier, Marina Bay Suite, or over encrypted digital consultations.
              </p>
            </div>

            {/* Singapore Presence Cards */}
            <div className="space-y-4 pt-4 border-t border-white/15">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-luxury text-xs font-mono uppercase tracking-wider font-semibold">
                  <MapPin className="w-4 h-4" />
                  <span>Voyanta Flagship Atelier</span>
                </div>
                <p className="text-sm text-white font-editorial">
                  290 Orchard Road, Paragon Tower 1, Level 18, Singapore 238859
                </p>
                <span className="text-[11px] font-mono text-white/50 block">
                  Private Valet Parking & Champagne Consultation Lounge
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-luxury text-xs font-mono uppercase tracking-wider font-semibold">
                  <MapPin className="w-4 h-4" />
                  <span>Marina Bay Financial Suite</span>
                </div>
                <p className="text-sm text-white font-editorial">
                  Marina Bay Financial Centre (MBFC) Tower 2, Singapore 018983
                </p>
                <span className="text-[11px] font-mono text-white/50 block">
                  By Prior Appointment for Corporate & Family Office Travelers
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-luxury uppercase">
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp / Direct</span>
                  </div>
                  <p className="text-sm text-white font-mono font-semibold">+65 6789 2026</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-luxury uppercase">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Curator Email</span>
                  </div>
                  <p className="text-sm text-white font-mono font-semibold">concierge@voyanta.sg</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-white/60">
              <ShieldCheck className="w-4 h-4 text-secondary-light" />
              <span>Singapore Tourism Board Travel Agent License #03829</span>
            </div>
          </div>

          {/* Right Column: Modern Interactive Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white text-primary rounded-3xl p-8 sm:p-12 border border-border shadow-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-editorial text-3xl sm:text-4xl text-primary font-medium tracking-tight">
                    Commission a Custom Dossier
                  </h3>
                  <p className="text-xs text-secondary font-sans mt-1">
                    Please provide preliminary specifications. We will curate a dedicated itinerary draft within 4 business hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-primary mb-1 font-medium">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Su-Lyn Tan"
                      className="w-full bg-voyanta-bg border border-border rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-luxury"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-primary mb-1 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="su-lyn@singapore.com"
                      className="w-full bg-voyanta-bg border border-border rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-luxury"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-primary mb-1 font-medium">
                      Contact / WhatsApp (+65) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+65 9123 4567"
                      className="w-full bg-voyanta-bg border border-border rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-luxury"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-primary mb-1 font-medium">
                      Intended Travel Dates
                    </label>
                    <input
                      type="text"
                      value={formState.dates}
                      onChange={(e) => setFormState({ ...formState, dates: e.target.value })}
                      placeholder="e.g. Mid-October 2026"
                      className="w-full bg-voyanta-bg border border-border rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-luxury"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-primary mb-1 font-medium">
                      Destination Focus
                    </label>
                    <select
                      value={formState.destination}
                      onChange={(e) => setFormState({ ...formState, destination: e.target.value })}
                      className="w-full bg-voyanta-bg border border-border rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-luxury"
                    >
                      <option>Marina Bay & Civic District (Singapore)</option>
                      <option>Sentosa Island & Capella Clifftops (Singapore)</option>
                      <option>Raffles Hotel & Colonial Palm Court (Singapore)</option>
                      <option>Southern Islands Private Catamaran Haven (Singapore)</option>
                      <option>Katong & Joo Chiat Peranakan Heritage (Singapore)</option>
                      <option>Dempsey Hill & UNESCO Botanic Gardens (Singapore)</option>
                      <option>Pulau Ubin & Chek Jawa Mangrove Expedition (Singapore)</option>
                      <option>Mandai Rainforest & Night Safari VIP (Singapore)</option>
                      <option>Multi-Enclave Grand Singapore Odyssey</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-primary mb-1 font-medium">
                      Indicative Budget (SGD)
                    </label>
                    <select
                      value={formState.budgetSGD}
                      onChange={(e) => setFormState({ ...formState, budgetSGD: e.target.value })}
                      className="w-full bg-voyanta-bg border border-border rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-luxury"
                    >
                      <option>S$5,000 - S$10,000 per traveler</option>
                      <option>S$10,000 - S$20,000 per traveler</option>
                      <option>S$20,000+ Bespoke Ultra-Luxury</option>
                      <option>Flexible / To Be Advised</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-primary mb-1 font-medium">
                    Vision, Preferred Pace & Special Celebrations
                  </label>
                  <textarea
                    rows={4}
                    value={formState.vision}
                    onChange={(e) => setFormState({ ...formState, vision: e.target.value })}
                    placeholder="Describe your ideal journey: private ryokan with open-air hot spring, Michelin 3-star kaiseki, helicopter transfers, anniversary surprise..."
                    className="w-full bg-voyanta-bg border border-border rounded-xl px-4 py-2.5 text-xs text-primary focus:outline-none focus:border-luxury resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 rounded-xl bg-primary hover:bg-primary-light text-white font-display text-xs uppercase tracking-wider font-semibold shadow-voyanta flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Connecting with Singapore Atelier...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-luxury" />
                      Submit Dossier Request • Voyanta Concierge
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-secondary" />
                </div>
                <h4 className="font-editorial text-3xl sm:text-4xl text-primary font-medium">
                  Inquiry Successfully Lodged
                </h4>
                <p className="text-xs text-secondary max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-primary">{formState.name}</strong>. Your dossier request has been routed to our Senior Destination Specialist for <strong className="text-primary">{formState.destination}</strong>. We will contact you via WhatsApp / phone shortly.
                </p>
                <div className="p-4 bg-voyanta-bg rounded-xl max-w-xs mx-auto text-xs font-mono text-secondary">
                  Dossier Ref: VYT-SG-2026-{Math.floor(1000 + Math.random() * 9000)}
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-lg border border-primary text-primary text-xs font-mono uppercase tracking-wider hover:bg-primary hover:text-white transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
