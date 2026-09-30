'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Menu, X, Phone, Clock, ShieldCheck, ArrowUpRight, Sparkles, Heart, Search, SunMedium } from 'lucide-react';
import QuickInquiryModal from './QuickInquiryModal';
import { useVoyanta } from '@/context/VoyantaContext';
import { useScrollLock } from '@/hooks/useScrollLock';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useScrollLock(mobileMenuOpen);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [singaporeTime, setSingaporeTime] = useState('');

  const {
    wishlist,
    savedHotels,
    setWishlistDrawerOpen,
    currency,
    setCurrency,
    setSearchModalOpen,
  } = useVoyanta();

  const totalSaved = wishlist.length + savedHotels.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    const updateSGTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Singapore',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setSingaporeTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateSGTime();
    const interval = setInterval(updateSGTime, 1000);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Correct section numbering matching the 13 sections on the page
  const navLinks = [
    { label: 'Destinations', href: '#destinations', number: '02' },
    { label: 'Experiences', href: '#experiences', number: '03' },
    { label: 'Itineraries', href: '#itinerary-builder', number: '04' },
    { label: 'Categories', href: '#categories', number: '05' },
    { label: 'Stays', href: '#hotels', number: '06' },
    { label: 'Secrets', href: '#recommendations', number: '07' },
    { label: 'Visa Hub', href: '#visa-centre', number: '08' },
    { label: 'Policies', href: '#booking-policies', number: '09' },
    { label: 'Reviews', href: '#reviews', number: '11' },
    { label: 'Calendar', href: '#calendar', number: '12' },
  ];

  return (
    <>
      {/* Top Editorial Status Ribbon */}
      <div className="bg-primary text-voyanta-sand/80 text-[11px] py-1.5 px-3 sm:px-6 lg:px-8 border-b border-secondary/30 hidden md:block">
        <div className="w-full max-w-[1680px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 lg:gap-4 shrink-0 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="text-luxury font-medium shrink-0">
              Singapore Flagship Atelier
            </span>
            <span className="text-voyanta-sand/40 hidden lg:inline">•</span>
            <span className="hidden lg:flex items-center gap-1 text-voyanta-sand/90 font-mono shrink-0">
              <SunMedium className="w-3.5 h-3.5 text-luxury" />
              Marina Bay 29°C Sunny Breeze
            </span>
            <span className="text-voyanta-sand/40 hidden xl:inline">•</span>
            <span className="hidden xl:flex items-center gap-1 text-voyanta-sand/70 shrink-0">
              <ShieldCheck className="w-3 h-3 text-secondary-light" />
              STB Licensed TA#03829
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 font-mono text-[10px] tracking-wider shrink-0">
            <span className="flex items-center gap-1 text-voyanta-sand/80 shrink-0">
              <Clock className="w-3 h-3 text-luxury" />
              SGT (GMT+8): {singaporeTime || '17:40:00'}
            </span>
            <span className="text-voyanta-sand/40">•</span>
            {/* Dynamic Currency Switcher */}
            <div className="flex items-center gap-1 text-luxury font-semibold shrink-0">
              <span className="text-white/60">CURRENCY:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-primary-dark/80 text-luxury font-mono text-[10px] px-1.5 py-0.5 rounded border border-luxury/30 focus:outline-none cursor-pointer"
              >
                <option value="SGD">SGD (S$)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="AUD">AUD (A$)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-voyanta-bg/95 backdrop-blur-md shadow-voyanta py-2.5 sm:py-3 border-b border-border'
            : 'bg-transparent py-3 sm:py-4'
        }`}
      >
        <div className="w-full max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 xl:gap-3">
          {/* Logo & Brand Identity */}
          <a href="#" className="group flex items-center gap-2 sm:gap-2.5 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 2xl:w-10 2xl:h-10 rounded-full bg-primary text-luxury flex items-center justify-center border border-luxury/40 group-hover:rotate-45 transition-transform duration-500 shadow-sm shrink-0">
              <Compass className="w-4 h-4 sm:w-4.5 sm:h-4.5 2xl:w-5 2xl:h-5" />
            </div>
            <div className="shrink-0">
              <span className="font-editorial text-xl sm:text-2xl 2xl:text-3xl tracking-tight text-primary font-semibold block leading-none">
                VOYANTA
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-secondary block mt-0.5">
                Singapore • Curated Journeys
              </span>
            </div>
          </a>

          {/* Desktop Navigation Hotbar (xl: >= 1280px) - Clean labels without numbers */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/95 backdrop-blur-md border border-border px-3 py-1.5 rounded-full shadow-xs whitespace-nowrap shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-2.5 py-1 text-xs text-primary font-medium tracking-wide hover:text-accent rounded-full transition-colors whitespace-nowrap inline-flex items-center group shrink-0"
              >
                <span className="whitespace-nowrap leading-none font-sans">
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          {/* Compact Hotbar for medium screens (lg: 1024px to 1279px) with 'More' dropdown */}
          <nav className="hidden lg:flex xl:hidden items-center gap-1 bg-white/95 backdrop-blur-md border border-border px-2.5 py-1.5 rounded-full shadow-xs whitespace-nowrap shrink-0">
            {[
              { label: 'Destinations', href: '#destinations' },
              { label: 'Experiences', href: '#experiences' },
              { label: 'Itineraries', href: '#itinerary-builder' },
              { label: 'Stays', href: '#hotels' },
              { label: 'Visa Hub', href: '#visa-centre' },
              { label: 'Calendar', href: '#calendar' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-2.5 py-1 text-xs text-primary font-medium tracking-wide hover:text-accent rounded-full transition-colors whitespace-nowrap inline-flex items-center group shrink-0"
              >
                <span className="whitespace-nowrap leading-none font-sans">
                  {link.label}
                </span>
              </a>
            ))}
            {/* More Dropdown for LG screens */}
            <div className="relative group">
              <button
                type="button"
                className="px-2.5 py-1 text-xs text-secondary hover:text-primary font-medium rounded-full transition-colors inline-flex items-center gap-1 shrink-0"
              >
                <span>More</span>
                <span className="text-[10px]">▾</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-border rounded-xl shadow-xl py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {[
                  { label: 'Categories', href: '#categories' },
                  { label: 'Secrets & Gems', href: '#recommendations' },
                  { label: 'Booking Policies', href: '#booking-policies' },
                  { label: 'Cancellation Terms', href: '#cancellation-policies' },
                  { label: 'Reviews & Stories', href: '#reviews' },
                  { label: 'Contact Atelier', href: '#contact' },
                ].map((subLink) => (
                  <a
                    key={subLink.label}
                    href={subLink.href}
                    className="flex items-center px-3 py-1.5 text-xs text-primary hover:bg-voyanta-sand/50 transition-colors"
                  >
                    <span>{subLink.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Action: Search, Wishlist, Bespoke CTA, Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2 2xl:gap-2.5 shrink-0">
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 2xl:p-2.5 rounded-full border border-border bg-white text-secondary hover:text-primary hover:border-luxury transition-all shadow-xs flex items-center gap-1.5 shrink-0"
              title="Search Singapore Experiences (Cmd+K)"
              aria-label="Search"
            >
              <Search className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
              <span className="hidden 2xl:inline text-[10px] font-mono text-secondary/60 bg-voyanta-bg px-1.5 py-0.5 rounded border border-border">
                ⌘K
              </span>
            </button>

            {/* Saved Wishlist Drawer Trigger */}
            <button
              onClick={() => setWishlistDrawerOpen(true)}
              className="relative p-2 2xl:p-2.5 rounded-full border border-border bg-white text-secondary hover:text-accent hover:border-luxury transition-all shadow-xs flex items-center gap-1.5 shrink-0"
              title="View Curated Shortlist"
              aria-label="Saved experiences"
            >
              <Heart className={`w-3.5 h-3.5 2xl:w-4 2xl:h-4 ${totalSaved > 0 ? 'fill-accent text-accent' : ''}`} />
              {totalSaved > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-white font-mono text-[9px] flex items-center justify-center font-bold">
                  {totalSaved}
                </span>
              )}
            </button>

            {/* Bespoke Inquiry CTA - Fully visible & never cut off */}
            <button
              onClick={() => setInquiryModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 2xl:px-4 py-2 2xl:py-2.5 rounded-full bg-primary hover:bg-primary-light text-white text-[11px] 2xl:text-xs font-display uppercase tracking-wider font-semibold shadow-voyanta border border-luxury/30 transition-all duration-300 hover:scale-[1.02] whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 text-luxury shrink-0" />
              <span>Bespoke Inquiry</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-full border border-border bg-white text-primary hover:bg-voyanta-sand transition-colors shrink-0"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Luxury Slide-Over Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-[9999] lg:hidden"
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-primary/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-voyanta-bg border-l border-border p-6 flex flex-col justify-between overflow-y-auto overscroll-contain"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-border">
                  <div>
                    <span className="font-editorial text-2xl tracking-tight text-primary font-semibold">
                      VOYANTA
                    </span>
                    <span className="block font-mono text-[9px] uppercase tracking-widest text-secondary">
                      Singapore Luxury Travel Atelier
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-full border border-border text-primary hover:bg-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Search and Currency Bar */}
                <div className="py-4 border-b border-border flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSearchModalOpen(true);
                    }}
                    className="flex-1 py-2 px-3 rounded-lg bg-white border border-border text-xs font-mono text-secondary flex items-center gap-2"
                  >
                    <Search className="w-3.5 h-3.5 text-luxury" />
                    <span>Search experiences...</span>
                  </button>

                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as any)}
                    className="bg-white text-primary font-mono text-xs px-2 py-2 rounded-lg border border-border"
                  >
                    <option value="SGD">SGD</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="AUD">AUD</option>
                    <option value="JPY">JPY</option>
                  </select>
                </div>

                <div className="py-4 space-y-1">
                  {[
                    { label: '01. Landing Experience', href: '#', number: '01' },
                    { label: '02. Destinations', href: '#destinations', number: '02' },
                    { label: '03. Featured Experiences', href: '#experiences', number: '03' },
                    { label: '04. Itinerary Builder', href: '#itinerary-builder', number: '04' },
                    { label: '05. Travel Categories', href: '#categories', number: '05' },
                    { label: '06. Hotels & Stays', href: '#hotels', number: '06' },
                    { label: '07. Local Recommendations', href: '#recommendations', number: '07' },
                    { label: '08. Visa Information', href: '#visa-centre', number: '08' },
                    { label: '09. Booking Policies', href: '#booking-policies', number: '09' },
                    { label: '10. Cancellation Policies', href: '#cancellation-policies', number: '10' },
                    { label: '11. Reviews & Stories', href: '#reviews', number: '11' },
                    { label: '12. Travel Calendar', href: '#calendar', number: '12' },
                    { label: '13. Contact & Inquiry', href: '#contact', number: '13' },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white text-primary text-base font-editorial transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-secondary/60">{link.number}</span>
                        <span className="group-hover:text-accent font-medium text-base">{link.label.split('. ')[1]}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-secondary/40 group-hover:text-accent transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setWishlistDrawerOpen(true);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white border border-border text-xs font-mono uppercase tracking-wider text-primary flex items-center justify-center gap-2"
                >
                  <Heart className={`w-3.5 h-3.5 ${totalSaved > 0 ? 'fill-accent text-accent' : ''}`} />
                  <span>View Shortlist ({totalSaved})</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setInquiryModalOpen(true);
                  }}
                  className="w-full py-3 rounded-xl bg-primary text-white text-xs font-display uppercase tracking-wider font-semibold shadow-voyanta flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-luxury" />
                  Start Private Journey Request
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Inquiry Modal */}
      <QuickInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </>
  );
}
