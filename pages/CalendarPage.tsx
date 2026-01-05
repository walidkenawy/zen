
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign, 
  Compass, 
  Bot, 
  X, 
  CheckCircle2, 
  Send,
  Zap,
  Info,
  Building,
  Users,
  CalendarCheck,
  Shield,
  MessageSquare,
  /* Fixed: Added Sparkles to the imports from lucide-react */
  Sparkles
} from 'lucide-react';
import { MOCK_RETREATS } from '../constants';
import { getCalendarDayInsight } from '../services/geminiService';
import { useCart } from '../context/CartContext';
import { Retreat } from '../types';
import { AIVisionWrapper } from '../components/AIVisionWrapper';

export const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());
  const [dayInsight, setDayInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [previewEvent, setPreviewEvent] = useState<Retreat | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<Retreat | null>(null);
  const [showContactForm, setShowContactForm] = useState<string | null>(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [bookingLoading, setBookingLoading] = useState<string | null>(null);

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

  useEffect(() => {
    if (selectedDay && selectedDateEvents.length > 0) {
      const fetchInsight = async () => {
        setLoadingInsight(true);
        const dateStr = `${currentDate.toLocaleString('default', { month: 'long' })} ${selectedDay}, ${currentDate.getFullYear()}`;
        const insight = await getCalendarDayInsight(dateStr, selectedDateEvents);
        setDayInsight(insight);
        setLoadingInsight(false);
      };
      fetchInsight();
    } else {
      setDayInsight(null);
    }
  }, [selectedDay, selectedDateEvents, currentDate]);

  const handleQuickBook = (retreat: Retreat) => {
    const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    setBookingLoading(retreat.id);
    
    setTimeout(() => {
      addToCart(retreat, dateKey, 1);
      setBookingLoading(null);
      navigate('/checkout');
    }, 800);
  };

  const handleQuickContact = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setShowContactForm(null);
    }, 3000);
  };

  const renderCalendar = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const startOffset = firstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

    for (let i = 0; i < startOffset; i++) {
      days.push(<div key={`empty-${i}`} className="h-32 md:h-44 bg-[#FDFCF9]/50 border border-gray-100/50"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayRetreats = MOCK_RETREATS.filter(r => r.dates.includes(dateKey));
      const isSelected = selectedDay === day;

      days.push(
        <div 
          key={day} 
          onClick={() => setSelectedDay(day)}
          className={`h-32 md:h-44 border border-gray-100 p-1.5 transition-all cursor-pointer relative group flex flex-col ${
            isSelected ? 'bg-[#7C9070]/5 ring-1 ring-inset ring-[#7C9070] z-10 shadow-sm' : 'bg-white hover:bg-[#F9F6F1]'
          }`}
        >
          <span className={`text-xs font-bold ${isSelected ? 'text-[#7C9070]' : 'text-gray-400'}`}>{day}</span>
          <div className="mt-1.5 space-y-1 overflow-hidden flex-1">
            {dayRetreats.slice(0, 3).map(retreat => (
              <div key={retreat.id} className="relative">
                <button 
                  onMouseEnter={() => setHoveredEvent(retreat)}
                  onMouseLeave={() => setHoveredEvent(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewEvent(retreat);
                  }}
                  className="w-full text-left bg-white border border-[#7C9070]/20 rounded-md p-1 shadow-sm hover:border-[#7C9070] transition-colors group/event"
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[7px] md:text-[8px] font-bold text-[#7C9070] uppercase truncate">{retreat.category}</span>
                    <span className="text-[7px] md:text-[8px] font-bold text-gray-900">${retreat.price}</span>
                  </div>
                  <div className="text-[8px] md:text-[9px] font-medium text-gray-700 truncate group-hover/event:text-[#7C9070]">
                    {retreat.title.split(' at ')[0]}
                  </div>
                </button>
                
                {/* Information-Rich Hover Popover */}
                {hoveredEvent?.id === retreat.id && (
                  <div className="absolute left-full top-0 ml-2 z-[100] w-72 bg-white border border-[#F0ECE4] rounded-2xl shadow-2xl p-0 pointer-events-none animate-in fade-in zoom-in duration-200 overflow-hidden">
                    <AIVisionWrapper 
                      prompt={retreat.title}
                      fallbackUrl={`${retreat.images[0]}&q=75&w=400&auto=format&fit=crop`}
                      aspectRatio="16:9"
                      className="h-24 w-full"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-bold text-xs text-gray-900 leading-tight flex-1 pr-2">{retreat.title}</h5>
                        <div className="flex items-center gap-0.5 text-yellow-500 font-bold text-[10px] shrink-0">
                          <Star className="w-3 h-3 fill-current" />
                          {retreat.rating}
                        </div>
                      </div>
                      
                      <p className="text-[10px] text-gray-500 line-clamp-2 mb-3 leading-relaxed italic border-l-2 border-[#7C9070]/30 pl-2">
                        {retreat.description}
                      </p>

                      <div className="space-y-2 border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-2 text-[9px]">
                          <Building className="w-3 h-3 text-[#7C9070]" />
                          <span className="font-bold text-gray-600 truncate">Center: {retreat.title.split(' at ')[1]}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[9px]">
                          <CalendarCheck className="w-3 h-3 text-[#7C9070]" />
                          <span className="font-bold text-gray-600">Starts on {new Date(retreat.dates[0]).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[9px]">
                          <Users className="w-3 h-3 text-[#7C9070]" />
                          <span className="font-bold text-gray-600">{retreat.capacity} Total Spots</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {dayRetreats.length > 3 && (
              <div className="text-[7px] md:text-[8px] text-[#7C9070] font-bold pl-1 mt-1 bg-[#7C9070]/10 rounded-sm px-1.5 py-0.5 inline-block">
                + {dayRetreats.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-[#FDFCF9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold serif text-[#2D312E] tracking-tight">Marketplace Event Calendar</h1>
            <p className="text-gray-500 mt-2 text-lg font-light">Explore 450+ verified retreats. Hover for quick details or click to view the full journey plan.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white border border-[#F0ECE4] p-2 rounded-2xl shadow-sm">
            <button onClick={prevMonth} className="p-2 hover:bg-[#F9F6F1] rounded-xl transition-all"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
            <div className="px-4 text-center">
              <span className="text-lg font-bold serif text-[#2D312E]">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            <button onClick={nextMonth} className="p-2 hover:bg-[#F9F6F1] rounded-xl transition-all"><ChevronRight className="w-5 h-5 text-gray-400" /></button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Grid Section */}
          <div className="flex-1 bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-[#F0ECE4] overflow-hidden">
            <div className="grid grid-cols-7 border-b border-gray-100 bg-[#F9F6F1]/50">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-px bg-gray-100">
              {renderCalendar()}
            </div>
          </div>

          {/* Sidebar / Detailed Results */}
          <aside className="w-full lg:w-[460px] flex flex-col gap-6">
            <div className="bg-white rounded-[2.5rem] border border-[#F0ECE4] p-8 shadow-2xl shadow-gray-200/40 sticky top-24 min-h-[700px] flex flex-col">
              {selectedDay ? (
                <div className="space-y-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                    <div>
                      <h3 className="text-3xl font-bold serif text-[#2D312E]">
                        {currentDate.toLocaleString('default', { month: 'long' })} {selectedDay}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <CalendarIcon className="w-3 h-3 text-[#7C9070]" />
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Starts on this date</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block text-2xl font-bold text-[#7C9070]">{selectedDateEvents.length}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Experiences</span>
                    </div>
                  </div>

                  {selectedDateEvents.length > 0 && (
                    <div className="bg-[#7C9070]/5 rounded-2xl p-4 border border-[#7C9070]/10 flex gap-3 items-start animate-in fade-in slide-in-from-top-2">
                      <Bot className="w-5 h-5 text-[#7C9070] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[9px] font-bold text-[#7C9070] uppercase tracking-widest block mb-1">Deep Brain AI Selection</span>
                        <p className="text-xs text-gray-600 leading-relaxed italic">
                          {loadingInsight ? "Comparing all active paths..." : dayInsight}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedDateEvents.length > 0 ? (
                    <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2 hide-scrollbar">
                      {selectedDateEvents.map(retreat => (
                        <div key={retreat.id} className="group bg-white border border-[#F0ECE4] rounded-2xl p-5 hover:border-[#7C9070] hover:shadow-lg transition-all">
                          <div className="flex gap-4 mb-4">
                            <AIVisionWrapper 
                              prompt={retreat.title}
                              fallbackUrl={`${retreat.images[0]}&q=70&w=200&auto=format&fit=crop`}
                              aspectRatio="1:1"
                              className="w-20 h-20 rounded-xl shrink-0 border border-gray-100"
                            />
                            <div className="min-w-0">
                               <div className="flex items-center gap-2 mb-1">
                                 <span className="text-[8px] font-bold bg-[#7C9070] text-white px-2 py-0.5 rounded uppercase">{retreat.category}</span>
                                 <div className="flex items-center gap-0.5 text-yellow-500 font-bold text-[10px]">
                                   <Star className="w-3 h-3 fill-current" />
                                   {retreat.rating}
                                 </div>
                               </div>
                               <h4 className="font-bold text-sm text-[#2D312E] leading-tight mb-1 truncate">{retreat.title.split(' at ')[0]}</h4>
                               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider truncate flex items-center gap-1">
                                 <Building className="w-2.5 h-2.5" /> {retreat.title.split(' at ')[1] || 'Healing Sanctuary'}
                               </p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500 mb-4 bg-[#F9F6F1] p-3 rounded-xl border border-gray-100">
                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#7C9070]/60" /> {retreat.durationDays} Days</span>
                            <span className="flex items-center gap-1.5 font-bold text-[#2D2D2D]"><DollarSign className="w-3.5 h-3.5 text-[#7C9070]/60" /> From ${retreat.price}</span>
                          </div>

                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleQuickBook(retreat)}
                              disabled={bookingLoading === retreat.id}
                              className="flex-[2] bg-[#7C9070] text-white text-[10px] font-bold py-3 rounded-xl hover:bg-[#5E6D55] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#7C9070]/10 disabled:opacity-50"
                            >
                              {bookingLoading === retreat.id ? (
                                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              ) : (
                                  <><Zap className="w-3.5 h-3.5" /> Book Now</>
                              )}
                            </button>
                            <button 
                              onClick={() => setPreviewEvent(retreat)}
                              className="flex-1 bg-white border border-[#F0ECE4] text-gray-500 text-[10px] font-bold rounded-xl hover:text-[#7C9070] hover:border-[#7C9070] transition-all flex items-center justify-center gap-1.5"
                            >
                              <Info className="w-3.5 h-3.5" /> Preview
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-24 flex-grow flex flex-col justify-center">
                      <div className="w-16 h-16 bg-[#F9F6F1] rounded-full flex items-center justify-center mx-auto mb-4">
                        <CalendarIcon className="w-8 h-8 text-gray-300" />
                      </div>
                      <h4 className="text-xl font-bold serif text-gray-400 mb-2">Sanctuary of Silence</h4>
                      <p className="text-sm text-gray-400 px-10 leading-relaxed font-light">No events start today. Explore other dates for world-class wellness gatherings.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-20 flex-grow flex flex-col justify-center items-center">
                  <div className="w-32 h-32 bg-[#FDFCF9] rounded-full flex items-center justify-center mb-10 border border-[#F0ECE4] shadow-inner">
                    <Compass className="w-14 h-14 text-[#7C9070] animate-spin-slow" />
                  </div>
                  <h3 className="text-3xl font-bold serif mb-4 text-[#2D312E]">Journey Marketplace</h3>
                  <p className="text-gray-400 text-sm px-10 leading-relaxed font-light mb-10">
                    Discover transformative events. Every event includes detailed descriptions, organizer bios, and real-time availability.
                  </p>
                  <div className="flex items-center gap-3 text-[#7C9070] font-bold text-[10px] uppercase tracking-widest px-6 py-3 bg-[#7C9070]/10 rounded-full border border-[#7C9070]/10">
                    {/* Fixed: Sparkles usage confirmed after adding import */}
                    <Sparkles className="w-4 h-4" /> 450+ Verified Centers
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Enhanced Event Detail Modal */}
      {previewEvent && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 lg:p-12">
          <div className="absolute inset-0 bg-[#2D312E]/95 backdrop-blur-xl" onClick={() => setPreviewEvent(null)}></div>
          <div className="relative bg-white w-full max-w-6xl h-full sm:h-[90vh] rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden shadow-3xl animate-in zoom-in slide-in-from-bottom-20 duration-500 flex flex-col lg:flex-row border border-white/10">
            
            {/* Visual Left Side */}
            <AIVisionWrapper 
              prompt={previewEvent.title}
              fallbackUrl={`${previewEvent.images[0]}&q=85&w=1200&auto=format&fit=crop`}
              aspectRatio="9:16"
              className="lg:w-[45%] h-64 lg:h-auto"
              overlayClassName="bg-black/20"
            />
            
            <div className="absolute inset-0 pointer-events-none lg:w-[45%]">
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
               <div className="absolute top-10 left-10 flex flex-col gap-3 pointer-events-auto">
                  <span className="bg-[#7C9070] px-5 py-2 rounded-full text-[10px] font-bold text-white uppercase tracking-[0.2em] shadow-2xl">
                    {previewEvent.category}
                  </span>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] font-bold">
                    <Shield className="w-3.5 h-3.5 text-[#7C9070]" /> Zen Certified Host
                  </div>
               </div>

               <div className="absolute bottom-12 left-12 right-12 text-white pointer-events-auto">
                  <div className="flex items-center gap-3 mb-4 font-bold text-sm text-[#7C9070]">
                    <MapPin className="w-5 h-5" /> 
                    <span className="text-white/90">{previewEvent.location.city}, {previewEvent.location.country}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold serif leading-tight mb-6">{previewEvent.title}</h2>
                  <div className="flex items-center gap-6 pt-6 border-t border-white/20">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-1">Rating</span>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-lg">{previewEvent.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-1">Reviews</span>
                      <span className="font-bold text-lg">{previewEvent.reviewsCount}</span>
                    </div>
                  </div>
               </div>
            </div>

            <button 
              onClick={() => setPreviewEvent(null)}
              className="absolute top-10 right-10 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all z-[130]"
            >
              <X className="w-7 h-7" />
            </button>
            
            {/* Contextual Right Side */}
            <div className="lg:w-[55%] p-8 md:p-14 lg:p-20 overflow-y-auto flex flex-col bg-[#FDFCF9] hide-scrollbar relative">
               <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-8 pb-10 border-b border-gray-100">
                  <div className="flex items-center gap-8">
                    <div className="text-left">
                       <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Duration</span>
                       <div className="flex items-center gap-3 bg-white border border-gray-100 px-4 py-2 rounded-2xl">
                          <Clock className="w-5 h-5 text-[#7C9070]" />
                          <span className="font-bold text-gray-900 text-lg">{previewEvent.durationDays} Days</span>
                       </div>
                    </div>
                    <div className="text-left">
                       <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Capacity</span>
                       <div className="flex items-center gap-3 bg-white border border-gray-100 px-4 py-2 rounded-2xl">
                          <Users className="w-5 h-5 text-[#7C9070]" />
                          <span className="font-bold text-gray-900 text-lg">{previewEvent.capacity} Spots</span>
                       </div>
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                     <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Journey Investment</span>
                     <span className="text-5xl font-bold text-[#7C9070] serif">${previewEvent.price}</span>
                  </div>
               </div>

               <div className="space-y-12 mb-16 flex-grow">
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                       <div className="w-10 h-10 bg-[#7C9070]/10 rounded-xl flex items-center justify-center text-[#7C9070]">
                          <Info className="w-5 h-5" />
                       </div>
                       <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">About this Sanctuary</h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed font-light text-xl italic mb-6">"Our center provides a sanctuary where time dissolves, and healing begins."</p>
                    <p className="text-gray-600 leading-relaxed font-light text-lg">
                      {previewEvent.description}
                    </p>
                  </section>

                  <section className="bg-white border border-[#F0ECE4] rounded-[2rem] p-10 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Building className="w-32 h-32" />
                    </div>
                    <div className="flex items-center gap-3 mb-8 relative z-10">
                       <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                          <Building className="w-5 h-5" />
                       </div>
                       <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Organizer Information</h4>
                    </div>
                    <div className="flex items-center gap-6 relative z-10">
                       <div className="w-20 h-20 bg-gray-100 rounded-[1.5rem] flex items-center justify-center overflow-hidden border-2 border-white shadow-lg">
                          <img 
                            src={`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=200&auto=format&fit=crop`} 
                            alt="Organizer" 
                            loading="lazy"
                            className="w-full h-full object-cover" 
                          />
                       </div>
                       <div>
                          <p className="text-xl font-bold text-gray-900 mb-1">{previewEvent.title.split(' at ')[1] || 'Global Healing Sanctuary'}</p>
                          <p className="text-sm text-[#7C9070] font-bold flex items-center gap-2">
                             <CheckCircle2 className="w-4 h-4" /> Verified Zen Partner
                          </p>
                          <div className="flex gap-4 mt-3">
                             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">8 Years Experience</span>
                             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Eco-Sustainable</span>
                          </div>
                       </div>
                    </div>
                  </section>
               </div>

               <div className="flex gap-6 sticky bottom-0 bg-[#FDFCF9] pt-8 pb-4 mt-auto border-t border-gray-100">
                  <button 
                    onClick={() => handleQuickBook(previewEvent)}
                    className="flex-[2] bg-[#7C9070] text-white font-bold py-6 rounded-3xl hover:bg-[#5E6D55] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-[#7C9070]/30 transform hover:-translate-y-1 active:scale-95"
                  >
                    <Zap className="w-6 h-6" /> Book This Journey Now
                  </button>
                  <button 
                    onClick={() => {
                      setPreviewEvent(null);
                      setShowContactForm(previewEvent.id);
                    }}
                    className="flex-1 bg-white border-2 border-gray-200 text-gray-700 font-bold py-6 rounded-3xl hover:border-[#7C9070] hover:text-[#7C9070] transition-all flex items-center justify-center gap-3 active:scale-95"
                  >
                    <MessageSquare className="w-6 h-6" /> Send Message
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#2D312E]/80 backdrop-blur-md" onClick={() => setShowContactForm(null)}></div>
          <div className="relative bg-white w-full max-lg rounded-[2.5rem] overflow-hidden shadow-3xl animate-in zoom-in duration-300">
            <div className="bg-[#2D312E] p-10 text-white flex justify-between items-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-10">
                 <MessageSquare className="w-40 h-40" />
               </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold serif">Inquire with Organizer</h3>
                <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mt-1">Direct message to retreat host</p>
              </div>
              <button onClick={() => setShowContactForm(null)} className="hover:bg-white/10 p-2 rounded-full transition-colors relative z-10">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-10 bg-white">
              {inquirySent ? (
                <div className="text-center py-14 animate-in fade-in zoom-in">
                  <div className="w-20 h-20 bg-[#7C9070]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#7C9070]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold mb-3 serif">Message Sent</h4>
                  <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">The host center has been notified. They typically respond within 12-24 hours. Check your dashboard for replies.</p>
                </div>
              ) : (
                <form onSubmit={handleQuickContact} className="space-y-6">
                  <div className="bg-[#F9F6F1] p-4 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Subject</p>
                    <p className="text-xs font-bold text-[#7C9070] truncate">Inquiry: {MOCK_RETREATS.find(r => r.id === showContactForm)?.title}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Your Message</label>
                    <textarea 
                      required
                      placeholder="I have a question about the accommodation options and dietary requirements for this date..."
                      className="w-full bg-[#F9F6F1] border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#7C9070] h-40 transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#7C9070] text-white font-bold py-5 rounded-2xl hover:bg-[#5E6D55] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#7C9070]/20">
                    <Send className="w-4 h-4" /> Send Direct Message
                  </button>
                  <p className="text-[10px] text-gray-400 text-center leading-relaxed px-10">
                    By contacting the host, you agree to our terms of service regarding marketplace communication.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
