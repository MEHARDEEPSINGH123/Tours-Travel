import rawData from '@/data/voyanta_travel_dataset.json';
import {
  VoyantaRawDataset,
  EnrichedDestination,
  EnrichedPackage,
  EnrichedItinerary,
  EnrichedHotel,
  EnrichedVisaInfo,
  EnrichedPolicy,
  EnrichedRecommendation,
  EnrichedReview,
  EnrichedCategory,
  EnrichedCalendarDay,
  DayPlan
} from '@/types';

// Cast the loaded JSON
export const rawVoyantaData: VoyantaRawDataset = rawData as VoyantaRawDataset;

// Premium curated image library with high-res Unsplash editorial photography of SINGAPORE
const SINGAPORE_DESTINATIONS_METADATA = [
  {
    name: "Marina Bay & Civic District",
    country: "Singapore",
    region: "Marina & Downtown",
    tagline: "Futuristic Supertrees, SkyPark Horizons & Iconic Bayfront",
    heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1506351421178-63b52a2d2562?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Singapore's architectural crowning jewel. Private twilight champagne cruises across the bay, after-hours access to the Cloud Forest mist dome, and panoramic views from Marina Bay Sands SkyPark.",
    bestTimeToVisit: "Year-Round (Spectacular F1 Season in Sep & Festive Lightups in Dec)",
    flightFromSingapore: "18 mins private limousine from Changi T3",
    climate: "Tropical Maritime (27°C - 31°C with sea breezes)",
    rating: 4.99,
    tags: ["Skyline", "Gardens by the Bay", "Architecture", "Fine Dining"]
  },
  {
    name: "Sentosa Island & Cove",
    country: "Singapore",
    region: "Sentosa & Islands",
    tagline: "Rainforest Clifftop Villas, Secluded Coves & Yacht Havens",
    heroImage: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "An idyllic island sanctuary 15 minutes from the central financial district. Clifftop tented villas at Capella, private superyacht charters departing ONE°15 Marina, and secluded sunset dinners at Tanjong Beach.",
    bestTimeToVisit: "Year-Round (Best beach breeze from Mar - Oct)",
    flightFromSingapore: "25 mins express limousine from Changi Airport",
    climate: "Tropical Coastal (28°C - 32°C)",
    rating: 4.97,
    tags: ["Beach Sanctuary", "Private Yacht", "Spa Retreat", "Capella Stays"]
  },
  {
    name: "Civic District & Raffles",
    country: "Singapore",
    region: "Heritage Enclaves",
    tagline: "Colonial Neoclassical Splendour & Palm Court Romance",
    heroImage: "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506351421178-63b52a2d2562?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "The historical heart where Singapore's maritime tale began. Stay in 1887 colonial luxury suites at Raffles Hotel, walk private galleries at the National Gallery, and experience bespoke gin tastings at Long Bar.",
    bestTimeToVisit: "Year-Round (Art Week in Jan & National Day in Aug)",
    flightFromSingapore: "20 mins direct from Changi Airport VIP terminal",
    climate: "Tropical (26°C - 31°C)",
    rating: 4.98,
    tags: ["Colonial Heritage", "Raffles Suites", "Art Museums", "Cocktail History"]
  },
  {
    name: "Katong & Joo Chiat",
    country: "Singapore",
    region: "Heritage Enclaves",
    tagline: "Peranakan Pastel Shophouses & Royal Nyonya Gastronomy",
    heroImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Singapore's premier Peranakan cultural enclave. Stroll ornate ceramic tile facades, take a private masterclass in beaded slipper craftsmanship, and feast on Michelin-recommended Laksa and Ayam Buah Keluak.",
    bestTimeToVisit: "Year-Round (Vibrant festivities during Chinese New Year)",
    flightFromSingapore: "15 mins direct from Changi Airport",
    climate: "Tropical Coastal (27°C - 31°C)",
    rating: 4.95,
    tags: ["Peranakan Heritage", "Ceramic Tiles", "Nyonya Cuisine", "Shophouse Architecture"]
  },
  {
    name: "Southern Islands & Lazarus Bay",
    country: "Singapore",
    region: "Sentosa & Islands",
    tagline: "Turquoise Secluded Lagoons & Private Catamaran Escapes",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Singapore's hidden maritime paradise. Sail on a private 50ft luxury catamaran to Lazarus Island, anchor in emerald bays for paddleboarding, and indulge in a private chef champagne seafood grill aboard.",
    bestTimeToVisit: "Mar - Nov (Calm waters & sunny offshore breezes)",
    flightFromSingapore: "30 mins limousine to Marina + 20 mins private cruise",
    climate: "Equatorial Marine (28°C - 32°C)",
    rating: 4.96,
    tags: ["Private Yacht", "Lazarus Lagoon", "Water Sports", "Champagne Cruise"]
  },
  {
    name: "Dempsey Hill & Botanic Gardens",
    country: "Singapore",
    region: "Greenery & Wildlife",
    tagline: "UNESCO Heritage Rainforest & Colonial Barrack Gastronomy",
    heroImage: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Former colonial army barracks transformed into secluded culinary retreats under banyan canopies. Includes private morning VIP tours of the National Orchid Garden and degustations at Michelin-starred Candlenut.",
    bestTimeToVisit: "Year-Round (Lush flowering gardens all months)",
    flightFromSingapore: "22 mins limousine from Changi T3",
    climate: "Tropical Garden (26°C - 30°C)",
    rating: 4.98,
    tags: ["Botanic Gardens", "UNESCO", "Michelin Dining", "Colonial Barracks"]
  },
  {
    name: "Pulau Ubin & Chek Jawa",
    country: "Singapore",
    region: "Greenery & Wildlife",
    tagline: "1960s Rustic Island Heritage & Coastal Mangrove Sanctuary",
    heroImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Step back into vintage 1960s Singapore. Private motorized wooden bumboat transport, guided kayak explorations through ancient mangroves, coastal boardwalks over coral reefs, and authentic fresh kelong seafood.",
    bestTimeToVisit: "Nov - Aug (Dry morning trails & birdwatching)",
    flightFromSingapore: "15 mins limousine to Changi Point Ferry Terminal",
    climate: "Coastal Rainforest (27°C - 31°C)",
    rating: 4.93,
    tags: ["Vintage Kampong", "Mangrove Kayak", "Chek Jawa", "Eco-Sanctuary"]
  },
  {
    name: "Chinatown & Telok Ayer",
    country: "Singapore",
    region: "Heritage Enclaves",
    tagline: "Sacred Pagodas, Heritage Clans & Haute Speakeasies",
    heroImage: "https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546874177-9e664107314e?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "A harmonious contrast of sacred traditions and Michelin-starred dining. Marvel at the Buddha Tooth Relic Temple, explore hidden heritage alleys with private historians, and sip rare bespoke spirits in restored shophouses.",
    bestTimeToVisit: "Year-Round (Peak lantern glow in Jan - Feb & Sep)",
    flightFromSingapore: "20 mins direct from Changi Airport",
    climate: "Tropical Urban (27°C - 31°C)",
    rating: 4.94,
    tags: ["Temples", "Heritage Shophouses", "Speakeasies", "Hawker Legends"]
  },
  {
    name: "Kampong Gelam & Arab Street",
    country: "Singapore",
    region: "Heritage Enclaves",
    tagline: "Golden Dome Sultan Mosque, Artisanal Attars & Silk Alleys",
    heroImage: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Singapore's historic royal Malay precinct. Admire the majestic Sultan Mosque, design your custom signature perfume with fourth-generation attar masters, and explore vibrant boutique lanes.",
    bestTimeToVisit: "Year-Round (Spectacular Ramadan bazaar season)",
    flightFromSingapore: "18 mins limousine from Changi T3",
    climate: "Tropical (27°C - 31°C)",
    rating: 4.95,
    tags: ["Malay Royalty", "Sultan Mosque", "Custom Perfumes", "Haji Lane"]
  },
  {
    name: "Orchard & Emerald Hill",
    country: "Singapore",
    region: "Marina & Downtown",
    tagline: "Haute Couture Flagships & Secluded Chinese Baroque Terraces",
    heroImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Where Asia's premier luxury boulevard meets historic Emerald Hill shophouses. Private VIP salon appointments at Paragon and ION Orchard, followed by intimate botanical gin pairings in heritage courtyard bars.",
    bestTimeToVisit: "Nov - Jan (Famous Christmas on A Great Street lightup)",
    flightFromSingapore: "20 mins direct from Changi Airport",
    climate: "Tropical Urban (27°C - 32°C)",
    rating: 4.96,
    tags: ["Luxury Shopping", "Emerald Hill", "High Tea", "Private Salons"]
  },
  {
    name: "Mandai Rainforest & Wildlife Reserve",
    country: "Singapore",
    region: "Greenery & Wildlife",
    tagline: "World's First Night Safari & Biodiverse Bird Sanctuary",
    heroImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "Private electric buggy tours across the world's premier wildlife parks. VIP encounters with endangered rhinos, private aviary feeding at Bird Paradise, and private nocturnal safari expeditions.",
    bestTimeToVisit: "Year-Round (Evening cooler breezes for Night Safari)",
    flightFromSingapore: "28 mins express limousine from Changi",
    climate: "Equatorial Rainforest (26°C - 30°C)",
    rating: 4.98,
    tags: ["Night Safari", "Bird Paradise", "VIP Buggy", "Rainforest"]
  },
  {
    name: "Jewel Changi & East Coast Lagoon",
    country: "Singapore",
    region: "Marina & Downtown",
    tagline: "World-Famous HSBC Rain Vortex & Coastal Seafood Enclaves",
    heroImage: "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=1600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506351421178-63b52a2d2562?q=80&w=1200&auto=format&fit=crop"
    ],
    description: "The world's highest indoor waterfall surrounded by 2,000 lush trees. Experience canopy bridge walks, fast-track baggage VIP check-in, and sunset oceanfront pepper crab banquets on East Coast Lagoon.",
    bestTimeToVisit: "Year-Round (Seamless arrival and departure experience)",
    flightFromSingapore: "Directly located at Singapore Changi Airport (SIN)",
    climate: "Climate-Controlled / Coastal (25°C - 30°C)",
    rating: 4.97,
    tags: ["Rain Vortex", "Jewel Canopy", "Changi Airport", "Chili Crab"]
  }
];

