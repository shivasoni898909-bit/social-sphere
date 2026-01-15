
import React, { useState } from 'react';
import { ViewMode } from './types';
import DatingPage from './pages/DatingPage';
import SocialPage from './pages/SocialPage';
import CommunityPage from './pages/CommunityPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import { Heart, Globe, Users, MessageCircle, User as UserIcon } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewMode>(ViewMode.DATING);

  const renderContent = () => {
    switch (activeView) {
      case ViewMode.DATING: return <DatingPage />;
      case ViewMode.SOCIAL: return <SocialPage />;
      case ViewMode.COMMUNITY: return <CommunityPage />;
      case ViewMode.MESSAGES: return <MessagesPage />;
      case ViewMode.PROFILE: return <ProfilePage />;
      default: return <DatingPage />;
    }
  };

  const navItems = [
    { id: ViewMode.DATING, icon: Heart, label: 'Dating' },
    { id: ViewMode.SOCIAL, icon: Globe, label: 'Feed' },
    { id: ViewMode.COMMUNITY, icon: Users, label: 'Groups' },
    { id: ViewMode.MESSAGES, icon: MessageCircle, label: 'Chat' },
    { id: ViewMode.PROFILE, icon: UserIcon, label: 'Profile' },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-xl relative overflow-hidden">
      {/* Header */}
      <header className="px-4 py-3 flex justify-between items-center bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <h1 className="text-2xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent italic">
          SocialSphere
        </h1>
        <div className="flex space-x-2">
          <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
        </div>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 overflow-y-auto hide-scrollbar pb-20">
        {renderContent()}
      </main>

      {/* Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t flex justify-around items-center py-2 px-1 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                isActive ? 'text-pink-500 scale-110' : 'text-slate-400'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default App;
