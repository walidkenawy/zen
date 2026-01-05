
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Compass, ShieldCheck, Sparkles, MapPin, Wand2, Bot, ImageIcon } from 'lucide-react';
import { MOCK_RETREATS, CATEGORIES } from '../constants';
import { RetreatCard } from '../components/RetreatCard';
import { AIVisionWrapper } from '../components/AIVisionWrapper';

export const Home: React.FC = () => {
  const featured = MOCK_RETREATS.filter(r => r.isFeatured);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-gray-900">
        <AIVisionWrapper 
          prompt="A majestic wellness retreat landscape in the mist with golden sunrise lighting"
          fallbackUrl="https://images.unsplash.com/photo-1544161515-4af6b1d462c2?q=85&w=2400&auto=format&fit=crop"
          aspectRatio="16:9"
          className="absolute inset-0 z-0"
          overlayClassName="bg-black/20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#FDFCF9] z-10 pointer-events-none"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-[10px] mb-8 uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles className="w-4 h-4 text-[#7C9070]" />
            Marketplace of 450+ Sanctuaries
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 serif tracking-tight drop-shadow-2xl">
            Journey Within. <br /> <span className="text-[#7C9070]">Explore the World.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
            Curated wellness retreats, healing experiences, and transformational journeys designed to restore your balance and ignite your spirit.
          </p>
          
          <div className="bg-white p-3 md:p-4 rounded-3xl md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] max-w-5xl mx-auto flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100">
              <MapPin className="w-6 h-6 text-[#7C9070] mr-4 shrink-0" />
              <input 
                type="text" 
                placeholder="Where do you seek peace?" 
                className="w-full bg-transparent border-none focus:ring-0 text-gray-800 font-medium placeholder:text-gray-400 text-lg"
              />
            </div>
            <div className="flex-1 flex items-center px-8 py-4 border-b md:border-b-0 md:border-r border-gray-100">
              <Compass className="w-6 h-6 text-[#7C9070] mr-4 shrink-0" />
              <select className="w-full bg-transparent border-none focus:ring-0 text-gray-800 font-medium text-lg cursor-pointer">
                <option value="">Any Transformation</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <Link to="/explore" className="bg-[#7C9070] hover:bg-[#5E6D55] text-white font-bold px-12 py-5 rounded-2xl md:rounded-full transition-all flex items-center justify-center gap-3 text-lg hover:scale-105 shadow-lg shadow-[#7C9070]/30">
              <Search className="w-6 h-6" />
              Find Your Sanctuary
            </Link>
          </div>
        </div>
      </section>

      {/* Visionary AI Engine Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2D312E] rounded-[3.5rem] p-12 md:p-20 text-white relative overflow-hidden shadow-3xl">
          <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
            <Sparkles className="w-64 h-64" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-8 text-[#7C9070] font-black text-xs uppercase tracking-[0.3em]">
                <Wand2 className="w-6 h-6" />
                Visionary Neural Engine
              </div>
              <h2 className="text-5xl md:text-6xl font-bold serif mb-8 leading-tight">Dream Your Sanctuary Into Existence</h2>
              <p className="text-white/60 text-xl font-light leading-relaxed mb-10 max-w-lg">
                Describe the sanctuary of your dreams, and our neural engine will manifest a high-resolution visual of your perfect healing environment.
              </p>
              
              <Link to="/explore" className="bg-[#7C9070] hover:bg-[#5E6D55] text-white font-bold px-10 py-5 rounded-2xl transition-all inline-flex items-center gap-3 shadow-xl hover:scale-105">
                Explore The Marketplace <Compass className="w-5 h-5" />
              </Link>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-inner group relative">
              <AIVisionWrapper 
                prompt="A surreal floating meditation temple above a mirror-like lake at twilight"
                fallbackUrl="https://images.unsplash.com/photo-1518196145517-f643e1ef9b60?q=80&w=1200&auto=format&fit=crop"
                aspectRatio="16:9"
                className="aspect-video"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Retreats */}
      <section className="bg-[#F9F6F1] py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-[#7C9070] font-black tracking-[0.3em] uppercase text-xs mb-4 block">ZenMarket Curated</span>
              <h2 className="text-5xl font-bold serif mb-6">Staff Picks for Transformation</h2>
              <p className="text-gray-500 text-lg">Hand-picked sanctuaries that define the standard of wellness travel.</p>
            </div>
            <Link to="/explore" className="bg-white border border-[#E5E7EB] px-10 py-4 rounded-2xl font-bold text-gray-800 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md">
              Explore Everything
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featured.map(retreat => (
              <RetreatCard key={retreat.id} retreat={retreat} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Verification */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6 group">
            <div className="w-20 h-20 bg-[#7C9070]/10 rounded-3xl flex items-center justify-center text-[#7C9070] group-hover:bg-[#7C9070] group-hover:text-white transition-all duration-500">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold serif">Verified Centers</h3>
            <p className="text-gray-500 leading-relaxed text-lg font-light">Every host and center on our platform is thoroughly vetted for quality, safety, and authenticity.</p>
          </div>
          <div className="space-y-6 group">
            <div className="w-20 h-20 bg-[#7C9070]/10 rounded-3xl flex items-center justify-center text-[#7C9070] group-hover:bg-[#7C9070] group-hover:text-white transition-all duration-500">
              <Compass className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold serif">Global Reach</h3>
            <p className="text-gray-500 leading-relaxed text-lg font-light">From the mountains of Nepal to the beaches of Costa Rica, discover retreats in over 80 countries.</p>
          </div>
          <div className="space-y-6 group">
            <div className="w-20 h-20 bg-[#7C9070]/10 rounded-3xl flex items-center justify-center text-[#7C9070] group-hover:bg-[#7C9070] group-hover:text-white transition-all duration-500">
              <Sparkles className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold serif">Personalized Discovery</h3>
            <p className="text-gray-500 leading-relaxed text-lg font-light">Our AI-driven matching system helps you find the perfect experience based on your unique goals.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
