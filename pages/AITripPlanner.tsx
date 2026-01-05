
import React, { useState } from 'react';
import { Sparkles, Clock, DollarSign, Heart, ArrowRight, Bot, Compass, Send, CheckCircle2 } from 'lucide-react';
import { generateItinerary, TripPlanParams } from '../services/geminiService';

export const AITripPlanner: React.FC = () => {
  const [params, setParams] = useState<TripPlanParams>({
    type: 'Yoga & Meditation',
    duration: 7,
    budget: 2000,
    interests: ''
  });
  const [itinerary, setItinerary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await generateItinerary(params);
    setItinerary(result || null);
    setIsLoading(false);
  };

  const retreatTypes = [
    'Yoga & Meditation', 
    'Adventure & Nature', 
    'Digital Detox', 
    'Healing & Therapy', 
    'Art & Creativity',
    'Leadership & Growth'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C9070]/10 text-[#7C9070] font-bold text-sm mb-4">
          <Sparkles className="w-4 h-4" />
          AI Journey Architect
        </div>
        <h1 className="text-4xl md:text-5xl font-bold serif mb-4">Plan Your Transformation</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Let our Deep Brain AI curate a personalized wellness itinerary tailored to your soul's current needs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form Area */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white border border-[#F0ECE4] rounded-3xl p-8 shadow-xl shadow-gray-200/50 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Trip Type</label>
              <div className="grid grid-cols-1 gap-2">
                {retreatTypes.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setParams({ ...params, type })}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                      params.type === type 
                      ? 'bg-[#7C9070] text-white border-[#7C9070] shadow-md' 
                      : 'bg-[#F9F6F1] text-gray-600 border-transparent hover:border-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Duration (Days)</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={params.duration}
                    onChange={(e) => setParams({ ...params, duration: parseInt(e.target.value) || 1 })}
                    className="w-full bg-[#F9F6F1] border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#7C9070]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Budget ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    min="500"
                    step="100"
                    value={params.budget}
                    onChange={(e) => setParams({ ...params, budget: parseInt(e.target.value) || 500 })}
                    className="w-full bg-[#F9F6F1] border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#7C9070]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Interests & Vibe</label>
              <textarea
                placeholder="E.g. I love forests, silent meditation, and need a break from screens..."
                value={params.interests}
                onChange={(e) => setParams({ ...params, interests: e.target.value })}
                className="w-full bg-[#F9F6F1] border-none rounded-xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#7C9070] h-32"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#7C9070] hover:bg-[#5E6D55] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-[#7C9070]/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Architecting...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Itinerary
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-3">
          {itinerary ? (
            <div className="bg-white border border-[#F0ECE4] rounded-[2rem] p-10 shadow-2xl animate-in fade-in slide-in-from-right-10 duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#7C9070] rounded-2xl flex items-center justify-center text-white">
                  <Bot className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold serif">Your Zen Itinerary</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Generated by Deep Brain AI</p>
                </div>
              </div>
              
              <div className="prose prose-stone prose-sm max-w-none text-gray-700 leading-relaxed">
                {itinerary.split('\n').map((line, i) => {
                  if (line.startsWith('##')) {
                    return <h3 key={i} className="text-xl font-bold serif text-[#7C9070] mt-8 mb-4 border-b border-gray-100 pb-2">{line.replace('##', '').trim()}</h3>;
                  }
                  if (line.startsWith('###')) {
                     return <h4 key={i} className="text-lg font-bold serif text-gray-800 mt-6 mb-3">{line.replace('###', '').trim()}</h4>;
                  }
                  if (line.startsWith('*')) {
                    return <li key={i} className="mb-2 list-none flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#7C9070] mt-1 shrink-0" />
                      {line.replace('*', '').trim()}
                    </li>;
                  }
                  return <p key={i} className="mb-4">{line}</p>;
                })}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-[#2D312E] text-white font-bold py-4 rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-2">
                  Save Itinerary
                </button>
                <button className="flex-1 bg-[#F9F6F1] text-[#7C9070] font-bold py-4 rounded-2xl hover:bg-[#F0ECE4] transition-all flex items-center justify-center gap-2">
                  Print Guide
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full bg-[#FDFCF9] border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center text-center p-12">
              {isLoading ? (
                <div className="space-y-6">
                  <div className="w-24 h-24 bg-[#7C9070]/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Compass className="w-12 h-12 text-[#7C9070] animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold serif mb-2">Analyzing Marketplace Trends...</h3>
                    <p className="text-gray-400 text-sm max-w-xs mx-auto">Gemini is searching 450+ retreats to find your perfect alignment.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <Compass className="w-12 h-12 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold serif mb-2">Ready to Architect?</h3>
                    <p className="text-gray-400 text-sm max-w-xs mx-auto">Fill out the form on the left to generate your custom wellness journey.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