// Travel styles rotation
const TRAVEL_STYLES: Array<'Luxury' | 'Cultural' | 'Adventure' | 'Nature' | 'Food & Wine' | 'Island Escapes' | 'Wellness' | 'Family'> = [
  'Luxury',
  'Cultural',
  'Food & Wine',
  'Island Escapes',
  'Wellness',
  'Adventure',
  'Nature',
  'Family'
];

// Enrich destinations (all 50 mapped to Singapore precincts)
export const destinations: EnrichedDestination[] = rawVoyantaData.destinations.map((rawDest, index) => {
  const meta = SINGAPORE_DESTINATIONS_METADATA[index % SINGAPORE_DESTINATIONS_METADATA.length];
  const destinationVariant = index >= SINGAPORE_DESTINATIONS_METADATA.length
    ? `${meta.name} (Heritage Edition ${Math.floor(index / SINGAPORE_DESTINATIONS_METADATA.length) + 1})`
    : meta.name;

  return {
    id: rawDest.id,
    rawName: rawDest.name,
    name: destinationVariant,
    country: "Singapore",
    region: meta.region,
    tagline: meta.tagline,
    heroImage: meta.heroImage,
    gallery: meta.gallery,
    description: meta.description,
    bestTimeToVisit: meta.bestTimeToVisit,
    flightFromSingapore: meta.flightFromSingapore,
    climate: meta.climate,
    rating: Number((4.92 + (index % 8) * 0.01).toFixed(2)),
    tags: meta.tags
  };
});

