
import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Calendar, MapPin, ArrowRight, Globe, Share2, Download, Home } from 'lucide-react';
import confetti from 'https://esm.sh/canvas-confetti@^1.9.3';

export const BookingSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingIds = location.state?.bookingIds || ['ZM-52912'];

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7C9070', '#5E6D55', '#FDFCF9']
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCF9] py-24 flex items-center justify-center">
      <div className="max-w-2xl w-full px-4">
        <div className="bg-white border border-[#F0ECE4] rounded-[3rem] p-12 text-center shadow-2xl shadow-gray-200/50">
          <div className="w-24 h-24 bg-[#7C9070]/10 rounded-full flex items-center justify-center mx-auto mb-8 text-[#7C9070]">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          
          <h1 className="text-5xl font-bold serif mb-6">Namaste, Journeyer</h1>
          <p className="text-lg text-gray-500 mb-10 max-w-md mx-auto">
            Your transformation has begun. We've sent a detailed confirmation and packing guide to your inbox.
          </p>

          <div className="bg-[#F9F6F1] rounded-3xl p-8 mb-12 text-left">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Booking Reference</h3>
            <div className="space-y-4">
              {bookingIds.map((id: string) => (
                <div key={id} className="flex justify-between items-center border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <span className="font-bold text-lg">{id}</span>
                  <span className="text-xs bg-[#7C9070] text-white px-3 py-1 rounded-full font-bold">Confirmed</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-2 gap-8">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-[#7C9070]" />
                <span className="text-sm font-medium">Global Support 24/7</span>
              </div>
              <div className="flex items-center gap-3">
                <Share2 className="w-5 h-5 text-[#7C9070]" />
                <span className="text-sm font-medium">Eco-Verified Center</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              to="/dashboard" 
              className="bg-[#7C9070] text-white font-bold py-5 rounded-2xl hover:bg-[#5E6D55] transition-all shadow-xl shadow-[#7C9070]/20 flex items-center justify-center gap-2"
            >
              Go to My Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
            <button 
              className="bg-white border border-gray-200 text-gray-700 font-bold py-5 rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" /> Save Receipt
            </button>
          </div>

          <Link to="/" className="mt-12 inline-flex items-center gap-2 text-gray-400 hover:text-[#7C9070] font-bold text-sm transition-colors">
            <Home className="w-4 h-4" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};
