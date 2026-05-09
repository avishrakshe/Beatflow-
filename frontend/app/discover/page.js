'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Play,
  Heart,
  MoreHorizontal,
  Shield,
  TrendingUp,
  Clock,
  Flame,
  Bookmark,
  Share2,
  DollarSign,
} from 'lucide-react';

import FigmaNavbar from '../../components/figma/FigmaNavbar';
import FirstListenModal from '../../components/figma/FirstListenModal';
import MusicPlayer from '../../components/MusicPlayer';
import Toast from '../../components/Toast';
import { toast } from '../../utils/toast';
import { mockBeats } from '../../data/mockData';

function abbreviate(n) {
  const num = Number(n || 0);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return String(num);
}

export default function DiscoverPage() {
  const [showFirstListen, setShowFirstListen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const trendingSongs = useMemo(
    () =>
      [...mockBeats]
        .sort((a, b) => (b.plays || 0) - (a.plays || 0))
        .slice(0, 6)
        .map((b) => ({
          id: b.tokenId ?? b.id,
          title: b.name,
          artist: b.producer,
          genre: b.genre,
          verified: true,
          plays: `${abbreviate(b.plays)} plays`,
          _beat: b,
        })),
    []
  );

  const recentUploads = useMemo(
    () =>
      [...mockBeats]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4)
        .map((b) => ({
          id: b.tokenId ?? b.id,
          title: b.name,
          artist: b.producer,
          genre: b.genre,
          verified: true,
          _beat: b,
        })),
    []
  );

  const handlePlaySong = (song) => {
    setSelectedSong(song);
    setShowFirstListen(true);
    // also stage track for the player (actual unlock happens via x402 in MusicPlayer)
    setCurrentTrack(song?._beat || song);
    setIsPlaying(false);
  };

  const handleLikeSong = (song) => toast.success(`Added "${song.title}" to your liked songs!`);
  const handleSaveSong = (song) => toast.success(`Saved "${song.title}" to your library!`);
  const handleShareSong = () => toast.info('Share link copied to clipboard!');

  return (
    <div className="min-h-screen bg-[#F8F7FF] text-gray-900">
      <FigmaNavbar />
      <Toast />

      <FirstListenModal
        open={showFirstListen}
        onClose={() => setShowFirstListen(false)}
        song={selectedSong || { title: '', artist: '', price: '0.01 SOL' }}
      />

      <div className="flex pt-16 md:pt-20">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 fixed left-0 top-20 bottom-0 backdrop-blur-xl bg-white/70 border-r border-purple-200/30 p-6 overflow-y-auto">
          <nav className="space-y-2">
            <NavItem icon={<Flame className="w-5 h-5" />} label="Trending" active />
            <NavItem icon={<Clock className="w-5 h-5" />} label="Recent" />
            <NavItem icon={<TrendingUp className="w-5 h-5" />} label="Top Charts" />
            <NavItem icon={<Heart className="w-5 h-5" />} label="Liked Songs" />
          </nav>

          <div className="mt-8 pt-8 border-t border-purple-200/30">
            <h3 className="text-sm text-gray-600 mb-4">Genres</h3>
            <div className="space-y-2">
              {['Electronic', 'Synthwave', 'Ambient', 'Chillwave', 'Techno', 'Future Bass'].map((g) => (
                <GenreTag key={g} label={g} />
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:ml-64 flex-1 p-4 md:p-8 pb-32">
          {/* Trending Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {trendingSongs.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  showPlays
                  onPlay={() => handlePlaySong(song)}
                  onLike={() => handleLikeSong(song)}
                  onSave={() => handleSaveSong(song)}
                  onShare={() => handleShareSong(song)}
                />
              ))}
            </div>
          </section>

          {/* Recent Uploads */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Recently Uploaded</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {recentUploads.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  compact
                  onPlay={() => handlePlaySong(song)}
                  onLike={() => handleLikeSong(song)}
                  onSave={() => handleSaveSong(song)}
                  onShare={() => handleShareSong(song)}
                />
              ))}
            </div>
          </section>
        </main>
      </div>

      {currentTrack && (
        <MusicPlayer track={currentTrack} isPlaying={isPlaying} onPlayPause={setIsPlaying} />
      )}

      <div className="fixed bottom-24 right-4 z-40 hidden md:block">
        <Link
          href="/marketplace"
          className="rounded-2xl bg-white/80 backdrop-blur-xl border border-purple-200/50 px-4 py-3 shadow-lg hover:shadow-xl transition-shadow text-sm font-semibold text-purple-800"
        >
          Go to Marketplace →
        </Link>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function GenreTag({ label }) {
  return (
    <button className="w-full px-4 py-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm transition-colors text-left">
      {label}
    </button>
  );
}

function SongCard({ song, showPlays = false, compact = false, onPlay, onLike, onSave, onShare }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="group relative rounded-2xl p-4 backdrop-blur-xl bg-white/60 border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div
        className={`relative ${compact ? 'aspect-square' : 'aspect-square'} rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 mb-4 overflow-hidden`}
      >
        {song._beat?.coverImage ? (
          <img src={song._beat.coverImage} alt={song.title} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl">🎵</div>
          </div>
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={onPlay}
            className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
          >
            <Play className="w-6 h-6 text-purple-700 fill-purple-700 ml-1" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-start justify-between gap-2">
          {song.verified && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-500/90 backdrop-blur-sm shadow-lg">
              <Shield className="w-3 h-3 text-white" />
              <span className="text-xs text-white">Verified</span>
            </div>
          )}
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-600/90 backdrop-blur-sm shadow-lg ml-auto">
            <DollarSign className="w-3 h-3 text-white" />
            <span className="text-xs text-white">0.01 SOL</span>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-gray-900 truncate">{song.title}</h3>
        <div className="text-sm text-gray-600 truncate block">{song.artist}</div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-lg">{song.genre}</span>
          {showPlays && <span className="text-xs text-gray-500">{song.plays}</span>}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-1">
        <button
          onClick={() => {
            setIsLiked(!isLiked);
            onLike();
          }}
          className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
        <button
          onClick={() => {
            setIsSaved(!isSaved);
            onSave();
          }}
          className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-purple-600 text-purple-600' : 'text-gray-400'}`} />
        </button>
        <button onClick={onShare} className="p-2 hover:bg-purple-50 rounded-lg transition-colors">
          <Share2 className="w-5 h-5 text-gray-400" />
        </button>
        <button className="p-2 hover:bg-purple-50 rounded-lg transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}