// Enriched Packages (all 100 mapped to Singapore luxury journeys)
export const packages: EnrichedPackage[] = rawVoyantaData.tour_packages.map((pkg, index) => {
  const dest = destinations[index % destinations.length];
  const itinerary = rawVoyantaData.itineraries[index % rawVoyantaData.itineraries.length];
  const style = TRAVEL_STYLES[index % TRAVEL_STYLES.length];
  const days = itinerary?.days || (3 + (index % 5));

  const availabilityTypes: Array<'Available' | 'Guaranteed Departure' | 'Limited (4 Seats Left)' | 'Waitlist'> = [
    'Guaranteed Departure',
    'Available',
    'Limited (4 Seats Left)',
    'Available'
  ];

  const highlightsPool = [
    `Private luxury limousine transfer from Singapore Changi Terminal 3 / Jewel VIP`,
    `Handpicked luxury presidential suite or clifftop heritage villa accommodations`,
    `Curated 3-Star Michelin Odette, Les Amis, or bespoke Peranakan chef banquets`,
    `Dedicated private Singapore historian, cultural storyteller & licensed chauffeur`,
    `Private yacht charter to Southern Islands or private after-hours Supertree access`
  ];

  const singaporePackageNames = [
    `Raffles Colonial Grandeur & 3-Star Michelin Odyssey`,
    `Marina Bay SkyPark & Southern Islands Superyacht Cruise`,
    `Capella Sentosa Clifftop Rainforest & Private Beach Haven`,
    `Peranakan Royal Atelier & Nyonya Culinary Heritage`,
    `Dempsey Hill Botanical Gastronomy & UNESCO Orchid Trail`,
    `Pulau Ubin Vintage Kampong & Mangrove Sea-Kayak Expedition`,
    `Singapore Architectural Marvels & Gardens by the Bay VIP`,
    `Mandai Wildlife Connoisseur & Night Safari Private Buggy`,
    `Chinatown Clan Temples & Speakeasy Mixology Journey`,
    `Jewel Changi Rain Vortex & East Coast Pepper Crab Feast`,
    `Southern Islands Sunset Catamaran & Secluded Cove Charter`,
    `Fullerton Heritage Mile & Singapore River Wooden Bumboat`
  ];

  const enrichedName = index < singaporePackageNames.length
    ? singaporePackageNames[index]
    : `${dest.name} Signature Voyage ${index + 1}`;

  return {
    id: pkg.id,
    name: enrichedName,
    price_sgd: pkg.price_sgd,
    destination: dest.name,
    country: "Singapore",
    region: dest.region,
    days: days,
    travelStyle: style,
    availability: availabilityTypes[index % availabilityTypes.length],
    highlights: highlightsPool.slice(0, 3 + (index % 2)),
    inclusions: [
      "All 5-Star Luxury Suites (Raffles, Capella, Fullerton Bay)",
      "Private VIP Changi Airport Meet & Greet with Chauffeur Limousine",
      "Daily Champagne Breakfast & Michelin-Starred Degustation Dinners",
      "Exclusive After-Hours National Gallery & Gardens by the Bay Entry",
      "24/7 Dedicated Voyanta Singapore Concierge & Chauffeur"
    ],
    heroImage: dest.heroImage,
    rating: Number((4.93 + (index % 7) * 0.01).toFixed(2)),
    departureDates: [
      `15 Oct 2026`,
      `02 Nov 2026`,
      `18 Dec 2026 (Festive Lightup)`,
      `24 Jan 2027 (CNY Peak)`
    ],
    groupSize: index % 3 === 0 ? "Bespoke Private (2-6 Guests)" : "Intimate Small Group (Max 8)",
    featured: index < 8 || index % 12 === 0,
    itineraryId: itinerary?.id || `ITI${String(index + 1).padStart(3, '0')}`
  };
});

