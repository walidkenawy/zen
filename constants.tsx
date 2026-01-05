
import { Retreat, UserRole, User } from './types';

export const CATEGORIES = [
  "Yoga", "Meditation", "Detox", "Spiritual", "Fitness", "Nature", "Leadership", "Healing", 
  "Art Therapy", "Surfing", "Culinary", "Writing", "Pilates", "Breathwork", "Silent", "Sound Healing", "Permaculture", "Shamanic", "Martial Arts", "Forest Bathing",
  "Teacher Training", "Ayahuasca", "Tantra", "Mental Health"
];

const COUNTRIES = [
  "Japan", "Indonesia", "Switzerland", "Spain", "Costa Rica", "Thailand", "India", "Greece",
  "Mexico", "Italy", "Portugal", "Norway", "South Africa", "Morocco", "Peru", "New Zealand",
  "Iceland", "France", "Canada", "Australia", "Brazil", "Nepal", "Vietnam", "Turkey", "Bhutan", "Kenya", "Argentina", "Finland", "Egypt"
];

const CENTERS = [
  "Blue Spirit Retreat", "Zen Mountain Center", "Soul Garden Sanctuary", "Pachamama Village", "The Sanctuary Thailand", "Ananda In The Himalayas", "Esalen Institute", "Amanpuri", "Fivelements Retreat", "Bagus Jati", "Willka T'ika", "Uluru Wellness", "Sachaqa Center", "Bodhi Khaya"
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
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=85&w=400&h=400&auto=format&fit=crop'
};

const IMAGE_KEYWORDS = ["yoga-resort", "meditation-hall", "luxury-wellness", "eco-villa", "zen-garden", "spa-sanctuary", "spiritual-temple", "forest-retreat", "ocean-front-villa", "mountain-wellness-center"];

const generateRetreats = (count: number): Retreat[] => {
  const retreats: Retreat[] = [];
  
  for (let i = 1; i <= count; i++) {
    const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
    const cityList = CITIES[country] || ["Capital City"];
    const city = cityList[Math.floor(Math.random() * cityList.length)];
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const theme = THEMES[Math.floor(Math.random() * THEMES.length)];
    const cat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const center = CENTERS[Math.floor(Math.random() * CENTERS.length)];
    const keyword1 = IMAGE_KEYWORDS[Math.floor(Math.random() * IMAGE_KEYWORDS.length)];
    const keyword2 = "landscape-wellness";
    
    const title = `${adj} ${cat} ${theme} at ${center}`;
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') + `-${i}`;
    
    const randomYear = 2024 + (Math.random() > 0.5 ? 1 : 0);
    const randomMonth = randomYear === 2024 ? (9 + Math.floor(Math.random() * 4)) : (1 + Math.floor(Math.random() * 12));
    const randomDay = 1 + Math.floor(Math.random() * 28);
    const dateStr = `${randomYear}-${String(randomMonth).padStart(2, '0')}-${String(randomDay).padStart(2, '0')}`;

    retreats.push({
      id: `r${i}`,
      title: title,
      slug: slug,
      description: `Experience the peak of ${cat.toLowerCase()} at ${center}. This ${adj.toLowerCase()} ${theme.toLowerCase()} is designed to offer profound transformation and holistic renewal. Hosted in the breathtaking surroundings of ${city}, ${country}, our center provides a safe, sacred space for your journey. Includes luxury sustainable lodging, gourmet organic meals, and direct access to local healing traditions.`,
      category: cat,
      price: 800 + Math.floor(Math.random() * 4500),
      durationDays: 3 + Math.floor(Math.random() * 21),
      images: [
        `https://images.unsplash.com/featured/1200x900?${keyword1}&sig=${i}`,
        `https://images.unsplash.com/featured/1200x900?${keyword2}&sig=${i+1000}`
      ],
      location: {
        id: `l${i}`,
        city: city,
        country: country,
        lat: 0,
        lng: 0,
        address: `${100 + i} ${center} Lane`
      },
      organizerId: `org${Math.floor(Math.random() * 100)}`,
      rating: 4.5 + (Math.random() * 0.5),
      reviewsCount: Math.floor(Math.random() * 500),
      dates: [dateStr],
      highlights: [`Curated ${cat} Program`, "Eco-Luxury Accommodation", "Farm-to-Table Nutrition", "Daily Group Sessions"],
      capacity: 8 + Math.floor(Math.random() * 25),
      isFeatured: Math.random() > 0.96
    });
  }

  return retreats;
};

export const MOCK_RETREATS = generateRetreats(450);
