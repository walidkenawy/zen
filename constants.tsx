
import { Retreat, UserRole, User } from './types';

export const CATEGORIES = [
  "Yoga", "Meditation", "Detox", "Spiritual", "Fitness", "Nature", "Leadership", "Healing", 
  "Art Therapy", "Surfing", "Culinary", "Writing", "Pilates", "Breathwork", "Silent", "Sound Healing", "Permaculture", "Shamanic", "Martial Arts", "Forest Bathing"
];

const COUNTRIES = [
  "Japan", "Indonesia", "Switzerland", "Spain", "Costa Rica", "Thailand", "India", "Greece",
  "Mexico", "Italy", "Portugal", "Norway", "South Africa", "Morocco", "Peru", "New Zealand",
  "Iceland", "France", "Canada", "Australia", "Brazil", "Nepal", "Vietnam", "Turkey", "Bhutan", "Kenya", "Argentina", "Finland", "Egypt"
];

const CITIES: Record<string, string[]> = {
  "Japan": ["Kyoto", "Hakone", "Nara", "Okinawa", "Koyasan"],
  "Indonesia": ["Ubud", "Canggu", "Uluwatu", "Sidemen", "Amed"],
  "Switzerland": ["Zermatt", "Interlaken", "Lucerne", "Grindelwald", "Verbier"],
  "Spain": ["Seville", "Ibiza", "Mallorca", "Granada", "Lanzarote"],
  "Costa Rica": ["Nosara", "Santa Teresa", "Tamarindo", "Arenal", "Puerto Viejo"],
  "Thailand": ["Koh Samui", "Chiang Mai", "Phuket", "Pai", "Koh Phangan"],
  "India": ["Rishikesh", "Goa", "Kerala", "Dharamshala", "Varanasi"],
  "Greece": ["Santorini", "Crete", "Mykonos", "Naxos", "Paros"],
  "Mexico": ["Tulum", "Sayulita", "Oaxaca", "Holbox", "San Miguel de Allende"],
  "Italy": ["Tuscany", "Amalfi", "Puglia", "Sicily", "Dolomites"],
  "Nepal": ["Kathmandu", "Pokhara", "Lumbini", "Mustang"],
  "Bhutan": ["Paro", "Thimphu", "Punakha"],
  "Morocco": ["Marrakech", "Essaouira", "Sahara Desert", "Atlas Mountains"]
};

const ADJECTIVES = ["Serene", "Mystical", "Healing", "Radiant", "Deep", "Pure", "Sacred", "Transformative", "Silent", "Lush", "Ancient", "Modern", "Dynamic", "Floating", "Hidden", "Celestial", "Earthy", "Primal", "Luminous", "Sublime", "Infinite", "Wild", "Peaceful", "Vibrant"];
const THEMES = ["Soul Journey", "Wellness Immersion", "Spirit Awakening", "Zen Path", "Nature Reconnect", "Flow State", "Inner Peace", "Detox Escape", "Yoga Flow", "Mindfulness Stay", "Heart Opening", "Energy Clearing", "Primal Wisdom", "Conscious Living", "Sacred Space"];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Rivers',
  email: 'alex@example.com',
  role: UserRole.GUEST,
  avatar: 'https://picsum.photos/seed/u1/100/100'
};

