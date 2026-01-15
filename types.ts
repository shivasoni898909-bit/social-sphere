
export enum ViewMode {
  DATING = 'DATING',
  SOCIAL = 'SOCIAL',
  COMMUNITY = 'COMMUNITY',
  MESSAGES = 'MESSAGES',
  PROFILE = 'PROFILE'
}

export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  profileImage: string;
  interests: string[];
  compatibilityScore?: number;
  location?: string;
  lastActive?: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  content: string;
  media: string[];
  likes: number;
  comments: number;
  timestamp: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  image: string;
  type: 'public' | 'private' | 'dating';
}

export interface CompatibilityAnalysis {
  score: number;
  breakdown: {
    values: number;
    interests: number;
    behavior: number;
    goals: number;
  };
  explanation: string;
}
