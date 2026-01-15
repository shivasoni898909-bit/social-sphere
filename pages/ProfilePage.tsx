
import React, { useState } from 'react';
import { Settings, Shield, Bell, CreditCard, HelpCircle, LogOut, ChevronRight, LayoutGrid, Heart, Globe } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Dating' | 'Social'>('Social');

  return (
    <div className="flex flex-col min-h-full">
      {/* Profile Header */}
      <div className="relative h-48 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
        <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
          <Settings size={20} />
        </button>
      </div>

      <div className="px-6 -mt-16 pb-6 relative">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-[40px] border-4 border-white overflow-hidden shadow-2xl bg-white mb-4">
            <img src="https://picsum.photos/seed/me/300/300" className="w-full h-full object-cover" alt="Me" />
          </div>
          <h2 className="text-2xl font-black text-slate-800">Alex Jensen, 28</h2>
          <p className="text-slate-500 text-sm font-medium">Senior Product Designer • New York</p>
          
          <div className="flex space-x-2 mt-6 w-full">
            <button 
              onClick={() => setActiveTab('Social')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-2xl transition-all font-bold text-sm ${
                activeTab === 'Social' ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-100 text-slate-500'
              }`}
            >
              <Globe size={16} />
              <span>Social</span>
            </button>
            <button 
              onClick={() => setActiveTab('Dating')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-2xl transition-all font-bold text-sm ${
                activeTab === 'Dating' ? 'bg-pink-500 text-white shadow-xl' : 'bg-slate-100 text-slate-500'
              }`}
            >
              <Heart size={16} />
              <span>Dating</span>
            </button>
          </div>
        </div>

        {/* Dynamic Content Based on Tab */}
        <div className="mt-8 space-y-6">
          {activeTab === 'Social' ? (
            <div className="grid grid-cols-3 gap-1 rounded-2xl overflow-hidden shadow-sm">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                <div key={i} className="aspect-square bg-slate-100 relative group cursor-pointer">
                  <img src={`https://picsum.photos/seed/post${i}/400/400`} className="w-full h-full object-cover group-hover:opacity-75 transition-opacity" alt="Post" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <LayoutGrid size={20} className="text-white" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-5 bg-white border border-pink-100 rounded-[32px] shadow-sm">
                <h4 className="font-black text-pink-600 text-xs uppercase tracking-widest mb-3">Relationship Goals</h4>
                <p className="text-slate-700 text-sm font-medium leading-relaxed">Looking for something serious that starts with a good friendship. I value honesty, ambition, and a shared love for jazz.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Height</p>
                  <p className="text-sm font-bold text-slate-800">5'11"</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Exercise</p>
                  <p className="text-sm font-bold text-slate-800">Active</p>
                </div>
              </div>
            </div>
          )}

          {/* Settings Section */}
          <div className="pt-4 space-y-2">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1 mb-3">Account</h3>
            {[
              { icon: Bell, label: 'Notifications', color: 'bg-blue-50 text-blue-600' },
              { icon: Shield, label: 'Privacy & Safety', color: 'bg-green-50 text-green-600' },
              { icon: CreditCard, label: 'Subscriptions', color: 'bg-purple-50 text-purple-600' },
              { icon: HelpCircle, label: 'Support Center', color: 'bg-orange-50 text-orange-600' },
              { icon: LogOut, label: 'Logout', color: 'bg-red-50 text-red-600' },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 rounded-2xl transition-colors border border-slate-50">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${item.color}`}>
                    <item.icon size={18} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