const generateRetreats = (count: number): Retreat[] => {
  const retreats: Retreat[] = [];
  
  // Specific Real-World Examples
  const baseRetreats: Retreat[] = [
    {
      id: 'r1',
      title: 'Silent Meditation & Zen Garden Retreat',
      slug: 'silent-meditation-zen-garden',
      description: 'Immerse yourself in 7 days of profound silence in the heart of the Japanese countryside. Experience traditional Zazen, forest bathing, and mindful tea ceremonies. This retreat is designed to help you peel back the layers of daily noise and rediscover the stillness within. Includes luxury ryokan accommodation and organic shojin ryori meals.',
      category: 'Meditation',
      price: 1250,
      durationDays: 7,
      images: ['https://images.unsplash.com/photo-1545201071-75f0286991a8?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800'],
      location: { id: 'l1', city: 'Kyoto', country: 'Japan', lat: 35.0116, lng: 135.7681, address: '123 Zen Way' },
      organizerId: 'org1',
      rating: 4.9,
      reviewsCount: 124,
      dates: ['2024-10-15', '2024-11-01', '2024-12-15'],
      highlights: ['Daily Zazen', 'Organic Vegan Meals', 'Temple Stay', 'Zen Garden Workshop'],
      capacity: 15,
      isFeatured: true
    },
    {
      id: 'r2',
      title: 'Bali Vinyasa & Healing Flow',
      slug: 'bali-vinyasa-healing',
      description: 'A transformative yoga journey in the lush jungles of Ubud. Reconnect with your spirit through movement, breathwork, and sound healing. Our expert instructors guide you through deep vinyasa flows that align your body and soul with the rhythms of the jungle. Stay in a private bamboo villa with views of the Ayung River.',
      category: 'Yoga',
      price: 950,
      durationDays: 5,
      images: ['https://images.unsplash.com/photo-1510894347713-fc3ad6cb0d0d?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1536627217148-d4a5b2a3c14d?auto=format&fit=crop&q=80&w=800'],
      location: { id: 'l2', city: 'Ubud', country: 'Indonesia', lat: -8.5069, lng: 115.2625, address: 'Jalan Raya Ubud' },
      organizerId: 'org2',
      rating: 4.8,
      reviewsCount: 89,
      dates: ['2024-09-20', '2024-10-10', '2024-11-05'],
      highlights: ['Sunrise Yoga', 'Sound Bath', 'Waterfall Excursion', 'Balinese Blessing Ceremony'],
      capacity: 20,
      isFeatured: true
    }
  ];

  retreats.push(...baseRetreats);

  for (let i = retreats.length + 1; i <= count; i++) {
    const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
    const cityList = CITIES[country] || ["Capital City"];
    const city = cityList[Math.floor(Math.random() * cityList.length)];
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const theme = THEMES[Math.floor(Math.random() * THEMES.length)];
    const cat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    
    const title = `${adj} ${cat} ${theme} in ${city}`;
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') + `-${i}`;
    
    // Spread dates across Sept 2024 to Dec 2025
    const randomYear = 2024 + (Math.random() > 0.5 ? 1 : 0);
    const randomMonth = randomYear === 2024 ? (9 + Math.floor(Math.random() * 4)) : (1 + Math.floor(Math.random() * 12));
    const randomDay = 1 + Math.floor(Math.random() * 28);
    const dateStr = `${randomYear}-${String(randomMonth).padStart(2, '0')}-${String(randomDay).padStart(2, '0')}`;

    retreats.push({
      id: `r${i}`,
      title: title,
      slug: slug,
      description: `Join us for a ${adj.toLowerCase()} ${cat.toLowerCase()} experience. Located in the beautiful ${city}, this retreat focuses on ${theme.toLowerCase()} and holistic wellness. Our program is designed for all levels and includes luxury accommodation, locally sourced meals, and guided excursions to nearby sacred sites. Reclaim your energy and find your balance in ${country}.`,
      category: cat,
      price: 600 + Math.floor(Math.random() * 3000),
      durationDays: 4 + Math.floor(Math.random() * 10),
      images: [`https://picsum.photos/seed/ret${i}/800/600`, `https://picsum.photos/seed/ret_alt${i}/800/600`],
      location: {
        id: `l${i}`,
        city: city,
        country: country,
        lat: 0,
        lng: 0,
        address: `${100 + i} Sanctuary Road`
      },
      organizerId: `org${Math.floor(Math.random() * 100)}`,
      rating: 4.0 + (Math.random() * 1.0),
      reviewsCount: Math.floor(Math.random() * 200),
      dates: [dateStr],
      highlights: [`Curated ${cat} Sessions`, "Daily Healthy Meals", "Nature Integration", "Expert Facilitators"],
      capacity: 10 + Math.floor(Math.random() * 20),
      isFeatured: Math.random() > 0.95
    });
  }

  return retreats;
};

export const MOCK_RETREATS = generateRetreats(450);
