
import React, { useState, useEffect } from 'react';
import { User, CompatibilityAnalysis } from '../types';
import { getCompatibilityAnalysis } from '../services/geminiService';
import { X, Heart, Info, Star, ShieldCheck, MapPin } from 'lucide-react';

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Elena',
    age: 27,
    bio: 'Architecture enthusiast, coffee snob, and weekend hiker. Looking for someone to explore hidden city gems with.',
    profileImage: 'https://picsum.photos/seed/elena/600/800',
    interests: ['Architecture', 'Hiking', 'Coffee', 'Photography'],
    location: 'Brooklyn, NY'
  },
  {
    id: '2',
    name: 'Marcus',
    age: 31,
    bio: 'Product Designer by day, amateur chef by night. I value deep conversations over small talk. Let’s cook something amazing!',
    profileImage: 'https://picsum.photos/seed/marcus/600/800',
    interests: ['Cooking', 'Design', 'Jazz', 'Tech'],
    location: 'Manhattan, NY'
  },
  {
    id: '3',
    name: 'Sarah',
    age: 24,
    bio: 'Full-stack dev. I love sci-fi, rainy days, and competitive board games. My cat is my best friend.',
    profileImage: 'https://picsum.photos/seed/sarah/600/800',
    interests: ['Coding', 'Gaming', 'Cats', 'Sci-Fi'],
    location: 'Queens, NY'
  }
];

const DatingPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysis, setAnalysis] = useState<CompatibilityAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const currentUser = MOCK_USERS[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    // Reset analysis when moving to next
    setShowAnalysis(false);
    setAnalysis(null);
    if (currentIndex < MOCK_USERS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop for demo
    }
  };

  const fetchAnalysis = async () => {
    if (!currentUser) return;
    setLoading(true);
    setShowAnalysis(true);
    const me: User = { id: 'me', name: 'You', age: 28, bio: 'Dev', profileImage: '', interests: ['Design', 'Jazz', 'Hiking'] };
    const result = await getCompatibilityAnalysis(me, currentUser);
    setAnalysis(result);
    setLoading(false);
  };

  if (!currentUser) return <div className="p-8 text-center text-slate-500">No more profiles!</div>;

  return (
    <div className="p-4 flex flex-col items-center">
      {/* Swipe Stack Mockup */}
      <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl group">
        <img 
          src={currentUser.profileImage} 
          alt={currentUser.name} 
          className="w-full h-full object-cover"
        />
        
        {/* Verification Badge */}
        <div className="absolute top-4 left-4 bg-blue-500/80 backdrop-blur-sm text-white p-1.5 rounded-full shadow-lg">
          <ShieldCheck size={16} />
        </div>

        {/* Overlay Info */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 text-white">
          <div className="flex items-center space-x-2">
            <h2 className="text-3xl font-bold">{currentUser.name}, {currentUser.age}</h2>
          </div>
          <div className="flex items-center text-white/80 text-sm mt-1">
            <MapPin size={14} className="mr-1" />
            {currentUser.location}
          </div>
          <p className="mt-2 text-sm text-white/90 line-clamp-2">{currentUser.bio}</p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {currentUser.interests.map(interest => (
              <span key={interest} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center w-full max-w-[280px] mt-6">
        <button 
          onClick={() => handleSwipe('left')}
          className="p-4 bg-white shadow-lg rounded-full text-red-500 hover:scale-110 active:scale-95 transition-all border border-slate-100"
        >
          <X size={28} />
        </button>
        <button 
          onClick={fetchAnalysis}
          className="p-3 bg-purple-500 shadow-lg rounded-full text-white hover:scale-110 active:scale-95 transition-all"
        >
          <Info size={20} />
        </button>
        <button 
          className="p-3 bg-yellow-400 shadow-lg rounded-full text-white hover:scale-110 active:scale-95 transition-all"
        >
          <Star size={20} />
        </button>
        <button 
          onClick={() => handleSwipe('right')}
          className="p-4 bg-white shadow-lg rounded-full text-green-500 hover:scale-110 active:scale-95 transition-all border border-slate-100"
        >
          <Heart size={28} fill="currentColor" />
        </button>
      </div>

      {/* AI Analysis Overlay */}
      {showAnalysis && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end">
          <div className="w-full bg-white rounded-t-[40px] p-8 animate-slide-up shadow-2xl overflow-y-auto max-h-[85vh]">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black text-slate-800">Compatibility</h3>
                <p className="text-slate-500">AI-Powered Insights</p>
              </div>
              <button onClick={() => setShowAnalysis(false)} className="p-2 bg-slate-100 rounded-full text-slate-400">
                <X size={20} />
              </button>
            </div>

            {loading ? (
              <div className="flex flex-col items-center py-12">
                <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Analyzing compatibility...</p>
              </div>
            ) : analysis && (
              <div className="space-y-6">
                <div className="flex items-center justify-center relative">
                  <div className="w-32 h-32 rounded-full border-8 border-pink-100 flex items-center justify-center overflow-hidden">
                    <span className="text-4xl font-black text-pink-500">{analysis.score}%</span>
                    <div 
                      className="absolute inset-0 border-8 border-pink-500 rounded-full"
                      style={{ 
                        clipPath: `polygon(50% 50%, 50% 0%, ${analysis.score > 50 ? '100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%' : '100% 0%, 100% 50%, 50% 50%'})`
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(analysis.breakdown).map(([key, val]) => (
                    <div key={key} className="p-3 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">{key}</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-pink-500" style={{ width: `${val}%` }} />
                        </div>
                        <span className="text-xs font-bold text-slate-600">{val}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-pink-50 p-4 rounded-2xl border border-pink-100">
                  <p className="text-pink-800 text-sm leading-relaxed italic">
                    "{analysis.explanation}"
                  </p>
                </div>
                
                <button 
                  onClick={() => setShowAnalysis(false)}
                  className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl active:scale-95 transition-transform"
                >
                  Got it
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default DatingPage;