// Enriched Itineraries for Singapore Journeys
export const itineraries: EnrichedItinerary[] = rawVoyantaData.itineraries.map((rawIti, index) => {
  const pkg = packages[index % packages.length];
  const dest = destinations.find(d => d.name === pkg.destination) || destinations[0];
  const numDays = rawIti.days;

  const dayPlans: DayPlan[] = [];
  for (let d = 1; d <= numDays; d++) {
    if (d === 1) {
      dayPlans.push({
        day: 1,
        title: `VIP Changi Airport Arrival & Check-in at ${dest.name}`,
        morning: `VIP tarmac meet-and-greet at Singapore Changi Airport (SIN). Fast-track immigration and private Mercedes-Maybach transfer to your suite.`,
        afternoon: `Unwind with botanical herbal welcome tea and foot reflexology. Leisurely stroll through the lush hotel gardens.`,
        evening: `Sunset welcome cocktail overlooking Marina Bay or Sentosa Cove followed by an exclusive 6-course modern Singaporean degustation.`,
        stay: `Raffles Hotel / Capella Singapore / The Fullerton Bay`,
        meals: `Afternoon High Tea & 6-Course Degustation Dinner`,
        insiderTip: `Your luggage is handled directly from tarmac to your private suite.`
      });
    } else if (d === numDays) {
      dayPlans.push({
        day: d,
        title: `Sunrise Garden Serenity & Changi Jewel Departure`,
        morning: `Private sunrise yoga on the terrace followed by champagne dim sum breakfast overlooking the water.`,
        afternoon: `Personal boutique shopping at Design Orchard or private jewelry viewing. Farewell Singapore Sling toast.`,
        evening: `Private limousine transfer to Changi Terminal 3. Access to SilverKris First Class lounge and VIP canopy walk at Jewel.`,
        stay: `Voyage Concluded`,
        meals: `Champagne Dim Sum & Afternoon Tea`,
        insiderTip: `Tax refund (GST TRS) assistance provided directly by your concierge.`
      });
    } else {
      const themes = [
        {
          title: `Heritage Shophouses & Living Peranakan Arts`,
          morning: `Private historian tour of Katong and Joo Chiat shophouse corridors before public hours.`,
          afternoon: `Hands-on tile glazing and beading masterclass with a third-generation Nyonya artisan.`,
          evening: `Private candlelit dinner at Candlenut featuring ancestral heirloom recipes.`,
          stay: `Luxury Heritage Suite`,
          meals: `Breakfast & Michelin 1-Star Peranakan Dinner`
        },
        {
          title: `Southern Islands Catamaran Cruise & Private Cove`,
          morning: `Board a private 50ft luxury catamaran at ONE°15 Marina Sentosa Cove.`,
          afternoon: `Anchor in the calm emerald waters of Lazarus Bay for paddleboarding and a seafood champagne barbecue.`,
          evening: `Cruise past the illuminated Marina Bay skyline as the city lights up at twilight.`,
          stay: `Capella Sentosa Clifftop Villa`,
          meals: `Breakfast, Catamaran Champagne Grill & Cocktails`
        },
        {
          title: `Futuristic Biophilia & Three-Star Michelin Gastronomy`,
          morning: `VIP sunrise access to the Gardens by the Bay Cloud Forest mist dome and Supertree aerial skyway.`,
          afternoon: `Private viewing of Southeast Asian contemporary art at the National Gallery Singapore.`,
          evening: `Reserved chef's table counter at 3-Star Michelin Odette curated by Chef Julien Royer.`,
          stay: `Marina Bay Presidential Suite`,
          meals: `Breakfast & 3-Star Michelin Odette Dinner`
        },
        {
          title: `Pulau Ubin Vintage Kampong & Mangrove Expedition`,
          morning: `Private wooden bumboat to Pulau Ubin; guided tandem kayak through Chek Jawa mangrove estuaries.`,
          afternoon: `Traditional charcoal tea with village elders and rustic seafood lunch at an authentic floating kelong.`,
          evening: `Return to the mainland for restorative Ayurvedic spa therapies at Auriga Spa Sentosa.`,
          stay: `Villa Samadhi Nature Hideaway`,
          meals: `Breakfast, Island Kelong Lunch & Herbal Dinner`
        }
      ];
      const plan = themes[(d - 2) % themes.length];
      dayPlans.push({
        day: d,
        title: `Day ${d}: ${plan.title}`,
        morning: plan.morning,
        afternoon: plan.afternoon,
        evening: plan.evening,
        stay: plan.stay,
        meals: plan.meals,
        insiderTip: `Private air-conditioned limousine and chilled mineral water accompany every excursion.`
      });
    }
  }

  return {
    id: rawIti.id,
    days: numDays,
    packageId: pkg.id,
    packageName: pkg.name,
    destination: dest.name,
    summary: `An intimate ${numDays}-day Singapore experience balancing biophilic green architecture, historic colonial luxury, and world-class Michelin gastronomy.`,
    dayPlans
  };
});

// Enriched Singapore 5-Star Luxury Hotels
const SINGAPORE_HOTEL_BRANDS = [
  { name: "Raffles Hotel Singapore", stars: 5, perk: "Palm Court Suite upgrade + Dedicated 24/7 Raffles Butler & complimentary Singapore Sling masterclass", quote: "An 1887 colonial grande dame where legends from Somerset Maugham to royalty have found sanctuary." },
  { name: "Capella Singapore (Sentosa)", stars: 5, perk: "Private Premier Sea Facing Pool Villa upgrade + Daily Auriga Spa signature treatment", quote: "Foster + Partners masterpiece blending colonial heritage manors with curved modern villas amidst Sentosa rainforest." },
  { name: "The Fullerton Bay Hotel Singapore", stars: 5, perk: "Bay View Room upgrade + Private wooden boat cruise from Clifford Pier & Lantern rooftop sunset cocktails", quote: "Gleaming waterfront luxury suspended directly over the glistening waters of Marina Bay." },
  { name: "The Ritz-Carlton, Millenia Singapore", stars: 5, perk: "Premier Suite with iconic octagonal bathroom window views of Marina Bay + Club Lounge 5-meal champagne presentation", quote: "Surrounded by 4,200 museum-grade modern artworks including Dale Chihuly and Frank Stella." },
  { name: "Marina Bay Sands (Sands Suites)", stars: 5, perk: "VIP Check-in Lounge + Guaranteed private cabana access at the iconic 57th-floor infinity pool", quote: "The architectural silhouette of modern Singapore with private butler service on the Paiza Club floors." },
  { name: "Artyzen Singapore (Cuscaden)", stars: 5, perk: "Terrace Suite upgrade + Botanical cocktail flight at The Roof cantilevered pool lounge", quote: "Modern biophilic luxury with sky gardens, double-height ceilings, and Straits heritage touches in Tanglin." },
  { name: "The Clan Hotel Singapore", stars: 5, perk: "MASTER Series Grand Suite + Personalized tea master ceremony & bespoke limousine city escort", quote: "Modern Asian luxury rooted in Far East Square's rich heritage of Chinese clan associations." },
  { name: "The Barracks Hotel Sentosa", stars: 5, perk: "Equerry butler service + Private heritage walking tour & evening heritage cocktail canapes", quote: "A restored British colonial artillery outpost turned into an intimate 40-room luxury hideaway." }
];

