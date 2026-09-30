export interface RawTourPackage {
  id: string;
  name: string;
  price_sgd: number;
}

export interface RawDestination {
  id: string;
  name: string;
}

export interface RawItinerary {
  id: string;
  days: number;
}

export interface RawHotel {
  id: string;
  name: string;
}

export interface RawGuide {
  id: string;
  name: string;
}

export interface RawActivity {
  id: string;
  name: string;
}

export interface RawVisaInfo {
  id: string;
  country: string;
}

export interface RawPolicy {
  id: string;
  policy: string;
}

export interface RawRecommendation {
  id: string;
  title: string;
}

export interface RawReview {
  id: string;
  rating: number;
}

export interface RawTravelEvent {
  id: string;
  event: string;
}

export interface RawCategory {
  id: string;
  name: string;
}

export interface RawCalendarDay {
  day: number;
  status: string;
}

export interface VoyantaRawDataset {
  brand: string;
  tour_packages: RawTourPackage[];
  destinations: RawDestination[];
  itineraries: RawItinerary[];
  hotels: RawHotel[];
  guides: RawGuide[];
  activities: RawActivity[];
  visa_information: RawVisaInfo[];
  booking_policies: RawPolicy[];
  cancellation_policies: RawPolicy[];
  local_recommendations: RawRecommendation[];
  customer_reviews: RawReview[];
  travel_events: RawTravelEvent[];
  travel_categories: RawCategory[];
  availability_calendar: RawCalendarDay[];
}

export interface EnrichedDestination {
  id: string;
  rawName: string;
  name: string;
  country: string;
  region: 'Marina & Downtown' | 'Heritage Enclaves' | 'Sentosa & Islands' | 'Greenery & Wildlife' | string;
  tagline: string;
  heroImage: string;
  gallery: string[];
  description: string;
  bestTimeToVisit: string;
  flightFromSingapore: string; // Used for transit time from Changi Airport
  climate: string;
  rating: number;
  tags: string[];
}

export interface EnrichedPackage {
  id: string;
  name: string;
  price_sgd: number;
  destination: string;
  country: string;
  region: string;
  days: number;
  travelStyle: 'Luxury' | 'Cultural' | 'Adventure' | 'Nature' | 'Food & Wine' | 'Island Escapes' | 'Wellness' | 'Family';
  availability: 'Available' | 'Guaranteed Departure' | 'Limited (4 Seats Left)' | 'Waitlist';
  highlights: string[];
  inclusions: string[];
  heroImage: string;
  rating: number;
  departureDates: string[];
  groupSize: string;
  featured: boolean;
  itineraryId: string;
}

export interface DayPlan {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  stay: string;
  meals: string;
  insiderTip?: string;
}

export interface EnrichedItinerary {
  id: string;
  days: number;
  packageId: string;
  packageName: string;
  destination: string;
  summary: string;
  dayPlans: DayPlan[];
}

export interface EnrichedHotel {
  id: string;
  name: string;
  destination: string;
  country: string;
  stars: number;
  pricePerNightSGD: number;
  image: string;
  category: string;
  curatedPerk: string;
  quote: string;
  amenities: string[];
}

export interface EnrichedVisaInfo {
  id: string;
  country: string; // Nationality of traveler visiting Singapore
  passportType: string;
  visaStatus: 'Visa-Free' | 'Instant ETA / eVisa' | 'Embassy Visa Required' | 'Visa on Arrival';
  durationDays: string;
  processingTime: string;
  keyRequirements: string[];
  singaporeCitizenNotes: string; // Entry rules for entering Singapore
  validPassportMonths: number;
}

export interface EnrichedPolicy {
  id: string;
  policy: string;
  title: string;
  summary: string;
  detailedPoints: string[];
  singaporeConsumerNotice: string;
}

export interface EnrichedRecommendation {
  id: string;
  title: string;
  category: 'Food' | 'Culture' | 'Shopping' | 'Attractions' | 'Experiences';
  destination: string;
  locationDetails: string;
  editorialReview: string;
  voyantaScore: number;
  tag: string;
}

export interface EnrichedReview {
  id: string;
  rating: number;
  author: string;
  residentialDistrict: string;
  destinationTraveled: string;
  packageName: string;
  date: string;
  reviewTitle: string;
  comment: string;
  avatar: string;
}

export interface EnrichedCategory {
  id: string;
  name: string;
  theme: string;
  tagline: string;
  image: string;
  badge: string;
  packageCount: number;
}

export interface EnrichedCalendarDay {
  day: number;
  status: string;
  dateStr: string;
  month: string;
  monthIndex: number;
  dayOfMonth: number;
  season: 'Monsoon Green' | 'Culinary Season' | 'Grand Prix Festive' | 'Year-End Lightup' | string;
  holidayTag?: string;
  featuredPackage: string;
  priceStartSGD: number;
}
