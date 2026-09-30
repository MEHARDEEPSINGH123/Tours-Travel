'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, Heart, Sparkles, Clock, MapPin, Building2, Send } from 'lucide-react';
import Image from 'next/image';
import { useVoyanta } from '@/context/VoyantaContext';
import { useScrollLock } from '@/hooks/useScrollLock';

interface WishlistDrawerProps {
  onBookShortlist: (shortlistSummary: string) => void;
}

export default function WishlistDrawer({ onBookShortlist }: WishlistDrawerProps) {
  const {
    wishlist,
    savedHotels,
    toggleWishlistPackage,
    toggleWishlistHotel,
    clearWishlist,
    wishlistDrawerOpen,
    setWishlistDrawerOpen,
    formatPrice,
    currency,
  } = useVoyanta();

  useScrollLock(wishlistDrawerOpen);

  const totalCount = wishlist.length + savedHotels.length;

  const totalEstimatedSGD =
    wishlist.reduce((sum, item) => sum + item.price_sgd, 0) +
    savedHotels.reduce((sum, item) => sum + item.pricePerNightSGD, 0);

  const handleCheckout = () => {
    const pkgNames = wishlist.map((p) => `${p.name} (${formatPrice(p.price_sgd)})`);
    const hotelNames = savedHotels.map((h) => `${h.name} (${formatPrice(h.pricePerNightSGD)}/night)`);
    const summary = [...pkgNames, ...hotelNames].join('; ');
    setWishlistDrawerOpen(false);
    onBookShortlist(`Custom Shortlist (${totalCount} experiences): ${summary}`);
  };

  return (
    <AnimatePresence>
      {wishlistDrawerOpen && (
        <div
          className="fixed inset-0 z-[9999] overflow-hidden"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWishlistDrawerOpen(false)}
            className="fixed inset-0 bg-primary/70 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="w-screen max-w-md bg-voyanta-bg border-l border-border shadow-2xl flex flex-col justify-between"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-border bg-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-luxury/20 text-luxury-dark flex items-center justify-center">
                    <Heart className="w-4 h-4 fill-luxury text-luxury" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-2xl text-primary font-medium leading-none">
                      Curated Shortlist
                    </h3>
                    <span className="font-mono text-[10px] uppercase text-secondary tracking-widest mt-0.5 block">
                      {totalCount} {totalCount === 1 ? 'Experience' : 'Experiences'} Saved
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {totalCount > 0 && (
                    <button
                      onClick={clearWishlist}
                      className="text-[10px] font-mono uppercase text-secondary/60 hover:text-accent transition-colors p-1.5"
                      title="Clear All"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={() => setWishlistDrawerOpen(false)}
                    className="p-1.5 rounded-full hover:bg-voyanta-bg text-secondary hover:text-primary transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Drawer Body Items List */}
              <div
                className="flex-1 overflow-y-auto overscroll-contain p-6 space-y-4"
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
              >
                {totalCount === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white border border-border mx-auto flex items-center justify-center text-secondary/40 shadow-sm">
                      <Heart className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-editorial text-2xl text-primary font-medium">
                        Your Shortlist is Empty
                      </h4>
                      <p className="text-xs text-secondary font-sans mt-1 max-w-xs mx-auto leading-relaxed">
                        Tap the heart icon on any Singapore package or luxury hotel to save experiences into your private dossier.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Packages Section */}
                    {wishlist.length > 0 && (
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-secondary/70 block">
                          Saved Packages ({wishlist.length})
                        </span>
                        {wishlist.map((pkg) => (
                          <div
                            key={pkg.id}
                            className="bg-white p-3.5 rounded-xl border border-border flex gap-3 items-center group shadow-sm hover:border-luxury/40 transition-colors"
                          >
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                              <Image
                                src={pkg.heroImage}
                                alt={pkg.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-mono text-accent uppercase block truncate">
                                {pkg.destination}
                              </span>
                              <h5 className="font-editorial text-base text-primary font-medium truncate">
                                {pkg.name}
                              </h5>
                              <div className="flex items-center justify-between mt-1">
                                <span className="font-mono text-xs font-semibold text-primary">
                                  {formatPrice(pkg.price_sgd)}
                                </span>
                                <span className="text-[10px] font-mono text-secondary">
                                  {pkg.days} Days
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => toggleWishlistPackage(pkg)}
                              className="text-secondary/40 hover:text-accent p-1.5 transition-colors"
                              title="Remove"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Hotels Section */}
                    {savedHotels.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-secondary/70 block">
                          Saved Hotels ({savedHotels.length})
                        </span>
                        {savedHotels.map((hotel) => (
                          <div
                            key={hotel.id}
                            className="bg-white p-3.5 rounded-xl border border-border flex gap-3 items-center group shadow-sm hover:border-luxury/40 transition-colors"
                          >
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                              <Image
                                src={hotel.image}
                                alt={hotel.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-mono text-luxury-dark uppercase block truncate">
                                {hotel.destination}
                              </span>
                              <h5 className="font-editorial text-base text-primary font-medium truncate">
                                {hotel.name}
                              </h5>
                              <div className="flex items-center justify-between mt-1">
                                <span className="font-mono text-xs font-semibold text-primary">
                                  {formatPrice(hotel.pricePerNightSGD)}/night
                                </span>
                                <span className="text-[10px] font-mono text-secondary">
                                  5-Star Luxury
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => toggleWishlistHotel(hotel)}
                              className="text-secondary/40 hover:text-accent p-1.5 transition-colors"
                              title="Remove"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Drawer Footer with Dynamic Calculation */}
              {totalCount > 0 && (
                <div className="p-6 bg-white border-t border-border space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-secondary font-mono">
                      <span>Total Estimated Cost:</span>
                      <span className="text-secondary/60">Currency: {currency}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-editorial text-3xl font-semibold text-primary">
                        {formatPrice(totalEstimatedSGD)}
                      </span>
                      <span className="text-[11px] font-mono text-secondary">
                        All-Inclusive Estimates
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-light text-white font-display text-xs uppercase tracking-wider font-semibold shadow-voyanta flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <Send className="w-3.5 h-3.5 text-luxury" />
                    <span>Inquire for All {totalCount} Items</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <p className="text-[10px] font-mono text-center text-secondary/60">
                    Custom itinerary generated directly with our Singapore Atelier
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