export const hotels: EnrichedHotel[] = rawVoyantaData.hotels.map((rawHotel, index) => {
  const brand = SINGAPORE_HOTEL_BRANDS[index % SINGAPORE_HOTEL_BRANDS.length];
  const dest = destinations[index % destinations.length];
  const hotelName = index < SINGAPORE_HOTEL_BRANDS.length
    ? brand.name
    : `${brand.name.split('(')[0].trim()} (${dest.name} Collection)`;

  return {
    id: rawHotel.id,
    name: hotelName,
    destination: dest.name,
    country: "Singapore",
    stars: brand.stars,
    pricePerNightSGD: 850 + ((index * 65) % 1600),
    image: dest.gallery[index % dest.gallery.length] || dest.heroImage,
    category: index % 2 === 0 ? "Heritage Grandeur" : "Biophilic Clifftop Sanctuary",
    curatedPerk: brand.perk,
    quote: brand.quote,
    amenities: [
      "Private Heated Plunge Pool / Marina View",
      "24/7 Dedicated Butler Service",
      "Michelin-Starred Dining Onsite",
      "Helipad / Private Marina Berth Access",
      "Award-Winning Holistic Thermal Spa"
    ]
  };
});

// Enriched Singapore Entry & Visa Information for International Travelers Visiting Singapore
const SINGAPORE_ENTRY_VISA_DATA = [
  { country: "United States", status: "Visa-Free" as const, duration: "90 Days", time: "Instant clearance (SGAC online)", req: ["Valid Passport (min 6 months)", "Submit free SG Arrival Card (SGAC) within 3 days", "Return / onward flight ticket"], notes: "US citizens enter Singapore visa-free for tourism or business for up to 90 days. Eligible for Changi automated e-Gates." },
  { country: "United Kingdom", status: "Visa-Free" as const, duration: "90 Days", time: "Instant clearance via e-Gates", req: ["British Citizen Passport (min 6 months)", "SG Arrival Card online", "Confirmed accommodation"], notes: "British passport holders receive 90 days visa-free entry. Changi automated clearance available on arrival." },
  { country: "European Union / Schengen", status: "Visa-Free" as const, duration: "90 Days", time: "Instant automated clearance", req: ["Valid EU Passport (min 6 months)", "SG Arrival Card", "Proof of funds"], notes: "Citizens of all 27 EU member states enjoy 90 days reciprocal visa-free entry into Singapore." },
  { country: "Australia", status: "Visa-Free" as const, duration: "90 Days", time: "Instant clearance (Automated Gates)", req: ["Australian Passport (min 6 months)", "SG Arrival Card (SGAC)", "Onward itinerary"], notes: "Australians enjoy 90-day visa exemption. Instant biometric clearance at all Changi terminals." },
  { country: "New Zealand", status: "Visa-Free" as const, duration: "90 Days", time: "Instant clearance", req: ["New Zealand Passport (min 6 months)", "SG Arrival Card", "Return ticket"], notes: "New Zealand citizens receive 90 days visa-free entry into Singapore." },
  { country: "Japan", status: "Visa-Free" as const, duration: "90 Days", time: "Instant clearance", req: ["Japanese Passport (min 6 months)", "SG Arrival Card", "Hotel reservation"], notes: "Japanese passport holders enjoy 90 days tourist entry with automated e-Gate fast-track." },
  { country: "South Korea", status: "Visa-Free" as const, duration: "90 Days", time: "Instant clearance", req: ["Republic of Korea Passport", "SG Arrival Card", "Onward flight"], notes: "Korean citizens enter visa-free for up to 90 days." },
  { country: "China", status: "Visa-Free" as const, duration: "30 Days", time: "Instant entry (Mutual Exemption)", req: ["PRC Passport (min 6 months)", "SG Arrival Card (SGAC)", "Return flight ticket"], notes: "Landmark 30-day mutual visa exemption treaty active between Singapore and China. No visa required." },
  { country: "Malaysia", status: "Visa-Free" as const, duration: "30 Days", time: "Instant clearance (ASEAN exemption)", req: ["Malaysian Passport (min 6 months)", "SG Arrival Card (for air/sea arrival)", "Valid vehicle pass if driving"], notes: "Malaysian passport holders enter visa-free for 30 days. Fast-track automated lanes at Changi and land checkpoints." },
  { country: "Indonesia", status: "Visa-Free" as const, duration: "30 Days", time: "Instant clearance (ASEAN)", req: ["Indonesian Passport (min 6 months)", "SG Arrival Card", "Return ticket"], notes: "Indonesian citizens enter visa-free for up to 30 days under ASEAN bilateral accords." },
  { country: "Thailand", status: "Visa-Free" as const, duration: "30 Days", time: "Instant clearance (ASEAN)", req: ["Thai Passport (min 6 months)", "SG Arrival Card", "Confirmed stay"], notes: "Visa exemption for up to 30 days across all ports of entry." },
  { country: "India", status: "Instant ETA / eVisa" as const, duration: "Up to 30 Days", time: "1-3 Business Days online", req: ["Indian Passport (min 6 months)", "Submission via Singapore Authorized Visa Agent", "Confirmed roundtrip air ticket"], notes: "Indian travelers can obtain an electronic tourist visa through Voyanta Singapore Concierge or authorized agents." }
];

export const visaInfo: EnrichedVisaInfo[] = rawVoyantaData.visa_information.map((rawVisa, index) => {
  const meta = SINGAPORE_ENTRY_VISA_DATA[index % SINGAPORE_ENTRY_VISA_DATA.length];
  const nationality = index < SINGAPORE_ENTRY_VISA_DATA.length ? meta.country : `${meta.country} (Group ${index + 1})`;

  return {
    id: rawVisa.id,
    country: nationality,
    passportType: `${nationality} National Passport`,
    visaStatus: meta.status,
    durationDays: meta.duration,
    processingTime: meta.time,
    keyRequirements: meta.req,
    singaporeCitizenNotes: meta.notes,
    validPassportMonths: 6
  };
});

