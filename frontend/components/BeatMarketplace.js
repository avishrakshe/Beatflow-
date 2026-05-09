'use client';

import { Flame, Radio, Users, BarChart3 } from 'lucide-react';
import BeatCard from './BeatCard';
import CommunityCollabSection from './CommunityCollabSection';

/**
 * Main marketplace component
 * Redesigned with better spacing and integrated trading entry-points.
 */
export default function BeatMarketplace({
  beats,
  remixes,
  onBeatSelect,
  onPlay,
  onInvest,
}) {
  const trendingBeats = beats.filter((beat) => beat.isTrending);
  const newReleases = beats.filter((beat) => !beat.isTrending).slice(0, 4);
  const topGainers = [...trendingBeats]
    .sort((a, b) => (b.plays || 0) - (a.plays || 0))
    .slice(0, 3);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-custom px-4 sm:px-6 lg:px-10 pt-6 lg:pt-10 pb-32">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl lg:text-5xl font-bold mb-3 tracking-tight">Beat Marketplace</h1>
        <p className="text-gray-400 text-sm lg:text-base">
          Discover beats, trade trending music assets, and invest early in creators.
        </p>
      </div>

      {/* Trading Snapshot */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-accent-green" />
          <h2 className="text-lg lg:text-xl font-semibold">Market Snapshot</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {topGainers.map((beat) => (
            <button
              key={`gainer-${beat.id}`}
              onClick={() => onInvest?.(beat)}
              className="text-left rounded-xl border border-dark-border bg-dark-card p-4 hover:border-accent-green/40 hover:bg-dark-hover transition-all"
            >
              <p className="text-sm font-semibold line-clamp-1">{beat.name}</p>
              <p className="text-xs text-gray-400 mb-3">by {beat.producer}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Volume</span>
                <span className="text-sm text-accent-green font-semibold">
                  {beat.plays > 1000 ? `${(beat.plays / 1000).toFixed(1)}K` : beat.plays}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Trending Beats Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Flame className="w-6 h-6 text-accent-green" />
          <h2 className="text-2xl font-bold">Trending Beats</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {trendingBeats.map((beat) => (
            <BeatCard
              key={beat.id}
              beat={beat}
              onSelect={onBeatSelect}
              onPlay={onPlay}
              showTrade
              onInvest={onInvest}
            />
          ))}
        </div>
      </section>

      {/* New Releases Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Radio className="w-6 h-6 text-accent-blue" />
          <h2 className="text-2xl font-bold">New Releases</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {newReleases.map((beat) => (
            <BeatCard
              key={beat.id}
              beat={beat}
              onSelect={onBeatSelect}
              onPlay={onPlay}
              onInvest={onInvest}
            />
          ))}
        </div>
      </section>

      {/* Community Remixes Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-6 h-6 text-accent-purple" />
          <h2 className="text-2xl font-bold">Community Remixes</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {remixes.map((remix) => (
            <BeatCard
              key={remix.id}
              beat={{
                ...remix,
                name: remix.name,
                producer: remix.remixer,
                coverImage: remix.coverImage,
                price: '0',
              }}
              onSelect={onBeatSelect}
              onPlay={onPlay}
              variant="remix"
              onInvest={onInvest}
            />
          ))}
        </div>
      </section>

      <CommunityCollabSection />
    </div>
  );
}

