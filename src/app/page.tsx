'use client';

import { useState } from 'react';
import Navigation from '@/components/common/Navigation';
import Hero from '@/components/sections/01_Hero';
import DestinationDiscovery from '@/components/sections/02_DestinationDiscovery';
import FeaturedExperiences from '@/components/sections/03_FeaturedExperiences';
import JourneyBuilder from '@/components/sections/04_JourneyBuilder';
import TravelCategories from '@/components/sections/05_TravelCategories';
import HotelsStays from '@/components/sections/06_HotelsStays';
import LocalRecommendations from '@/components/sections/07_LocalRecommendations';
import VisaCentre from '@/components/sections/08_VisaCentre';
import BookingPolicies from '@/components/sections/09_BookingPolicies';
import CancellationPolicies from '@/components/sections/10_CancellationPolicies';
import ReviewsStories from '@/components/sections/11_ReviewsStories';
import TravelCalendar from '@/components/sections/12_TravelCalendar';
import ContactInquiry from '@/components/sections/13_ContactInquiry';
import Footer from '@/components/common/Footer';
import QuickInquiryModal from '@/components/common/QuickInquiryModal';
import GsapMarquee from '@/components/common/GsapMarquee';
import WishlistDrawer from '@/components/common/WishlistDrawer';
import GlobalSearchModal from '@/components/common/GlobalSearchModal';
import { VoyantaProvider } from '@/context/VoyantaContext';

import {
  destinations,
  packages,
  itineraries,
  hotels,
  visaInfo,
  bookingPolicies,
  cancellationPolicies,
  recommendations,
  reviews,
  travelCategories,
  availabilityCalendar
} from '@/lib/dataset';
import { EnrichedPackage, EnrichedHotel, EnrichedCalendarDay } from '@/types';

export default function Home() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedPackageTitle, setSelectedPackageTitle] = useState<string | undefined>();
  const [selectedDestinationTitle, setSelectedDestinationTitle] = useState<string | undefined>();
  const [activeItineraryId, setActiveItineraryId] = useState<string | undefined>('ITI001');

  const handleOpenGeneralInquiry = () => {
    setSelectedPackageTitle(undefined);
    setSelectedDestinationTitle(undefined);
    setInquiryModalOpen(true);
  };

  const handleSelectDestination = (destName: string) => {
    setSelectedDestinationTitle(destName);
    setSelectedPackageTitle(undefined);
    setInquiryModalOpen(true);
  };

  const handleBookPackage = (pkg: EnrichedPackage) => {
    setSelectedPackageTitle(`${pkg.name} (${pkg.id} • S$${pkg.price_sgd})`);
    setSelectedDestinationTitle(pkg.destination);
    setInquiryModalOpen(true);
  };

  const handleViewItinerary = (itineraryId: string) => {
    setActiveItineraryId(itineraryId);
    const elem = document.getElementById('itinerary-builder');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (categoryName: string) => {
    const elem = document.getElementById('experiences');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookStay = (hotel: EnrichedHotel) => {
    setSelectedPackageTitle(`Stay at ${hotel.name} (${hotel.destination})`);
    setSelectedDestinationTitle(hotel.destination);
    setInquiryModalOpen(true);
  };

  const handleSelectCalendarDeparture = (dayItem: EnrichedCalendarDay) => {
    setSelectedPackageTitle(`${dayItem.featuredPackage} [Departure: ${dayItem.dateStr}]`);
    setInquiryModalOpen(true);
  };

  return (
    <VoyantaProvider>
      <main className="min-h-screen bg-voyanta-bg text-primary overflow-x-hidden w-full">
        {/* 00. Global Navigation */}
        <Navigation />

        {/* 01. Immersive Landing Experience */}
        <Hero onOpenInquiry={handleOpenGeneralInquiry} />

        {/* GSAP Interactive Marquee Ribbon */}
        <GsapMarquee />

        {/* 02. Destination Discovery */}
        <DestinationDiscovery
          destinations={destinations}
          onSelectDestination={handleSelectDestination}
        />

        {/* 03. Featured Travel Experiences */}
        <FeaturedExperiences
          packages={packages}
          onBookPackage={handleBookPackage}
          onViewItinerary={handleViewItinerary}
        />

        {/* 04. Interactive Journey Builder */}
        <JourneyBuilder
          itineraries={itineraries}
          activeItineraryId={activeItineraryId}
          onOpenInquiry={(itineraryName) => {
            setSelectedPackageTitle(`Customized: ${itineraryName}`);
            setInquiryModalOpen(true);
          }}
        />

        {/* 05. Travel Categories */}
        <TravelCategories
          categories={travelCategories}
          onSelectCategory={handleSelectCategory}
        />

        {/* 06. Hotels & Stays */}
        <HotelsStays
          hotels={hotels}
          onBookStay={handleBookStay}
        />

        {/* 07. Local Recommendations */}
        <LocalRecommendations
          recommendations={recommendations}
        />

        {/* 08. Visa Information Centre */}
        <VisaCentre
          visaData={visaInfo}
        />

        {/* 09. Booking Policies */}
        <BookingPolicies
          bookingPolicies={bookingPolicies}
        />

        {/* 10. Cancellation Policies */}
        <CancellationPolicies
          cancellationPolicies={cancellationPolicies}
        />

        {/* 11. Reviews & Stories */}
        <ReviewsStories
          reviews={reviews}
        />

        {/* 12. Travel Calendar */}
        <TravelCalendar
          calendarData={availabilityCalendar}
          onSelectDeparture={handleSelectCalendarDeparture}
        />

        {/* 13. Contact & Inquiry */}
        <ContactInquiry />

        {/* Footer */}
        <Footer />

        {/* Interactive Shortlist / Wishlist Slide-Over Drawer */}
        <WishlistDrawer
          onBookShortlist={(summary) => {
            setSelectedPackageTitle(summary);
            setInquiryModalOpen(true);
          }}
        />

        {/* Global Instant Search Modal (Cmd+K / Search Button) */}
        <GlobalSearchModal
          onSelectPackage={(pkgTitle) => {
            setSelectedPackageTitle(pkgTitle);
            setInquiryModalOpen(true);
          }}
          onSelectDestination={(destName) => {
            handleSelectDestination(destName);
          }}
        />

        {/* Global Interactive Booking & Inquiry Modal */}
        <QuickInquiryModal
          isOpen={inquiryModalOpen}
          onClose={() => setInquiryModalOpen(false)}
          preselectedPackage={selectedPackageTitle}
          preselectedDestination={selectedDestinationTitle}
        />
      </main>
    </VoyantaProvider>
  );
}
