
import React from 'react';
import { Search, Camera, Edit } from 'lucide-react';

const MOCK_CHATS = [
  { id: 'c1', name: 'Elena', lastMessage: 'That coffee place sounds great! ☕', time: '12:34 PM', unread: 2, image: 'https://picsum.photos/seed/elena/100/100', online: true },
  { id: 'c2', name: 'Marcus', lastMessage: 'Check out this new recipe...', time: 'Yesterday', unread: 0, image: 'https://picsum.photos/seed/marcus/100/100', online: false },
  { id: 'c3', name: 'NYC Urban Hikers', lastMessage: 'Chris: Meet at 9 AM at the base.', time: 'Monday', unread: 0, image: 'https://picsum.photos/seed/hiking-grp/100/100', isGroup: true },
];

const MessagesPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Search Header */}
      <div className="px-4 py-4 space-y-4 sticky top-0 bg-white z-10 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-slate-800">Messages</h2>
          <div className="flex space-x-3">
            <button className="p-2 bg-slate-100 rounded-full text-slate-600"><Camera size={20} /></button>
            <button className="p-2 bg-slate-100 rounded-full text-slate-600"><Edit size={20} /></button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search messages..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>
      </div>

      {/* Matches / Active Status */}
      <div className="px-4 py-4 overflow-x-auto flex space-x-6 hide-scrollbar">
        {MOCK_CHATS.filter(c => !c.isGroup).map(chat => (
          <div key={chat.id} className="flex flex-col items-center shrink-0">
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-pink-500 p-0.5">
                <img src={chat.image} alt={chat.name} className="w-full h-full rounded-full object-cover" />
              </div>
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
            <span className="text-[10px] font-bold text-slate-600 mt-1">{chat.name}</span>
          </div>
        ))}
      </div>

      {/* Chat List */}
      <div className="divide-y divide-slate-50">
        {MOCK_CHATS.map(chat => (
          <div key={chat.id} className="flex items-center space-x-4 px-4 py-4 hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100">
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img src={chat.image} alt={chat.name} className="w-full h-full object-cover" />
              </div>
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-bold text-slate-800 text-sm truncate">{chat.name}</h4>
                <span className="text-[10px] text-slate-400 font-medium">{chat.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className={`text-xs truncate mr-4 ${chat.unread > 0 ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                  {chat.lastMessage}
                </p>
                {chat.unread > 0 && (
                  <span className="px-1.5 py-0.5 bg-pink-500 text-white text-[10px] font-bold rounded-full min-w-[18px] text-center">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;
