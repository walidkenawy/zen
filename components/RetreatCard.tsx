
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Calendar, Clock } from 'lucide-react';
import { Retreat } from '../types';
import { AIVisionWrapper } from './AIVisionWrapper';

interface RetreatCardProps {
  retreat: Retreat;
}

export const RetreatCard: React.FC<RetreatCardProps> = ({ retreat }) => {
  return (
    <div className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500 border border-[#F0ECE4] transform hover:-translate-y-2">
      <AIVisionWrapper 
        prompt={retreat.title}
        fallbackUrl={`${retreat.images[0]}&auto=format&fit=crop&q=85&w=1000`}
        aspectRatio="4:3"
        className="aspect-[4/3]"
        priority={false}
      />
      
      <Link to={`/retreat/${retreat.slug}`} className="p-8 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center text-gray-400 text-[10px] font-black uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#7C9070]" />
            {retreat.location.city}, {retreat.location.country}
          </div>
          <div className="flex items-center text-[10px] font-black bg-[#F9F6F1] px-3 py-1 rounded-full text-gray-700">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 mr-1.5" />
            {retreat.rating}
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4 serif group-hover:text-[#7C9070] transition-colors leading-tight line-clamp-2">{retreat.title}</h3>
        
        <p className="text-gray-500 line-clamp-2 mb-8 leading-relaxed font-light italic text-sm">
          "{retreat.description.split('.')[0]}."
        </p>

        <div className="mt-auto flex items-center justify-between pt-6 border-t border-[#F9F6F1]">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Starts From</span>
            <span className="text-2xl font-bold text-[#2D2D2D] serif">${retreat.price}</span>
          </div>
          <div className="bg-[#7C9070]/10 text-[#7C9070] p-3 rounded-2xl group-hover:bg-[#7C9070] group-hover:text-white transition-all duration-500">
             <Calendar className="w-5 h-5" />
          </div>
        </div>
      </Link>
    </div>
  );
};
