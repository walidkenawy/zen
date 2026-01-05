
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Star, CheckCircle2, Share2, Heart, Bot, ShieldCheck, ChevronRight, Send, Plus, Minus, ShoppingCart, Image as ImageIcon, Sparkles, Wand2 } from 'lucide-react';
import { MOCK_RETREATS } from '../constants';
import { getRetreatAIInsights, askZenAI } from '../services/geminiService';
import { Retreat } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { AIVisionWrapper } from '../components/AIVisionWrapper';

export const RetreatDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [retreat, setRetreat] = useState<Retreat | null>(null);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  
  // Booking States
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [guests, setGuests] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // AI Chat States
  const [userQuestion, setUserQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [askingAI, setAskingAI] = useState(false);

  // Form States
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const found = MOCK_RETREATS.find(r => r.slug === slug);
    if (found) {
      setRetreat(found);
      if (found.dates.length > 0) setSelectedDate(found.dates[0]);
    }
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (retreat) {
      const fetchInsight = async () => {
        setLoadingInsight(true);
        const insight = await getRetreatAIInsights(retreat.title, retreat.description);
        setAiInsight(insight || null);
        setLoadingInsight(false);
      };
      fetchInsight();
    }
  }, [retreat]);

  const handleAddToCart = () => {
    if (!retreat || !selectedDate) return;
    setIsAdding(true);
    setTimeout(() => {
      addToCart(retreat, selectedDate, guests);
      setIsAdding(false);
    }, 600);
  };

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim() || !retreat) return;
    
    setAskingAI(true);
    const response = await askZenAI(userQuestion, retreat);
    setAiResponse(response);
    setAskingAI(false);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
  };

  if (!retreat) return <div className="p-20 text-center">Loading retreat...</div>;

  const saved = isInWishlist(retreat.id);

  return (
    <div className="pb-24">
      {/* Premium Image Gallery with AI Visions */}
      <div className="relative h-[70vh] flex gap-3 p-3 bg-white">
        <AIVisionWrapper 
          prompt={`Interior architecture of ${retreat.title}, high luxury wellness aesthetic`}
          fallbackUrl={`${retreat.images[0]}&q=85&w=1600&auto=format&fit=crop`}
          aspectRatio="16:9"
          className="flex-[3] rounded-[3rem] shadow-2xl"
        />
        
        <div className="flex-[1.2] flex flex-col gap-3">
          <AIVisionWrapper 
            prompt={`Gourmet wellness dining area at ${retreat.title}`}
            fallbackUrl={`${retreat.images[1] || 'https://images.unsplash.com/photo-1544161515-4af6b1d462c2?q=80&w=800&auto=format&fit=crop'}&q=80&w=800&auto=format&fit=crop`}
            aspectRatio="4:3"
            className="flex-1 rounded-[2rem] shadow-xl"
          />
          <AIVisionWrapper 
            prompt={`Landscape view of ${retreat.location.city} sanctuary`}
            fallbackUrl={`https://images.unsplash.com/featured/800x600?wellness,nature,${retreat.id}&q=80&w=800&auto=format&fit=crop`}
            aspectRatio="4:3"
            className="flex-1 rounded-[2rem] shadow-xl"
          />
        </div>
        
        <div className="absolute top-10 right-10 flex gap-4 z-30">
          <button className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-2xl hover:bg-white transition-all text-gray-700 hover:scale-110">
            <Share2 className="w-6 h-6" />
          </button>
          <button 
            onClick={() => toggleWishlist(retreat)}
            className={`p-4 rounded-full shadow-2xl transition-all transform active:scale-90 hover:scale-110 ${saved ? 'bg-red-50 text-red-500' : 'bg-white/90 backdrop-blur-md text-gray-700 hover:bg-white'}`}
          >
            <Heart className={`w-6 h-6 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <div className="flex items-center gap-3 text-[#7C9070] font-black text-xs mb-6 uppercase tracking-[0.3em]">
                <ShieldCheck className="w-5 h-5" />
                Verified Wellness Sanctuary
              </div>
              <h1 className="text-5xl md:text-6xl font-bold serif mb-8 leading-tight">{retreat.title}</h1>
              <div className="flex flex-wrap items-center gap-8 text-gray-500 mb-10 pb-10 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className={`w-4 h-4 ${i <= Math.round(retreat.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <span className="font-bold text-gray-900 ml-2">{retreat.rating}</span>
                  <span className="underline cursor-pointer">({retreat.reviewsCount} verified reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#7C9070]" />
                  <span className="font-medium text-gray-700">{retreat.location.city}, {retreat.location.country}</span>
                </div>
              </div>
              <p className="text-xl leading-relaxed text-gray-700 font-light">
                {retreat.description}
              </p>
            </section>

            {/* AI Insight Box */}
            <section className="bg-[#F9F6F1] border border-[#F0ECE4] rounded-[3rem] p-12 relative overflow-hidden group shadow-sm">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all duration-700">
                <Bot className="w-48 h-48" />
              </div>
              <div className="flex items-center gap-3 mb-6 text-[#7C9070] font-black text-xs uppercase tracking-[0.2em]">
                <Bot className="w-6 h-6" />
                Zen Brain Concierge Insight
              </div>
              {loadingInsight ? (
                <div className="animate-pulse flex space-y-4 flex-col">
                  <div className="h-5 bg-gray-200 rounded-full w-3/4"></div>
                  <div className="h-5 bg-gray-200 rounded-full w-1/2"></div>
                </div>
              ) : (
                <div className="text-gray-800 whitespace-pre-line leading-relaxed italic text-lg font-light">
                  {aiInsight}
                </div>
              )}
            </section>

            {/* AI Interaction */}
            <section className="bg-white border border-[#F0ECE4] rounded-[3rem] p-12 shadow-2xl shadow-gray-200/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-[#7C9070] rounded-[1.5rem] flex items-center justify-center text-white shadow-xl">
                  <Bot className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold serif">Ask Zen Brain AI</h3>
                  <p className="text-sm text-gray-400 font-medium uppercase tracking-widest">Instant sanctuary intelligence</p>
                </div>
              </div>
              
              <div className="min-h-[100px] mb-8 bg-[#FDFCF9] rounded-[2rem] p-8 text-gray-700 italic text-lg border border-[#F0ECE4] shadow-inner">
                {askingAI ? (
                  <div className="flex gap-2">
                    <span className="w-3 h-3 bg-[#7C9070] rounded-full animate-bounce"></span>
                    <span className="w-3 h-3 bg-[#7C9070] rounded-full animate-bounce delay-100"></span>
                    <span className="w-3 h-3 bg-[#7C9070] rounded-full animate-bounce delay-200"></span>
                  </div>
                ) : aiResponse ? (
                  <p className="leading-relaxed">"{aiResponse}"</p>
                ) : (
                  <p className="text-gray-300">"What is the daily ritual schedule like at this sanctuary?"</p>
                )}
              </div>

              <form onSubmit={handleAskAI} className="relative">
                <input 
                  type="text" 
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="Ask about the experience..."
                  className="w-full bg-[#F9F6F1] border-none rounded-[1.5rem] py-6 pl-10 pr-20 text-lg font-medium focus:ring-2 focus:ring-[#7C9070] transition-all"
                />
                <button 
                  type="submit"
                  disabled={askingAI}
                  className="absolute right-3 top-3 bottom-3 bg-[#7C9070] text-white px-6 rounded-[1rem] hover:bg-[#5E6D55] transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-6 h-6" />
                </button>
              </form>
            </section>
          </div>

          {/* Sidebar Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-[#F0ECE4] rounded-[3rem] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.08)] space-y-10">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest block mb-2">Investment</span>
                  <span className="text-5xl font-bold serif">${retreat.price}</span>
                </div>
              </div>

              <div className="space-y-5">
                <button 
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full bg-[#7C9070] hover:bg-[#5E6D55] text-white font-black uppercase tracking-widest py-6 rounded-2xl transition-all shadow-2xl shadow-[#7C9070]/30 transform hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Add to My Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