// Enriched Booking Policies for Singapore Experiences
const SINGAPORE_BOOKING_POLICIES_TEXTS = [
  { title: "Transparent Singapore Dollar (SGD) Billing", text: "All Voyanta journeys and luxury hotel buyouts are strictly billed in Singapore Dollars (SGD). Prices include GST (9%) and service charges with zero hidden exchange markups." },
  { title: "Singapore Tourism Board (STB) Escrow Protection", text: "Your 25% commitment deposit is held in a protected escrow account compliant with the Singapore Travel Agent Act and Singapore Tourism Board regulatory framework (License #03829)." },
  { title: "Changi Airport VIP Fast-Track Coordination", text: "Every booking includes private tarmac meet-and-greet, VIP immigration escort, and Mercedes-Maybach transfer from Singapore Changi Terminals 1, 2, 3, or 4 directly to your hotel." },
  { title: "Dedicated Singapore Resident Concierge", text: "Your dedicated Journey Curator is physically based in Singapore and available 24/7 for instant restaurant adjustments, private yacht weather pivots, or champagne deliveries." },
  { title: "CASETrust Accredited Travel Standards", text: "We adhere strictly to CASETrust accreditation standards under Singapore consumer law, ensuring ethical pricing, clear terms, and prompt dispute resolution." }
];

export const bookingPolicies: EnrichedPolicy[] = rawVoyantaData.booking_policies.map((rawPolicy, index) => {
  const item = SINGAPORE_BOOKING_POLICIES_TEXTS[index % SINGAPORE_BOOKING_POLICIES_TEXTS.length];
  return {
    id: rawPolicy.id,
    policy: rawPolicy.policy,
    title: item.title,
    summary: item.text,
    detailedPoints: [
      "Strict compliance with Singapore Tourism Board regulations",
      "Instant electronic receipts with Singapore GST tax invoice",
      "Dedicated bespoke amendments window up to 30 days before arrival"
    ],
    singaporeConsumerNotice: "Licensed under Singapore Travel Agents Act (Cap. 334) with full consumer protection."
  };
});

// Enriched Cancellation Policies
const SINGAPORE_CANCELLATION_POLICIES_TEXTS = [
  { title: "Flexible 30-Day Peace-of-Mind Window", text: "Cancel up to 30 days prior to your journey start date for a 100% credit transfer to any future Voyanta Singapore voyage or 85% cash refund." },
  { title: "Flight Disruption & Tropical Weather Shield", text: "If severe weather causes flight diversions or delays into Singapore Changi Airport, Voyanta automatically rearranges your suite and private transfers at zero penalty." },
  { title: "Complimentary Stay Date Rescheduling", text: "One complimentary date adjustment is permitted per booking with at least 14 days notice, subject only to hotel seasonal rate differences." },
  { title: "Transparent Tiered Refund Schedule", text: "15-29 days: 70% refund or full credit note; 7-14 days: 50% refund; Under 7 days: emergency rebooking assistance via dedicated Singapore concierge." },
  { title: "Medical & Force Majeure Guarantee", text: "In the event of medical emergencies supported by a certified physician, Voyanta facilitates maximum refund recovery from luxury Singapore hotel partners." }
];

export const cancellationPolicies: EnrichedPolicy[] = rawVoyantaData.cancellation_policies.map((rawPolicy, index) => {
  const item = SINGAPORE_CANCELLATION_POLICIES_TEXTS[index % SINGAPORE_CANCELLATION_POLICIES_TEXTS.length];
  return {
    id: rawPolicy.id,
    policy: rawPolicy.policy,
    title: item.title,
    summary: item.text,
    detailedPoints: [
      "Zero hidden administrative fees on cancellations within eligible windows",
      "Official claim documentation issued for Singapore and international travel insurers",
      "Credit notes valid for 24 months across all Singapore experiences"
    ],
    singaporeConsumerNotice: "All refunds processed within 5-7 business days directly to your payment method in Singapore Dollars."
  };
});

