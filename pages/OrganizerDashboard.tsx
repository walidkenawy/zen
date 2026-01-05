
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Plus, Users, DollarSign, Calendar, Eye, Star, ChevronRight, LayoutDashboard, Settings } from 'lucide-react';
import { MOCK_RETREATS } from '../constants';

const data = [
  { name: 'May', bookings: 4, revenue: 3200 },
  { name: 'Jun', bookings: 7, revenue: 5400 },
  { name: 'Jul', bookings: 5, revenue: 4100 },
  { name: 'Aug', bookings: 12, revenue: 9800 },
  { name: 'Sep', bookings: 8, revenue: 6500 },
];

export const OrganizerDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-bold serif">Organizer Dashboard</h1>
          <p className="text-gray-500">Welcome back, Zen Master. Here's what's happening today.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all">
            <Calendar className="w-5 h-5" /> Schedule
          </button>
          <button className="flex items-center gap-2 bg-[#7C9070] text-white px-8 py-3 rounded-2xl font-bold hover:shadow-xl transition-all">
            <Plus className="w-5 h-5" /> New Retreat
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-8 rounded-3xl border border-[#F0ECE4] shadow-sm">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 mb-4">
            <Users className="w-6 h-6" />
          </div>
          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Bookings</span>
          <h3 className="text-3xl font-bold serif mt-1">1,204</h3>
          <p className="text-xs text-green-500 font-bold mt-2">+12% vs last month</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-[#F0ECE4] shadow-sm">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500 mb-4">
            <DollarSign className="w-6 h-6" />
          </div>
          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Net Revenue</span>
          <h3 className="text-3xl font-bold serif mt-1">$45,210</h3>
          <p className="text-xs text-green-500 font-bold mt-2">+8% vs last month</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-[#F0ECE4] shadow-sm">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500 mb-4">
            <Eye className="w-6 h-6" />
          </div>
          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Profile Views</span>
          <h3 className="text-3xl font-bold serif mt-1">8.4k</h3>
          <p className="text-xs text-gray-500 font-bold mt-2">Stable performance</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-[#F0ECE4] shadow-sm">
          <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-500 mb-4">
            <Star className="w-6 h-6" />
          </div>
          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Avg Rating</span>
          <h3 className="text-3xl font-bold serif mt-1">4.92</h3>
          <p className="text-xs text-green-500 font-bold mt-2">Excellent (Top 1%)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Charts */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-[#F0ECE4] shadow-sm">
          <h3 className="text-xl font-bold mb-8 serif">Revenue Growth</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} 
                />
                <Line type="monotone" dataKey="revenue" stroke="#7C9070" strokeWidth={4} dot={{r: 6, fill: '#7C9070', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-3xl border border-[#F0ECE4] shadow-sm">
          <h3 className="text-xl font-bold mb-6 serif">Recent Bookings</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                  <div>
                    <span className="block text-sm font-bold">Emma Smith</span>
                    <span className="text-xs text-gray-400">Zen Retreat Japan • 2h ago</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-sm font-bold">$1,250</span>
                  <span className="text-[10px] text-green-500 uppercase font-bold tracking-widest">Paid</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 text-sm font-bold text-[#7C9070] hover:underline">View all bookings</button>
        </div>
      </div>

      {/* Listings Management */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold serif">Your Retreat Listings</h2>
          <button className="text-sm font-bold text-[#7C9070] hover:underline">Manage All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_RETREATS.slice(0, 2).map(retreat => (
            <div key={retreat.id} className="bg-white border border-[#F0ECE4] rounded-3xl p-6 flex items-center gap-6 group hover:shadow-xl transition-all">
              <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={retreat.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-[#7C9070] text-white rounded-full uppercase tracking-widest">Active</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{retreat.category}</span>
                </div>
                <h4 className="text-lg font-bold mb-1 truncate">{retreat.title}</h4>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {retreat.capacity} spots</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {retreat.rating}</span>
                </div>
                <div className="flex gap-3 mt-4">
                  <button className="text-xs font-bold text-[#7C9070] border border-[#7C9070] px-3 py-1.5 rounded-lg hover:bg-[#7C9070] hover:text-white transition-all">Edit</button>
                  <button className="text-xs font-bold text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all">Preview</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
