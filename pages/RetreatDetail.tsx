
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Star, CheckCircle2, Share2, Heart, Bot, ShieldCheck, ChevronRight, Send, MessageSquare } from 'lucide-react';
import { MOCK_RETREATS } from '../constants';
import { getRetreatAIInsights, askZenAI } from '../services/geminiService';
import { Retreat } from '../types';

export const RetreatDetail: React.FC = () => {
  const { slug } = useParams();
  const [retreat, setRetreat] = useState<Retreat | null>(null);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  
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

  return (
    <div className="pb-24">
      {/* Header Image Gallery */}
      <div className="relative h-[60vh] flex gap-2 p-2">
        <div className="flex-[2] overflow-hidden rounded-l-3xl">
          <img src={retreat.images[0]} alt={retreat.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex-1 overflow-hidden rounded-tr-3xl">
            <img src={retreat.images[1] || 'https://picsum.photos/seed/alt1/800/600'} alt="Gallery" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 overflow-hidden rounded-br-3xl">
            <img src={'https://picsum.photos/seed/alt2/800/600'} alt="Gallery" className="w-full h-full object-cover" />
          </div>
        </div>
        
        <div className="absolute top-8 right-8 flex gap-3">
          <button className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all"><Share2 className="w-5 h-5" /></button>
          <button className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all"><Heart className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <div className="flex items-center gap-2 text-[#7C9070] font-bold text-sm mb-4 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                Verified Zen Center
              </div>
              <h1 className="text-4xl md:text-5xl font-bold serif mb-6">{retreat.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-gray-900">{retreat.rating}</span>
                  <span className="underline ml-1 cursor-pointer">({retreat.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-5 h-5" />
                  <span>{retreat.location.address}, {retreat.location.city}</span>
                </div>
              </div>
              <p className="text-lg leading-relaxed text-gray-700 font-light">
                {retreat.description}
              </p>
            </section>

            {/* AI Insight Box */}
            <section className="bg-blue-50/50 border border-blue-100 rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Bot className="w-24 h-24" />
              </div>
              <div className="flex items-center gap-2 mb-4 text-blue-700 font-bold text-sm">
                <Bot className="w-5 h-5" />
                ZEN AI INSIGHT
              </div>
              {loadingInsight ? (
                <div className="animate-pulse flex space-y-2 flex-col">
                  <div className="h-4 bg-blue-200 rounded w-3/4"></div>
                  <div className="h-4 bg-blue-200 rounded w-1/2"></div>
                </div>
              ) : (
                <div className="text-blue-900 whitespace-pre-line leading-relaxed italic">
                  {aiInsight}
                </div>
              )}
            </section>

            {/* Deep Brain AI Chat Section */}
            <section className="bg-white border-2 border-[#7C9070]/20 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#7C9070] rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Bot className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold serif">Deep Brain Concierge</h3>
                  <p className="text-xs text-gray-500">Ask me anything about this retreat.</p>
                </div>
              </div>
              
              <div className="min-h-[100px] mb-6 bg-gray-50 rounded-2xl p-4 text-gray-700 italic text-sm border border-gray-100">
                {askingAI ? (
                  <div className="flex gap-2">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce delay-100">●</span>
                    <span className="animate-bounce delay-200">●</span>
                  </div>
                ) : aiResponse ? (
                  <p>{aiResponse}</p>
                ) : (
                  <p className="text-gray-400">"Is this suitable for solo travelers?" or "What should I pack?"</p>
                )}
              </div>

              <form onSubmit={handleAskAI} className="relative">
                <input 
                  type="text" 
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="Ask Zen AI..."
                  className="w-full bg-[#F9F6F1] border-none rounded-2xl py-4 pl-6 pr-14 text-sm font-medium focus:ring-2 focus:ring-[#7C9070] transition-all"
                />
                <button 
                  type="submit"
                  disabled={askingAI}
                  className="absolute right-2 top-2 bottom-2 bg-[#7C9070] text-white p-3 rounded-xl hover:bg-[#5E6D55] transition-colors shadow-md"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </section>

            <section>
              <h3 className="text-2xl font-bold serif mb-6">Retreat Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {retreat.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#F9F6F1] p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-[#7C9070]" />
                    <span className="font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Host Form */}
            <section className="bg-[#2D312E] text-white p-12 rounded-[3rem] relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-3xl font-bold serif mb-2">Message the Organizer</h3>
                 <p className="text-gray-400 mb-8">Have specific requirements? Send a direct inquiry.</p>
                 
                 {formSent ? (
                   <div className="bg-[#7C9070] p-8 rounded-3xl text-center animate-in fade-in zoom-in duration-300">
                      <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
                      <h4 className="text-xl font-bold mb-2">Inquiry Sent Successfully</h4>
                      <p className="text-white/80">The host will get back to you within 24 hours.</p>
                   </div>
                 ) : (
                   <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                        <input required type="text" className="w-full bg-white/10 border-white/20 rounded-xl px-4 py-3 focus:ring-[#7C9070] text-white" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                        <input required type="email" className="w-full bg-white/10 border-white/20 rounded-xl px-4 py-3 focus:ring-[#7C9070] text-white" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Your Message</label>
                      <textarea required className="w-full bg-white/10 border-white/20 rounded-xl px-4 py-3 focus:ring-[#7C9070] text-white h-full min-h-[120px]" placeholder="Tell us about your wellness goals..."></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <button className="w-full md:w-auto bg-white text-[#2D312E] font-bold px-12 py-4 rounded-2xl hover:bg-[#7C9070] hover:text-white transition-all">
                        Send Inquiry
                      </button>
                    </div>
                   </form>
                 )}
               </div>
            </section>
          </div>

          {/* Sidebar Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-[#F0ECE4] rounded-3xl p-8 shadow-xl shadow-[#7C9070]/5 space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-gray-400 text-sm block mb-1">Price per person</span>
                  <span className="text-4xl font-bold serif">${retreat.price}</span>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-[#7C9070] font-bold">
                    <Star className="w-4 h-4 fill-[#7C9070]" />
                    {retreat.rating}
                  </div>
                  <span className="text-xs text-gray-400 underline">{retreat.reviewsCount} reviews</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 p-1 bg-[#F9F6F1] rounded-2xl border border-gray-100">
                <div className="p-3">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Start Date</span>
                  <span className="font-medium text-sm">Select date</span>
                </div>
                <div className="p-3 border-l border-gray-200">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Guests</span>
                  <span className="font-medium text-sm">1 Guest</span>
                </div>
              </div>

              <button className="w-full bg-[#7C9070] hover:bg-[#5E6D55] text-white font-bold py-5 rounded-2xl transition-all shadow-lg shadow-[#7C9070]/20 transform hover:-translate-y-1">
                Book My Experience
              </button>

              <div className="text-center">
                <p className="text-xs text-gray-400">You won't be charged yet</p>
              </div>

              <hr className="border-[#F0ECE4]" />

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>${retreat.price} x 1 person</span>
                  <span>${retreat.price}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service fee</span>
                  <span>$45</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-4 border-t border-[#F0ECE4]">
                  <span>Total</span>
                  <span>${retreat.price + 45}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
