
import React from 'react';
import { Group } from '../types';
import { Search, Plus, Users, Calendar, ShoppingBag } from 'lucide-react';

const MOCK_GROUPS: Group[] = [
  {
    id: 'g1',
    name: 'NYC Urban Hikers',
    description: 'Weekly treks through the concrete jungle and beyond.',
    memberCount: 2450,
    image: 'https://picsum.photos/seed/hiking-grp/400/300',
    type: 'public'
  },
  {
    id: 'g2',
    name: 'Vegan Singles Manhattan',
    description: 'Monthly dinner meetups and potlucks.',
    memberCount: 890,
    image: 'https://picsum.photos/seed/vegan-grp/400/300',
    type: 'dating'
  },
  {
    id: 'g3',
    name: 'Product Design Network',
    description: 'Professional social for NYC designers.',
    memberCount: 5600,
    image: 'https://picsum.photos/seed/design-grp/400/300',
    type: 'public'
  }
];

const CommunityPage: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Search & Tabs */}
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search groups, events..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <button className="p-2 bg-slate-900 text-white rounded-xl shadow-lg">
          <Plus size={20} />
        </button>
      </div>

      {/* Quick Nav */}
      <div className="grid grid-cols-3 gap-2">
        <button className="flex flex-col items-center p-3 bg-blue-50 rounded-2xl text-blue-600 hover:bg-blue-100 transition-colors">
          <Users size={20} className="mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-tight">Groups</span>
        </button>
        <button className="flex flex-col items-center p-3 bg-purple-50 rounded-2xl text-purple-600 hover:bg-purple-100 transition-colors">
          <Calendar size={20} className="mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-tight">Events</span>
        </button>
        <button className="flex flex-col items-center p-3 bg-orange-50 rounded-2xl text-orange-600 hover:bg-orange-100 transition-colors">
          <ShoppingBag size={20} className="mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-tight">Market</span>
        </button>
      </div>

      {/* Featured Groups */}
      <div className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <h3 className="text-lg font-black text-slate-800">Your Communities</h3>
          <button className="text-xs font-bold text-blue-600 hover:underline">See All</button>
        </div>
        
        <div className="space-y-3">
          {MOCK_GROUPS.map(group => (
            <div key={group.id} className="flex space-x-4 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                <img src={group.image} alt={group.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{group.name}</h4>
                  {group.type === 'dating' && (
                    <span className="px-1.5 py-0.5 bg-pink-100 text-pink-600 text-[8px] font-black rounded uppercase">Dating</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-tight">{group.description}</p>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">{group.memberCount.toLocaleString()} members</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <h3 className="text-lg font-black text-slate-800">Nearby Events</h3>
          <button className="text-xs font-bold text-blue-600 hover:underline">Explore</button>
        </div>
        
        <div className="relative rounded-3xl overflow-hidden aspect-video group cursor-pointer shadow-lg">
          <img src="https://picsum.photos/seed/event1/800/400" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Event" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
            <span className="inline-block px-2 py-1 bg-yellow-400 text-black text-[10px] font-bold rounded mb-2 w-fit">TOMORROW 8:00 PM</span>
            <h4 className="text-xl font-bold text-white">Rooftop Jazz & Singles Mixer</h4>
            <p className="text-white/70 text-sm">West Village Loft, NY</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
