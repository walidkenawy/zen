
import React, { useEffect, useState } from 'react';
import { Calendar, Heart, MessageSquare, Settings, CreditCard, LogOut, ChevronRight, Bot, Compass } from 'lucide-react';
import { MOCK_USER, MOCK_RETREATS } from '../constants';
import { getPersonalizedRecommendations } from '../services/geminiService';

export const Dashboard: React.FC = () => {
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    const fetchRecs = async () => {
      setLoadingAI(true);
      const recs = await getPersonalizedRecommendations(['Meditation', 'Quiet', 'Nature']);
      setRecommendations(recs);
      setLoadingAI(false);
    };
    fetchRecs();
  }, []);

  const tabs = [
    { name: 'My Bookings', icon: Calendar, active: true },
    { name: 'Favorites', icon: Heart },
    { name: 'Messages', icon: MessageSquare },
    { name: 'Payments', icon: CreditCard },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-72 space-y-8">
          <div className="flex items-center gap-4 p-4 bg-white border border-[#F0ECE4] rounded-3xl">
            <img src={MOCK_USER.avatar} alt={MOCK_USER.name} className="w-16 h-16 rounded-2xl object-cover" />
            <div>
              <h3 className="font-bold text-lg">{MOCK_USER.name}</h3>
              <p className="text-xs text-gray-400">Zen Member since 2023</p>
            </div>
          </div>

          <nav className="space-y-1">
            {tabs.map(tab => (
              <button 
                key={tab.name}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${tab.active ? 'bg-[#7C9070] text-white shadow-lg shadow-[#7C9070]/20' : 'text-gray-500 hover:bg-[#F9F6F1]'}`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </button>
            ))}
            <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-50 mt-12">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Main Dashboard Area */}
        <div className="flex-1 space-y-12">
          {/* AI Recommendation Banner */}
          <div className="bg-[#7C9070] rounded-3xl p-8 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                <Bot className="w-40 h-40" />
             </div>
             <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Bot className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm tracking-widest uppercase">AI Travel Companion</span>
                </div>
                <h2 className="text-3xl font-bold serif mb-4">Thinking of your next journey, {MOCK_USER.name.split(' ')[0]}?</h2>
                {loadingAI ? (
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-white/20 rounded w-full"></div>
                    <div className="h-4 bg-white/20 rounded w-3/4"></div>
                  </div>
                ) : (
                  <p className="text-white/80 leading-relaxed italic text-lg">
                    "{recommendations || 'Find a peaceful forest retreat to reconnect with your practice.'}"
                  </p>
                )}
                <button className="mt-8 bg-white text-[#7C9070] px-8 py-3 rounded-xl font-bold hover:shadow-xl transition-all">
                  Explore Matches
                </button>
             </div>
          </div>

          {/* Bookings Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold serif">Upcoming Retreats</h2>
              <button className="text-sm font-bold text-[#7C9070] hover:underline">View History</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white border border-[#F0ECE4] p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6 hover:shadow-lg transition-shadow">
                <img src={MOCK_RETREATS[0].images[0]} className="w-full md:w-32 h-32 rounded-2xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#7C9070] mb-1">
                    <span className="bg-[#7C9070]/10 px-2 py-0.5 rounded uppercase">Confirmed</span>
                    <span>Order #ZM-9821</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{MOCK_RETREATS[0].title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Oct 15, 2024</span>
                    <span className="flex items-center gap-1"><Compass className="w-4 h-4" /> {MOCK_RETREATS[0].location.city}</span>
                  </div>
                </div>
                <button className="bg-[#F9F6F1] px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#F0ECE4] transition-colors flex items-center gap-2">
                  Booking Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          {/* Quick Stats/Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#F0ECE4] p-8 rounded-3xl">
              <span className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Total Retreats</span>
              <span className="text-4xl font-bold serif">12</span>
              <p className="text-xs text-[#7C9070] font-medium mt-2">+2 in the last year</p>
            </div>
            <div className="bg-white border border-[#F0ECE4] p-8 rounded-3xl">
              <span className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Zen Score</span>
              <span className="text-4xl font-bold serif">840</span>
              <p className="text-xs text-[#7C9070] font-medium mt-2">Top 5% of explorers</p>
            </div>
            <div className="bg-white border border-[#F0ECE4] p-8 rounded-3xl">
              <span className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Saved Places</span>
              <span className="text-4xl font-bold serif">24</span>
              <p className="text-xs text-[#7C9070] font-medium mt-2">In 8 countries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
