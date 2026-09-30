'use client';

import { Compass, ShieldCheck, ArrowUp, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-dark text-white border-t border-secondary/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Top Tier */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary border border-luxury/40 text-luxury flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="font-editorial text-3xl font-semibold tracking-tight text-white block leading-none">
                  VOYANTA
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-luxury block mt-1">
                  Singapore • Curated Journeys
                </span>
              </div>
            </div>

            <p className="text-xs text-voyanta-sand/70 font-sans max-w-sm leading-relaxed">
              Voyanta is a premier Singapore-based luxury travel atelier dedicated to slow, experiential, and culturally profound journeys across Asia, Europe, and Australasia.
            </p>

            <div className="pt-2 text-xs font-mono text-voyanta-sand/60 space-y-1">
              <div>Singapore Tourism Board License: TA #03829</div>
              <div>CASETrust Accredited Travel Atelier</div>
            </div>
          </div>

          {/* Nav Links Col 1 */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-luxury font-semibold">
              Journeys & Stays
            </h4>
            <ul className="space-y-2 text-xs font-sans text-voyanta-sand/80">
              <li><a href="#destinations" className="hover:text-luxury transition-colors">02. Destinations</a></li>
              <li><a href="#experiences" className="hover:text-luxury transition-colors">03. Featured Packages</a></li>
              <li><a href="#itinerary-builder" className="hover:text-luxury transition-colors">04. Itinerary Builder</a></li>
              <li><a href="#categories" className="hover:text-luxury transition-colors">05. Travel Styles</a></li>
              <li><a href="#hotels" className="hover:text-luxury transition-colors">06. Certified Stays</a></li>
              <li><a href="#recommendations" className="hover:text-luxury transition-colors">07. Local Secrets</a></li>
            </ul>
          </div>

          {/* Nav Links Col 2 */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-luxury font-semibold">
              Traveler Services
            </h4>
            <ul className="space-y-2 text-xs font-sans text-voyanta-sand/80">
              <li><a href="#visa-centre" className="hover:text-luxury transition-colors">08. Singapore Visa Hub</a></li>
              <li><a href="#booking-policies" className="hover:text-luxury transition-colors">09. Booking Policies</a></li>
              <li><a href="#cancellation-policies" className="hover:text-luxury transition-colors">10. Cancellation Shield</a></li>
              <li><a href="#reviews" className="hover:text-luxury transition-colors">11. Reviews & Stories</a></li>
              <li><a href="#calendar" className="hover:text-luxury transition-colors">12. Travel Calendar</a></li>
              <li><a href="#contact" className="hover:text-luxury transition-colors">13. Contact Atelier</a></li>
            </ul>
          </div>

          {/* Singapore Atelier */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-luxury font-semibold">
              Singapore Presence
            </h4>
            <div className="space-y-2 text-xs font-sans text-voyanta-sand/80 leading-relaxed">
              <p>290 Orchard Road, Paragon Tower 1, #18-08, Singapore 238859</p>
              <p className="font-mono text-[11px] text-luxury">+65 6789 2026</p>
              <p className="font-mono text-[11px]">concierge@voyanta.sg</p>
              <p className="text-[11px] text-white/50">Changi VIP Lounges T1-T4</p>
            </div>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-voyanta-sand/60">
          <div>
            &copy; {new Date().getFullYear()} Voyanta Travel Singapore Pte. Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-luxury">All Prices in Singapore Dollars (SGD)</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-white hover:text-luxury transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
