
import React from 'react';
import { Post } from '../types';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    userName: 'elena_arch',
    userImage: 'https://picsum.photos/seed/elena/100/100',
    content: 'Brutalist beauty in the heart of the city. 🏙️ #architecture #nyc',
    media: ['https://picsum.photos/seed/arch/800/800'],
    likes: 124,
    comments: 8,
    timestamp: '2h ago'
  },
  {
    id: 'p2',
    userId: 'u2',
    userName: 'marcus_cooks',
    userImage: 'https://picsum.photos/seed/marcus/100/100',
    content: 'Last night\'s experiment: Truffle mushroom risotto. Success! 🍄‍🟫🍽️',
    media: ['https://picsum.photos/seed/food/800/800'],
    likes: 342,
    comments: 24,
    timestamp: '5h ago'
  }
];

const SocialPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Stories Bar */}
      <div className="flex space-x-4 px-4 py-4 overflow-x-auto hide-scrollbar border-b bg-white">
        {['Your Story', 'Elena', 'Marcus', 'Sarah', 'Alex', 'Chris'].map((name, i) => (
          <div key={i} className="flex flex-col items-center space-y-1 shrink-0">
            <div className={`p-0.5 rounded-full ${i === 0 ? 'bg-slate-200' : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'}`}>
              <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden bg-slate-100">
                <img src={`https://picsum.photos/seed/story${i}/200/200`} alt={name} className="w-full h-full object-cover" />
              </div>
            </div>
            <span className="text-[10px] text-slate-600 font-medium truncate w-16 text-center">{name}</span>
          </div>
        ))}
      </div>

      {/* Feed */}
      <div className="divide-y divide-slate-100">
        {MOCK_POSTS.map(post => (
          <div key={post.id} className="py-4 bg-white">
            {/* Post Header */}
            <div className="flex items-center justify-between px-4 mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full overflow-hidden">
                  <img src={post.userImage} alt={post.userName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{post.userName}</p>
                  <p className="text-[10px] text-slate-400">{post.timestamp}</p>
                </div>
              </div>
              <button className="text-slate-400"><MoreHorizontal size={20} /></button>
            </div>

            {/* Content Image */}
            <div className="aspect-square bg-slate-100">
              <img src={post.media[0]} alt="Post" className="w-full h-full object-cover" />
            </div>

            {/* Actions */}
            <div className="px-4 py-3">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-4">
                  <button className="hover:text-pink-500 transition-colors"><Heart size={24} /></button>
                  <button className="hover:text-blue-500 transition-colors"><MessageCircle size={24} /></button>
                  <button className="hover:text-green-500 transition-colors"><Send size={24} /></button>
                </div>
                <button className="hover:text-yellow-500 transition-colors"><Bookmark size={24} /></button>
              </div>
              
              <p className="text-sm font-bold text-slate-800 mb-1">{post.likes.toLocaleString()} likes</p>
              <p className="text-sm text-slate-700 leading-snug">
                <span className="font-bold mr-2">{post.userName}</span>
                {post.content}
              </p>
              <button className="text-xs text-slate-400 mt-2 font-medium">View all {post.comments} comments</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialPage;
