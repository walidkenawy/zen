
export enum UserRole {
  GUEST = 'GUEST',
  ORGANIZER = 'ORGANIZER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Location {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  address: string;
}

export interface Retreat {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  durationDays: number;
  images: string[];
  location: Location;
  organizerId: string;
  rating: number;
  reviewsCount: number;
  dates: string[];
  highlights: string[];
  capacity: number;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string;
  retreat: Retreat;
  selectedDate: string;
  guests: number;
}

export interface Booking {
  id: string;
  retreatId: string;
  userId: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalAmount: number;
  guestCount: number;
}

export interface Review {
  id: string;
  retreatId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// Aspect ratio type for image generation
export type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
