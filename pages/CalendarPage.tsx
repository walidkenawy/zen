
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
// Added Compass to the imports from lucide-react
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Tag, ArrowRight, Star, Clock, DollarSign, Compass } from 'lucide-react';
import { MOCK_RETREATS } from '../constants';

export const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setSelectedDay(null);
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };
  const nextMonth = () => {
    setSelectedDay(null);
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const selectedDateEvents = useMemo(() => {
    if (selectedDay === null) return [];
    const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    return MOCK_RETREATS.filter(r => r.dates.includes(dateKey));
  }, [selectedDay, currentDate]);

  const renderCalendar = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const startOffset = firstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

    for (let i = 0; i < startOffset; i++) {
      days.push(<div key={`empty-${i}`} className="h-28 md:h-36 bg-gray-50/20 border border-gray-100 opacity-30"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayRetreats = MOCK_RETREATS.filter(r => r.dates.includes(dateKey));
      const isSelected = selectedDay === day;

      days.push(
        <div 
          key={day} 
          onClick={() => setSelectedDay(day)}
          className={`h-28 md:h-36 border border-gray-100 p-2 transition-all cursor-pointer relative group ${
            isSelected ? 'bg-[#7C9070]/10 ring-2 ring-[#7C9070] z-10' : 'bg-white hover:bg-[#FDFCF9]'
          }`}
        >
          <span className={`text-sm font-bold ${isSelected ? 'text-[#7C9070]' : 'text-gray-400'}`}>{day}</span>
          <div className="mt-1 space-y-1 overflow-hidden">
            {dayRetreats.slice(0, 2).map(retreat => (
              <div 
                key={retreat.id}
                className="text-[9px] p-1 rounded bg-[#7C9070]/5 text-[#7C9070] font-bold border border-[#7C9070]/10 truncate"
              >
                {retreat.title}
              </div>
            ))}
            {dayRetreats.length > 2 && (
              <div className="text-[8px] text-gray-400 font-bold pl-1">
                + {dayRetreats.length - 2} more
              </div>
            )}
          </div>
          {dayRetreats.length > 0 && (
            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-[#7C9070] rounded-full"></div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Calendar Grid */}
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold serif flex items-center gap-3">
                <CalendarIcon className="text-[#7C9070]" />
                Event Marketplace Calendar
              </h1>
              <p className="text-gray-500 mt-2">Connecting you to {MOCK_RETREATS.length} global experiences.</p>
            </div>
            
            <div className="flex items-center gap-4 bg-white border border-gray-200 p-2 rounded-2xl shadow-sm">
              <button onClick={prevMonth} className="p-2 hover:bg-[#F9F6F1] rounded-xl transition-colors"><ChevronLeft /></button>
              <span className="text-lg font-bold serif min-w-[140px] text-center">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
              <button onClick={nextMonth} className="p-2 hover:bg-[#F9F6F1] rounded-xl transition-colors"><ChevronRight /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="bg-[#F9F6F1] py-4 text-center text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </div>

        {/* Sidebar: Day Details */}
        <aside className="w-full lg:w-96 space-y-6">
          <div className="bg-white rounded-3xl border border-[#F0ECE4] p-8 shadow-xl shadow-[#7C9070]/5 sticky top-24 min-h-[500px] flex flex-col">
            {selectedDay ? (
              <div className="space-y-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <h3 className="text-2xl font-bold serif">
                    {currentDate.toLocaleString('default', { month: 'long' })} {selectedDay}
                  </h3>
                  <span className="bg-[#7C9070] text-white px-3 py-1 rounded-full text-xs font-bold">
                    {selectedDateEvents.length} Events
                  </span>
                </div>

                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-