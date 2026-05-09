// Mock data for BeatFlow marketplace
export const mockBeats = [
  {
    id: 1,
    name: 'Cosmic Trap',
    producer: 'AstroBeats',
    price: '0.5',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    audioUrl: '/audio/sample1.mp3',
    genre: 'Trap',
    bpm: 140,
    likes: 1250,
    plays: 5230,
    isNFT: true,
    tokenId: 1,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'Future Flump',
    producer: 'Fitow',
    price: '0.5',
    coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
    audioUrl: '/audio/sample2.mp3',
    genre: 'Future Bass',
    bpm: 128,
    likes: 980,
    plays: 4100,
    isNFT: true,
    tokenId: 2,
    createdAt: '2024-01-14',
  },
  {
    id: 3,
    name: 'Future Funk',
    producer: 'AstroBeats',
    price: '0.5',
    coverImage: 'https://images.unsplash.com/photo-1516280440619-27c93527e0a8?w=400&h=400&fit=crop',
    audioUrl: '/audio/sample3.mp3',
    genre: 'Funk',
    bpm: 115,
    likes: 2100,
    plays: 8900,
    isNFT: true,
    tokenId: 3,
    createdAt: '2024-01-13',
  },
  {
    id: 4,
    name: 'Midnight Drive',
    producer: 'MC Lyrical',
    price: '0.5',
    coverImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
    audioUrl: '/audio/sample4.mp3',
    genre: 'Hip-Hop',
    bpm: 90,
    likes: 750,
    plays: 3200,
    isNFT: true,
    tokenId: 4,
    createdAt: '2024-01-12',
  },
  {
    id: 5,
    name: 'Steady Flow',
    producer: 'AstroBeats',
    price: '0.3',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    audioUrl: '/audio/sample5.mp3',
    genre: 'Trap',
    bpm: 145,
    likes: 560,
    plays: 2100,
    isNFT: true,
    tokenId: 5,
    createdAt: '2024-01-11',
  },
  {
    id: 6,
    name: 'Distinct Drive',
    producer: 'Fitow',
    price: '0.5',
    coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
    audioUrl: '/audio/sample6.mp3',
    genre: 'Electronic',
    bpm: 130,
    likes: 890,
    plays: 3800,
    isNFT: true,
    tokenId: 6,
    createdAt: '2024-01-10',
  },
  {
    id: 7,
    name: 'Galaxy Rap',
    producer: 'MC Lyrical',
    price: '0.4',
    coverImage: 'https://images.unsplash.com/photo-1516280440619-27c93527e0a8?w=400&h=400&fit=crop',
    audioUrl: '/audio/sample7.mp3',
    genre: 'Hip-Hop',
    bpm: 95,
    likes: 1200,
    plays: 5100,
    isNFT: true,
    tokenId: 7,
    createdAt: '2024-01-09',
  },
];

export const mockRemixes = [
  {
    id: 1,
    name: 'Steady Flow Remix',
    originalBeatId: 5,
    remixer: 'MC Lyrical',
    coverImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
    audioUrl: '/audio/remix1.mp3',
    likes: 5510,
    plays: 12300,
    isNFT: true,
    createdAt: '2024-01-16',
  },
  {
    id: 2,
    name: 'Galaxy Rap Remix',
    originalBeatId: 7,
    remixer: 'AstroBeats',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    audioUrl: '/audio/remix2.mp3',
    likes: 5500,
    plays: 11800,
    isNFT: true,
    createdAt: '2024-01-15',
  },
];

export const mockArtists = [
  {
    id: 1,
    name: 'AstroBeats',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    followers: 12500,
    beats: 24,
    isVerified: true,
  },
  {
    id: 2,
    name: 'Fitow',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    followers: 8900,
    beats: 18,
    isVerified: true,
  },
  {
    id: 3,
    name: 'MC Lyrical',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    followers: 15200,
    beats: 31,
    isVerified: true,
  },
];

// Get trending beats (top 4 by plays)
export const getTrendingBeats = () => {
  return [...mockBeats].sort((a, b) => b.plays - a.plays).slice(0, 4);
};

// Get new releases (most recent)
export const getNewReleases = () => {
  return [...mockBeats].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
};

// Get community remixes
export const getCommunityRemixes = () => {
  return mockRemixes;
};