// Enriched Local Recommendations for Singapore
const SINGAPORE_RECOMMENDATIONS_POOL = [
  { title: "Chef's Counter at Odette (3-Star Michelin)", category: "Food" as const, dest: "Marina Bay & Civic District", tip: "Located inside the National Gallery; Voyanta concierge secures exclusive window banquettes overlooking the atrium.", score: 9.9, tag: "Haute Gastronomy" },
  { title: "Dawn Stroll & Mist Canopy at Cloud Forest", category: "Attractions" as const, dest: "Marina Bay & Civic District", tip: "Enter at 09:00 AM sharp as the artificial mist geyser activates before general admission crowds arrive.", score: 9.9, tag: "Biophilic Wonder" },
  { title: "Private Wooden Bumboat Charter on Singapore River", category: "Experiences" as const, dest: "Civic District & Raffles", tip: "Sip chilled champagne while cruising from historic Fullerton Pier up to Robertson Quay under twilight bridges.", score: 9.8, tag: "River Sunset" },
  { title: "Authentic Nyonya Heirloom Feasting at Candlenut", category: "Food" as const, dest: "Dempsey Hill & Botanic Gardens", tip: "World's only Michelin-starred Peranakan restaurant; order the Buah Keluak beef short ribs with blue pea jasmine rice.", score: 9.8, tag: "Peranakan Michelin" },
  { title: "Southern Islands Catamaran Swim at Lazarus Lagoon", category: "Experiences" as const, dest: "Southern Islands & Lazarus Bay", tip: "Anchor in the horseshoe lagoon with crystal turquoise water; perfect for secluded paddleboarding and picnic barbecues.", score: 9.9, tag: "Secluded Island" },
  { title: "Private Attic Tea Ceremony in 1880s Shophouse", category: "Culture" as const, dest: "Katong & Joo Chiat", tip: "Climb through steep wooden stairs to a secret attic museum with tea master Tan examining ancient Straits porcelain.", score: 9.7, tag: "Living Heritage" },
  { title: "Artisanal Perfume Creation on Arab Street", category: "Shopping" as const, dest: "Kampong Gelam & Arab Street", tip: "Blend rare oud, damask rose, and ambergris with master perfumers at Sifr Aromatics for your own signature scent.", score: 9.6, tag: "Bespoke Scent" },
  { title: "VIP Buggy Tour at Night Safari Singapore", category: "Attractions" as const, dest: "Mandai Rainforest & Wildlife Reserve", tip: "Private electric buggy driven by a senior wildlife zoologist; skip all tram lines with front-row animal feedings.", score: 9.8, tag: "Nocturnal Wildlife" },
  { title: "National Orchid Garden VIP Pavilion Viewing", category: "Culture" as const, dest: "Dempsey Hill & Botanic Gardens", tip: "Admire rare VIP orchids named after visiting heads of state and royalty in a climate-controlled glass dome.", score: 9.7, tag: "UNESCO Heritage" },
  { title: "Midnight Satay Street at Lau Pa Sat", category: "Food" as const, dest: "Chinatown & Telok Ayer", tip: "Boon Tat Street closes at 7 PM for open-air charcoal satay carts; Stall 7 & 8 serve the juiciest beef and prawn skewers.", score: 9.7, tag: "Hawker Culture" }
];

export const recommendations: EnrichedRecommendation[] = rawVoyantaData.local_recommendations.map((rawRec, index) => {
  const item = SINGAPORE_RECOMMENDATIONS_POOL[index % SINGAPORE_RECOMMENDATIONS_POOL.length];
  const recCategories: Array<'Food' | 'Culture' | 'Shopping' | 'Attractions' | 'Experiences'> = [
    'Food', 'Culture', 'Experiences', 'Attractions', 'Shopping'
  ];
  const assignedCategory = recCategories[index % recCategories.length];

  return {
    id: rawRec.id,
    title: index < SINGAPORE_RECOMMENDATIONS_POOL.length ? item.title : `${item.dest}: Singapore Experience ${index + 1}`,
    category: assignedCategory,
    destination: item.dest,
    locationDetails: `Handpicked by Voyanta Singapore resident concierges & culinary tastemakers`,
    editorialReview: item.tip,
    voyantaScore: item.score,
    tag: item.tag
  };
});

// Verified High-Res Portrait Avatars for Luxury Singapore Reviewers
const SINGAPORE_REVIEWER_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
];

// Enriched Reviews from Discerning Singapore Travelers & Global Luxury Guests
const SINGAPORE_REVIEWERS = [
  { name: "Su-Lyn & Jeremy Tan", district: "Bukit Timah, Singapore", dest: "Capella Sentosa Clifftop Retreat", text: "We booked the Sentosa clifftop pool villa through Voyanta for our 15th wedding anniversary. The private catamaran to Lazarus Island and the private Auriga spa evening were utterly world-class." },
  { name: "Sir David & Lady Harrington", district: "London & Singapore", dest: "Raffles Colonial Grandeur & 3-Star Odette", text: "Staying in the Palm Court Suite at Raffles combined with a private table at Odette was an unforgettable Singapore masterclass. Voyanta's white-glove chauffeur and concierge service was immaculate." },
  { name: "Michelle Koh", district: "Tanjong Pagar, Singapore", dest: "Southern Islands Catamaran & Champagne Charter", text: "Chartering the private catamaran for our family out to the Southern Islands was the best day of our year. Clear turquoise waters right here in Singapore, served by our private butler and chef." },
  { name: "Marc & Isabelle Dupont", district: "Paris & Sentosa Cove", dest: "Peranakan Royal Atelier & Nyonya Heritage", text: "Voyanta's private access to restored Peranakan shophouse attics and the private masterclass at Candlenut opened our eyes to Singapore's profound living heritage. Outstanding curation." },
  { name: "Dr. Victor Chen", district: "River Valley, Singapore", dest: "Marina Bay SkyPark & Fullerton Heritage", text: "As a long-time Singapore resident, I never imagined seeing my home city with such enchantment. The twilight bumboat with vintage champagne and private cloud forest access were mesmerizing." },
  { name: "Eileen & Marcus Wong", district: "Tanglin, Singapore", dest: "Mandai VIP Night Safari & Rainforest", text: "Our children were thrilled by the private electric buggy at Night Safari and feeding the Asian elephants. Zero waiting time, private zoologist commentary, and luxury limousine throughout." }
];

export const reviews: EnrichedReview[] = rawVoyantaData.customer_reviews.map((rawRev, index) => {
  const rev = SINGAPORE_REVIEWERS[index % SINGAPORE_REVIEWERS.length];
  const reviewerName = index < SINGAPORE_REVIEWERS.length ? rev.name : `${rev.name.split(' ')[0]} ${String.fromCharCode(65 + (index % 26))}.`;

  return {
    id: rawRev.id,
    rating: rawRev.rating || 5,
    author: reviewerName,
    residentialDistrict: rev.district,
    destinationTraveled: rev.dest,
    packageName: rev.dest,
    date: `${10 + (index % 18)} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index % 12]} 2026`,
    reviewTitle: "A Flawless Luxury Singapore Discovery Experience",
    comment: rev.text,
    avatar: SINGAPORE_REVIEWER_AVATARS[index % SINGAPORE_REVIEWER_AVATARS.length]
  };
});

