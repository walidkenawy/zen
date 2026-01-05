
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Retreat } from '../types';

interface WishlistContextType {
  wishlist: Retreat[];
  toggleWishlist: (retreat: Retreat) => void;
  isInWishlist: (retreatId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Retreat[]>(() => {
    const saved = localStorage.getItem('zen_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('zen_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (retreat: Retreat) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === retreat.id);
      if (exists) {
        return prev.filter((item) => item.id !== retreat.id);
      } else {
        return [...prev, retreat];
      }
    });
  };

  const isInWishlist = (retreatId: string) => {
    return wishlist.some((item) => item.id === retreatId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
