
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, User, Globe, Heart, Bell, Calendar, ShoppingCart } from 'lucide-react';
import { MOCK_USER } from '../constants';
import { DeepBrainAI } from './DeepBrainAI';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  const navLinks = [
    { name: 'Explore', path: '/explore' },
    { name: 'Calendar', path: '/calendar' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#F0ECE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-[#7C9070] rounded-full flex items-center justify-center text-white shadow-lg group-hover:bg-[#5E6D55] transition-colors">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#4A4A4A] serif">ZenMarket</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors ${location.pathname === link.path ? 'text-[#7C9070]' : 'text-[#6B7280] hover:text-[#7C9070]'}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-6 w-px bg-[#E5E7EB]"></div>
            <Link to="/organizer" className="text-[#7C9070] font-semibold hover:underline">Host a Retreat</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-5">
            <button className="text-gray-500 hover:text-gray-700 transition-transform active:scale-95">
              <Heart className="w-5 h-5" />
            </button>
            <Link to="/checkout" className="relative text-gray-500 hover:text-[#7C9070] transition-all p-2">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#7C9070] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/dashboard" className="flex items-center gap-2 bg-[#F9F6F1] px-4 py-2 rounded-full border border-[#E5E7EB] hover:bg-white transition-all">
              <User className="w-5 h-5 text-[#7C9070]" />
              <span className="text-sm font-medium">{MOCK_USER.name.split(' ')[0]}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
             <Link to="/checkout" className="relative p-2 text-gray-500">
               <ShoppingCart className="w-6 h-6" />
               {totalItems > 0 && (
                  <span className="absolute top-1 right-1 bg-[#7C9070] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
             </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-xl p-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/organizer" className="block px-3 py-2 text-base font-semibold text-[#7C9070]">Host a Retreat</Link>
          <hr />
          <Link to="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-700">My Dashboard</Link>
          <Link to="/checkout" className="block px-3 py-2 text-base font-medium text-gray-700">Checkout ({totalItems} items)</Link>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2D312E] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl serif font-bold">ZenMarket</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover transformative experiences worldwide. We connect soul-seekers with world-class wellness practitioners and serene locations.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#7C9070]">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/explore" className="hover:text-white">All Retreats</Link></li>
              <li><Link to="/calendar" className="hover:text-white">Event Calendar</Link></li>
              <li><a href="#" className="hover:text-white">Meditation Stays</a></li>
              <li><a href="#" className="hover:text-white">Digital Detox</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#7C9070]">Host</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/organizer" className="hover:text-white">List Your Retreat</Link></li>
              <li><a href="#" className="hover:text-white">Organizer Dashboard</a></li>
              <li><a href="#" className="hover:text-white">Success Stories</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#7C9070]">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Get curated weekly wellness inspiration.</p>
            <div className="flex">
              <input type="email" placeholder="Email" className="bg-[#3D423F] border-none px-4 py-2 rounded-l-md w-full focus:ring-1 focus:ring-[#7C9070]" />
              <button className="bg-[#7C9070] px-4 py-2 rounded-r-md hover:bg-[#5E6D55]">Join</button>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-[#3D423F] flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© 2024 ZenMarket Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <DeepBrainAI />
    </div>
  );
};
