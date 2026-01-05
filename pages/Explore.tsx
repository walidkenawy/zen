
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// Fixed: Added Compass to the imports from lucide-react
import { Filter, SlidersHorizontal, Map as MapIcon, Grid, List as ListIcon, Compass } from 'lucide-react';
import { MOCK_RETREATS, CATEGORIES } from '../constants';
import { RetreatCard } from '../components/RetreatCard';

export const Explore: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(2500);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const filtered = MOCK_RETREATS.filter(r => {
    const matchesCat = selectedCategory ? r.category === selectedCategory : true;
    const matchesPrice = r.price <= priceRange;
    return matchesCat && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-[#FDFCF9]">
      {/* Search Filter Header */}
      <div className="bg-white border-b border-[#F0ECE4] sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
              <button 
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === '' ? 'bg-[#7C9070] text-white' : 'bg-[#F9F6F1] text-gray-600 hover:bg-gray-100'}`}
              >
                All Experiences
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-[#7C9070] text-white' : 'bg-[#F9F6F1] text-gray-600 hover:bg-gray-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex p-1 bg-[#F9F6F1] rounded-xl border border-gray-100">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#7C9070]' : 'text-gray-400'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'map' ? 'bg-white shadow-sm text-[#7C9070]' : 'text-gray-400'}`}
                >
                  <MapIcon className="w-5 h-5" />
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 space-y-8 hidden md:block">
            <div>
              <h4 className="font-bold mb-4 serif text-lg">Price Range</h4>
              <input 
                type="range" 
                min="0" 
                max="5000" 
                step="100" 
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#7C9070]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>$0</span>
                <span>Max: ${priceRange}</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 serif text-lg">Duration</h4>
              <div className="space-y-2">
                {['1-3 Days', '4-7 Days', '8-14 Days', '2+ Weeks'].map(d => (
                  <label key={d} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#7C9070] focus:ring-[#7C9070]" />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">{d}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 serif text-lg">Vibe</h4>
              <div className="flex flex-wrap gap-2">
                {['Quiet', 'Social', 'Challenging', 'Restorative', 'Luxury', 'Authentic'].map(v => (
                  <button key={v} className="text-xs font-medium px-3 py-1 bg-white border border-gray-200 rounded-full hover:border-[#7C9070] hover:text-[#7C9070] transition-all">
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Area */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold serif">{filtered.length} experiences found</h2>
              <select className="bg-transparent border-none text-sm font-medium focus:ring-0">
                <option>Sort by: Most Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {filtered.map(retreat => (
                  <RetreatCard key={retreat.id} retreat={retreat} />
                ))}
                {filtered.length === 0 && (
                  <div className="col-span-full py-20 text-center space-y-4">
                    <Compass className="w-16 h-16 text-gray-200 mx-auto" />
                    <p className="text-gray-500 font-medium">No retreats found matching your current filters.</p>
                    <button 
                      onClick={() => {setSelectedCategory(''); setPriceRange(5000);}}
                      className="text-[#7C9070] font-bold underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#E5E7EB] rounded-3xl h-[600px] flex items-center justify-center relative overflow-hidden">
                 {/* Mock Map View */}
                <img 
                  src="https://picsum.photos/seed/mockmap/1200/800" 
                  alt="Map Placeholder" 
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-center max-w-sm">
                    <MapIcon className="w-12 h-12 text-[#7C9070] mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Interactive Map</h3>
                    <p className="text-sm text-gray-500 mb-6">Explore wellness centers and retreats visually across the globe. (Map API Simulation)</p>
                    <button className="bg-[#7C9070] text-white px-6 py-2 rounded-full font-bold">Try Map View</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