// Enriched Categories for Singapore Experiences
const SINGAPORE_CATEGORY_DEFINITIONS = [
  { name: "Luxury", theme: "Colonial Suites & Presidential Bayfront", tagline: "Raffles Palm Court suites, Capella rainforest villas, and private Maybach transfers.", img: "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=1200&auto=format&fit=crop", badge: "Ultra-Premium" },
  { name: "Cultural", theme: "Peranakan Heritage & Sacred Enclaves", tagline: "Private audiences with Nyonya tile masters, shophouse attics, and centuries-old clan temples.", img: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1200&auto=format&fit=crop", badge: "Heritage" },
  { name: "Island Escapes", theme: "Southern Islands & Lazarus Lagoon", tagline: "Private 50ft luxury catamaran charters, secluded turquoise coves, and beach club cabanas.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop", badge: "Maritime" },
  { name: "Food & Wine", theme: "Three-Star Michelin & Hawker Royalty", tagline: "Odette chef's table buyouts, heirloom Peranakan curations, and private satay banquets.", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop", badge: "Gastronomic" },
  { name: "Nature", theme: "UNESCO Botanic Gardens & Biophilic Mists", tagline: "After-hours Cloud Forest geyser access, 160-year-old virgin rainforest, and orchid pavilions.", img: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1200&auto=format&fit=crop", badge: "Biophilic" },
  { name: "Adventure", theme: "Pulau Ubin Kayaking & Coastal Boardwalks", tagline: "Mangrove estuary sea-kayaking, rustic 1960s kampong cycling, and Chek Jawa reefs.", img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop", badge: "Rustic Wild" },
  { name: "Wellness", theme: "Auriga Moon Spas & Herbal Bath Rituals", tagline: "Full moon lunar therapies, thermal mineral vitality pools, and botanical aromatherapy.", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop", badge: "Restorative" },
  { name: "Family", theme: "Mandai VIP Buggy & Universal VIP Tours", tagline: "Behind-the-scenes wildlife encounters, private Night Safari trams, and effortless family pace.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop", badge: "Family Marvel" }
];

export const travelCategories: EnrichedCategory[] = rawVoyantaData.travel_categories.map((rawCat, index) => {
  const cat = SINGAPORE_CATEGORY_DEFINITIONS[index % SINGAPORE_CATEGORY_DEFINITIONS.length];
  const catName = index < SINGAPORE_CATEGORY_DEFINITIONS.length ? cat.name : `${cat.name} Collection ${Math.floor(index / SINGAPORE_CATEGORY_DEFINITIONS.length) + 1}`;

  return {
    id: rawCat.id,
    name: catName,
    theme: cat.theme,
    tagline: cat.tagline,
    image: cat.img,
    badge: cat.badge,
    packageCount: 12 + (index * 2) % 16
  };
});

// Enriched 365-Day Singapore Events & Availability Calendar
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const SINGAPORE_SEASONS = [
  'Monsoon Green (Cool Breeze)',    // Jan
  'Lunar New Year Spring',          // Feb
  'Art & Heritage Season',          // Mar
  'Culinary Discovery Season',      // Apr
  'Vesak Illumination',             // May
  'Great Singapore Showcase',       // Jun
  'Food Festival & Coast',          // Jul
  'National Day Splendour',         // Aug
  'Grand Prix F1 Night Race',       // Sep
  'Deepavali Lights Season',        // Oct
  'Monsoon Greenery & Orchid Bloom',// Nov
  'Christmas on A Great Street'     // Dec
];

const SINGAPORE_EVENTS_MAP: Record<number, string> = {
  1: "New Year's Day Marina Bay Gala",
  28: "CNY Eve Chinatown Light-Up",
  29: "Chinese New Year Day 1",
  30: "Chinese New Year Day 2",
  89: "Hari Raya Aidilfitri Bazaar",
  108: "Easter Botanic Garden High Tea",
  121: "Labour Day Sentosa Getaway",
  133: "Vesak Day Temple Lantern Festival",
  200: "Singapore Food Festival Gala",
  221: "Singapore National Day Parade 2027",
  260: "Formula 1 Singapore Grand Prix Practice",
  261: "Formula 1 Singapore Grand Prix Qualifying",
  262: "Formula 1 Singapore Grand Prix Night Race",
  275: "Mid-Autumn Lantern Festival at Gardens",
  304: "Deepavali Little India Illumination",
  358: "Christmas on A Great Street Orchard",
  359: "Christmas Eve Marina Bay Gala",
  365: "Marina Bay New Year's Eve Countdown"
};

export const availabilityCalendar: EnrichedCalendarDay[] = rawVoyantaData.availability_calendar.map((dayItem) => {
  const day = dayItem.day;
  const dateObj = new Date(2027, 0, day);
  const monthIdx = dateObj.getMonth();
  const dayOfMonth = dateObj.getDate();
  const monthName = MONTH_NAMES[monthIdx];
  const season = SINGAPORE_SEASONS[monthIdx];
  const event = SINGAPORE_EVENTS_MAP[day];

  let statusText = "Guaranteed Departure";
  if (day % 7 === 0 || day % 11 === 0) {
    statusText = "Limited (2 Suites Left)";
  } else if (day % 19 === 0) {
    statusText = "Private Yacht Charter Reserved";
  }

  const randomPkg = packages[(day * 3) % packages.length];

  return {
    day,
    status: statusText,
    dateStr: `${dayOfMonth} ${monthName} 2027`,
    month: monthName,
    monthIndex: monthIdx,
    dayOfMonth,
    season,
    holidayTag: event,
    featuredPackage: randomPkg ? randomPkg.name : "Raffles Colonial Grandeur & 3-Star Odette",
    priceStartSGD: randomPkg ? randomPkg.price_sgd : 1850
  };
});
