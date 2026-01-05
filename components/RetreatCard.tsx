
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Calendar, Clock } from 'lucide-react';
import { Retreat } from '../types';

interface RetreatCardProps {
  retreat: Retreat;
}

export const RetreatCard: React.FC<RetreatCardProps> = ({ retreat }) => {
  return (
    <Link to={`/retreat/${retreat.slug}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#F0ECE4]">
      <div className="relative h-64 overflow-hidden">
        <img
          src={retreat.images[0]}
          alt={retreat.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#7C9070] uppercase tracking-wider">
            {retreat.category}
          </span>
        </div>
        {retreat.isFeatured && (
          <div className="absolute top-4 right-4">
            <span className="bg-[#7C9070] text-white px-3 py-1 rounded-full text-xs font-bold">
              FEATURED
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center text-[#7C9070] text-xs font-medium">
            <MapPin className="w-3 h-3 mr-1" />
            {retreat.location.city}, {retreat.location.country}
          </div>
          <div className="flex items-center text-xs font-bold bg-[#F9F6F1] px-2 py-1 rounded-md">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
            {retreat.rating}
          </div>
        </div>

        <h3 className="text-xl font-bold mb-3 serif group-hover:text-[#7C9070] transition-colors">{retreat.title}</h3>
        
        <p className="text-sm text-[#6B7280] line-clamp-2 mb-4">
          {retreat.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#F3F4F6]">
          <div className="flex items-center text-gray-500 text-xs gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {retreat.durationDays} Days
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {retreat.dates.length} Dates
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400 block">From</span>
            <span className="text-lg font-bold text-[#2D2D2D]">${retreat.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
