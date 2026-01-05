
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Heart, MessageSquare, Settings, CreditCard, LogOut, ChevronRight, Bot, Compass, Sparkles, Trash2, MapPin, ShieldCheck } from 'lucide-react';
import { MOCK_USER, MOCK_RETREATS } from '../constants';
import { getPersonalizedRecommendations } from '../services/geminiService';
import { useWishlist } from '../context/WishlistContext';
import { AIVisionWrapper } from '../components/AIVisionWrapper';

export const Dashboard: React.FC = () => {
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [activeTab, setActiveTab] = useState('My Bookings');
  const { wishlist, toggleWishlist } = useWishlist();

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
    { name: 'My Bookings', icon: Calendar },
    { name: 'Favorites', icon: Heart, count: wishlist.length },
    { name: 'Messages', icon: MessageSquare },
    { name: 'Trip Planner', icon: Sparkles, path: '/trip-planner' },
    { name: 'Payments', icon: CreditCard },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-80 space-y-10">
          <div className="flex flex-col items-center p-10 bg-white border border-[#F0ECE4] rounded-[3rem] shadow-sm text-center">
            <div className="relative group mb-6">
              <img src={MOCK_USER.avatar} alt={MOCK_USER.name} className="w-24 h-24 rounded-[2rem] object-cover shadow-2xl border-4 border-[#FDFCF9] group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute -bottom-2 -right-2 bg-[#7C9070] p-1.5 rounded-lg text-white border-2 border-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <h3 className="font-bold text-2xl serif">{MOCK_USER.name}</h3>
            <p className="text-xs text-[#7C9070] font-black uppercase tracking-widest mt-1">Zen Master Explorer</p>
          </div>

          <nav className="space-y-2">
            {tabs.map(tab => (
              tab.path ? (
                <Link 
                  key={tab.name}
                  to={tab.path}
                  className="w-full flex items-center gap-5 px-8 py-5 rounded-[1.5rem] text-sm font-bold text-gray-500 hover:bg-[#F9F6F1] transition-all group"
                >
                  <tab.icon className="w-6 h-6 text-[#7C9070] group-hover:scale-110 transition-transform" />
                  {tab.name}
                  <span className="ml-auto bg-[#7C9070] text-white text-[10px] px-2 py-0.5 rounded-full font-black">AI NEW</span>
                </Link>
              ) : (
                <button 
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`w-full flex items-center gap-5 px-8 py-5 rounded-[1.5rem] text-sm font-bold transition-all relative ${activeTab === tab.name ? 'bg-[#7C9070] text-white shadow-xl shadow-[#7C9070]/20' : 'text-gray-500 hover:bg-[#F9F6F1] group'}`}
                >
                  <tab.icon className={`w-6 h-6 ${activeTab === tab.name ? 'text-white' : 'text-[#7C9070] group-hover:scale-110 transition-transform'}`} />
                  {tab.name}
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className={`ml-auto text-[10px] px-2.5 py-1 rounded-full font-black ${activeTab === tab.name ? 'bg-white text-[#7C9070]' : 'bg-[#7C9070]/10 text-[#7C9070]'}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              )
            ))}
            <div className="pt-10">
              <button className="w-full flex items-center gap-5 px-8 py-5 rounded-[1.5rem] text-sm font-bold text-red-400 hover:bg-red-50 transition-colors">
                <LogOut className="w-6 h-6" />
                Disconnect
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Dashboard Area */}
        <div className="flex-1 space-y-16">
          {activeTab === 'My Bookings' && (
            <>
              {/* AI Recommendation Banner */}
              <div className="bg-[#2D312E] rounded-[3.5rem] p-12 text-white relative overflow-hidden group shadow-2xl">
                 <AIVisionWrapper 
                    prompt="A panoramic sunset over a misty yoga sanctuary in the mountains"
                    fallbackUrl="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop"
                    aspectRatio="16:9"
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    overlayClassName="hidden"
                 />
                 <div className="absolute top-0 right-0 p-12 opacity-20 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
                    <Bot className="w-56 h-56" />
                 </div>
                 <div className="relative z-10 max-w-3xl">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="bg-[#7C9070] p-3 rounded-2xl shadow-lg">
                        <Bot className="w-8 h-8" />
                      </div>
                      <span className="font-black text-xs tracking-[0.3em] uppercase text-[#7C9070]">Sanctuary AI Companion</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold serif mb-8 leading-tight">Your next alignment awaits, {MOCK_USER.name.split(' ')[0]}.</h2>
                    {loadingAI ? (
                      <div className="animate-pulse space-y-4">
                        <div className="h-6 bg-white/10 rounded-full w-full"></div>
                        <div className="h-6 bg-white/10 rounded-full w-3/4"></div>
                      </div>
                    ) : (
                      <p className="text-white/70 leading-relaxed italic text-2xl font-light">
                        "{recommendations || 'Find a peaceful forest retreat to reconnect with your practice.'}"
                      </p>
                    )}
                    <Link to="/trip-planner" className="mt-12 bg-white text-[#2D312E] px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#7C9070] hover:text-white transition-all inline-flex items-center gap-3 shadow-2xl group/btn">
                      Architect Journey <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </Link>
                 </div>
              </div>

              {/* Bookings Section */}
              <section>
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-bold serif">Upcoming Journeys</h2>
                  <button className="text-sm font-black uppercase tracking-widest text-[#7C9070] hover:underline">Full History</button>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white border border-[#F0ECE4] p-8 rounded-[3rem] flex flex-col md:flex-row items-center gap-10 hover:shadow-2xl transition-all group cursor-pointer">
                    <AIVisionWrapper 
                      prompt={MOCK_RETREATS[0].title}
                      fallbackUrl={MOCK_RETREATS[0].images[0]}
                      aspectRatio="1:1"
                      className="w-full md:w-48 h-48 rounded-[2.5rem] shadow-xl shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#7C9070] mb-3">
                        <span className="bg-[#7C9070]/10 px-3 py-1 rounded-full border border-[#7C9070]/20">Journey Confirmed</span>
                        <span className="text-gray-400">#ZM-9821-X</span>
                      </div>
                      <h3 className="text-3xl font-bold mb-4 serif leading-tight">{MOCK_RETREATS[0].title}</h3>
                      <div className="flex flex-wrap items-center gap-8 text-sm text-gray-500 font-medium">
                        <span className="flex items-center gap-2"><Calendar className="w-5 h-5 text-[#7C9070]" /> Oct 15 - 22, 2024</span>
                        <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-[#7C9070]" /> {MOCK_RETREATS[0].location.city}, {MOCK_RETREATS[0].location.country}</span>
                      </div>
                    </div>
                    <button className="bg-[#F9F6F1] px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-[#7C9070] hover:text-white transition-all flex items-center gap-3 group/btn shadow-sm">
                      Travel Hub <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </section>
            </>
          )}

          {activeTab === 'Favorites' && (
            <section className="animate-in fade-in slide-in-from-bottom-10 duration-700">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-bold serif">Your Soul Wishlist</h2>
                <span className="text-sm font-black uppercase tracking-widest text-gray-300">{wishlist.length} Sanctuaries Saved</span>
              </div>
              
              {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {wishlist.map(retreat => (
                    <div key={retreat.id} className="bg-white border border-[#F0ECE4] rounded-[3rem] overflow-hidden flex flex-col hover:shadow-2xl transition-all group">
                      <div className="h-56 relative overflow-hidden">
                        <AIVisionWrapper 
                          prompt={retreat.title}
                          fallbackUrl={retreat.images[0]}
                          aspectRatio="16:9"
                          className="w-full h-full"
                        />
                        <button 
                          onClick={() => toggleWishlist(retreat)}
                          className="absolute top-6 right-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl group/fav active:scale-90 z-30"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="p-8">
                        <h4 className="font-bold text-2xl mb-3 serif line-clamp-1">{retreat.title}</h4>
                        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8 pb-8 border-b border-gray-100">
                          <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#7C9070]" /> {retreat.location.city}</span>
                          <span className="flex items-center gap-2"><Compass className="w-4 h-4 text-[#7C9070]" /> {retreat.category}</span>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-2xl font-bold text-[#7C9070] serif">${retreat.price}</span>
                          <Link to={`/retreat/${retreat.slug}`} className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#7C9070] flex items-center gap-2 group/link">
                            Explore Detail <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-40 text-center bg-white border border-dashed border-[#F0ECE4] rounded-[4rem] px-10">
                  <div className="w-24 h-24 bg-[#F9F6F1] rounded-full flex items-center justify-center mx-auto mb-8 text-[#7C9070]/20">
                     <Heart className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-bold serif text-gray-400 mb-4">Your sanctuary list is empty</h3>
                  <p className="text-lg text-gray-400 max-w-sm mx-auto mb-12 font-light italic">Every journey starts with a single click. Save retreats you're interested in to keep track of them here.</p>
                  <Link to="/explore" className="bg-[#7C9070] text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#5E6D55] transition-all shadow-2xl shadow-[#7C9070]/20 inline-block transform hover:-translate-y-1">
                    Begin Exploring
                  </Link>
                </div>
              )}
            </section>
          )}

          {/* Quick Stats - Premium Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-[#F0ECE4]">
            <div className="bg-white border border-[#F0ECE4] p-10 rounded-[3rem] shadow-sm group hover:border-[#7C9070] transition-colors">
              <span className="block text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Life Journeys</span>
              <span className="text-5xl font-bold serif">12</span>
              <p className="text-xs text-[#7C9070] font-black uppercase tracking-widest mt-4 flex items-center gap-2">
                 <Sparkles className="w-4 h-4" /> +2 Active paths
              </p>
            </div>
            <div className="bg-white border border-[#F0ECE4] p-10 rounded-[3rem] shadow-sm group hover:border-[#7C9070] transition-colors">
              <span className="block text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Zen Resonance</span>
              <span className="text-5xl font-bold serif">840</span>
              <p className="text-xs text-[#7C9070] font-black uppercase tracking-widest mt-4 flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4" /> Top 5% of Seeker
              </p>
            </div>
            <div className="bg-white border border-[#F0ECE4] p-10 rounded-[3rem] shadow-sm group hover:border-[#7C9070] transition-colors">
              <span className="block text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">World Sanctuaries</span>
              <span className="text-5xl font-bold serif">{wishlist.length}</span>
              <p className="text-xs text-[#7C9070] font-black uppercase tracking-widest mt-4 flex items-center gap-2">
                 <Compass className="w-4 h-4" /> {new Set(wishlist.map(r => r.location.country)).size} Regions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
