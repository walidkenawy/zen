
import React from 'react';
import { Heart, Globe, ShieldCheck, Sparkles, Anchor, Leaf } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1499728603263-13726abce5fd?auto=format&fit=crop&q=80&w=2000" 
            alt="Serene landscape"
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold serif mb-6 tracking-tight">Our Journey to Zen</h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto italic">
            Connecting seekers with world-class wellness experiences since 2023.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="bg-white rounded-3xl p-12 shadow-xl shadow-gray-200/50 border border-[#F0ECE4] text-center">
          <span className="text-[#7C9070] font-bold tracking-widest uppercase text-xs mb-4 block">Our Purpose</span>
          <h2 className="text-4xl font-bold serif mb-8">Elevating Human Well-being</h2>
          <p className="text-lg text-gray-600 leading-relaxed font-light mb-0">
            At ZenMarket, we believe that inner peace shouldn't be a luxury of distance or access. 
            Our mission is to democratize the world's most transformative wellness experiences, 
            bridging the gap between ancient wisdom and modern seekers through a seamless, 
            trusted global marketplace.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold serif">The Story Behind ZenMarket</h2>
            <p className="text-gray-600 leading-relaxed">
              It began in a small tea house in Kyoto. Our founder, Alex Rivers, realized that while the world was more connected than ever, people felt more spiritually isolated. The path to finding a genuine retreat was obscured by fragmented information and lack of trust.
            </p>
            <p className="text-gray-600 leading-relaxed">
              ZenMarket was born from a simple question: <i>"What if we could create a sanctuary for the search itself?"</i> A place where practitioners could showcase their healing arts and travelers could find their next transformation with absolute confidence.
            </p>
            <div className="pt-4">
              <div className="flex items-center gap-4 border-l-4 border-[#7C9070] pl-6 italic text-lg text-gray-700">
                "We don't just book trips; we facilitate the return to oneself."
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1545201071-75f0286991a8?auto=format&fit=crop&q=80&w=1000" 
                alt="Meditation by the water"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-[#7C9070] text-white p-8 rounded-3xl hidden md:block max-w-xs shadow-xl">
              <Sparkles className="w-10 h-10 mb-4" />
              <h4 className="font-bold text-xl mb-2">100k+ Souls</h4>
              <p className="text-sm text-white/80">Guided toward their path of transformation across 80+ countries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#F9F6F1] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold serif mb-16">Values That Guide Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="bg-white p-10 rounded-3xl border border-[#F0ECE4] hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-[#7C9070]/10 rounded-2xl flex items-center justify-center text-[#7C9070] mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold serif mb-4">Radical Integrity</h3>
              <p className="text-gray-500 leading-relaxed">We vet every center and host personally. If it doesn't meet our standard of authenticity, it doesn't make it to your screen.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl border border-[#F0ECE4] hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-[#7C9070]/10 rounded-2xl flex items-center justify-center text-[#7C9070] mb-6">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold serif">Conscious Connection</h3>
              <p className="text-gray-500 leading-relaxed">We believe in travel that gives back. We support local communities and promote sustainable practices at every destination.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl border border-[#F0ECE4] hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-[#7C9070]/10 rounded-2xl flex items-center justify-center text-[#7C9070] mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold serif">Heart-Led Growth</h3>
              <p className="text-gray-500 leading-relaxed">Profit is our fuel, but people are our purpose. We prioritize the mental and spiritual health of our community above all else.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C9070]/10 text-[#7C9070] font-bold text-sm">
            <Anchor className="w-4 h-4" />
            Stay Grounded
          </div>
          <h2 className="text-4xl md:text-5xl font-bold serif">Ready to Begin Your Story?</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Your next chapter of healing and discovery is waiting to be written. Let us help you find the right page.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button className="bg-[#7C9070] text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all">
              Browse Retreats
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all">
              Contact Our Guides
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
