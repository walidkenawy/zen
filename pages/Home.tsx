
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Compass, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { MOCK_RETREATS, CATEGORIES } from '../constants';
import { RetreatCard } from '../components/RetreatCard';

export const Home: React.FC = () => {
  const featured = MOCK_RETREATS.filter(r => r.isFeatured);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/hero-retreat/1920/1080" 
            alt="Hero background"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 serif tracking-tight">
            Journey Within. <br /> Explore the World.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Curated wellness retreats, healing experiences, and transformational journeys designed to restore your balance.
          </p>
          
          <div className="bg-white p-2 md:p-3 rounded-2xl md:rounded-full shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100">
              <MapPin className="w-5 h-5 text-[#7C9070] mr-3" />
              <input 
                type="text" 
                placeholder="Where to?" 
                className="w-full bg-transparent border-none focus:ring-0 text-gray-800 font-medium placeholder:text-gray-400"
              />
            </div>
            <div className="flex-1 flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100">
              <Compass className="w-5 h-5 text-[#7C9070] mr-3" />
              <select className="w-full bg-transparent border-none focus:ring-0 text-gray-800 font-medium">
                <option value="">Any Category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <Link to="/explore" className="bg-[#7C9070] hover:bg-[#5E6D55] text-white font-bold px-8 py-4 rounded-xl md:rounded-full transition-all flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Find Retreat
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold serif mb-2">Find Your Focus</h2>
            <p className="text-gray-500">Choose a path that resonates with your soul.</p>
          </div>
          <Link to="/explore" className="text-[#7C9070] font-bold hover:underline hidden sm:block">View all categories →</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <Link 
              to={`/explore?category=${cat}`} 
              key={cat}
              className="group bg-white border border-[#F0ECE4] rounded-2xl p-6 text-center hover:border-[#7C9070] hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-[#F9F6F1] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#7C9070] group-hover:text-white transition-colors">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-gray-700">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Retreats */}
      <section className="bg-[#F9F6F1] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[#7C9070] font-bold tracking-widest uppercase text-xs mb-2 block">Staff Picks</span>
              <h2 className="text-4xl font-bold serif">Experiences We Love</h2>
            </div>
            <Link to="/explore" className="bg-white border border-[#E5E7EB] px-6 py-3 rounded-full font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              Explore Everything
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map(retreat => (
              <RetreatCard key={retreat.id} retreat={retreat} />
            ))}
          </div>
        </div>
      </section>

      {/* Features/Trust */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-14 h-14 bg-[#7C9070]/10 rounded-2xl flex items-center justify-center text-[#7C9070]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold serif">Verified Centers</h3>
            <p className="text-gray-500 leading-relaxed">Every host and center on our platform is thoroughly vetted for quality, safety, and authenticity.</p>
          </div>
          <div className="space-y-4">
            <div className="w-14 h-14 bg-[#7C9070]/10 rounded-2xl flex items-center justify-center text-[#7C9070]">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold serif">Global Reach</h3>
            <p className="text-gray-500 leading-relaxed">From the mountains of Nepal to the beaches of Costa Rica, discover retreats in over 80 countries.</p>
          </div>
          <div className="space-y-4">
            <div className="w-14 h-14 bg-[#7C9070]/10 rounded-2xl flex items-center justify-center text-[#7C9070]">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold serif">Personalized Discovery</h3>
            <p className="text-gray-500 leading-relaxed">Our AI-driven matching system helps you find the perfect experience based on your unique goals.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
