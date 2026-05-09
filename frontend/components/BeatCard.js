'use client';

import { motion } from 'framer-motion';
import { Play, Music, TrendingUp } from 'lucide-react';

/**
 * Beat card component for displaying beats in horizontal scrollable lists
 * Features cover art, beat info, price, and NFT badge
 */
export default function BeatCard({
  beat,
  onSelect,
  onPlay,
  variant = 'default',
  showTrade = false,
  onInvest,
}) {
  const handleClick = () => {
    onSelect?.(beat);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    onPlay?.(beat);
  };

  const handleInvestClick = (e) => {
    e.stopPropagation();
    onInvest?.(beat);
  };

  return (
    <motion.div
      className="beat-card min-w-[160px] max-w-[160px] sm:min-w-[180px] sm:max-w-[180px] md:min-w-[220px] md:max-w-[220px]"
      onClick={handleClick}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Cover Image */}
      <div className="relative mb-3 group">
        <img
          src={beat.coverImage}
          alt={beat.name}
          className="w-full aspect-square object-cover rounded-lg"
        />
        
        {/* NFT Badge */}
        <div className="absolute top-2 right-2 bg-accent-green text-white text-xs font-bold px-2 py-1 rounded-full">
          NFT
        </div>

        {/* Play Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"
          onClick={handlePlayClick}
        >
          <motion.div
            className="w-12 h-12 bg-accent-green rounded-full flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Play className="w-6 h-6 text-white ml-1" fill="white" />
          </motion.div>
        </motion.div>
      </div>

      {/* Beat Info */}
      <div>
        <h3 className="font-semibold text-sm mb-1 line-clamp-1">{beat.name}</h3>
        <p className="text-xs text-gray-400 mb-2">Prod. by {beat.producer}</p>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-accent-green font-bold">{beat.price} ETH</span>
          {variant === 'remix' && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Music className="w-3 h-3" />
              <span>{beat.likes > 1000 ? `${(beat.likes / 1000).toFixed(1)}K` : beat.likes}</span>
            </div>
          )}
        </div>

        {showTrade && (
          <button
            onClick={handleInvestClick}
            className="mt-3 w-full rounded-lg bg-white/5 hover:bg-white/10 border border-dark-border px-3 py-2 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5 text-accent-green" />
            Invest / Trade
          </button>
        )}
      </div>
    </motion.div>
  );
}
