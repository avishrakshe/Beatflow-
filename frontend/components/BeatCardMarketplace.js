// Beat card used in marketplace sections (UI only, mock data)
'use client';

import { motion } from 'framer-motion';
import { MusicalNoteIcon } from '@heroicons/react/24/solid';

export default function BeatCardMarketplace({ beat, isActive, onSelect, size = 'md' }) {
  if (!beat) return null;

  const cardBase =
    'relative rounded-2xl overflow-hidden bg-slate-900/70 border border-slate-800/80 shadow-[0_18px_45px_rgba(15,23,42,0.9)] cursor-pointer group';

  const cardSize =
    size === 'lg'
      ? 'w-full'
      : 'w-48 flex-shrink-0';

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`${cardBase} ${cardSize} ${isActive ? 'ring-2 ring-emerald-400/70' : ''}`}
    >
      {/* Cover image or gradient placeholder */}
      <div className="relative h-40 bg-gradient-to-tr from-purple-600 via-sky-500 to-emerald-400">
        {beat.cover && (
          <img
            src={beat.cover}
            alt={beat.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* NFT badge */}
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500/90 text-[10px] font-semibold uppercase tracking-wide text-slate-900 shadow-lg">
          NFT
        </div>

        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/0 to-slate-900/0" />

        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-slate-100">
            <MusicalNoteIcon className="h-4 w-4 text-emerald-300" />
            <span className="font-medium truncate">{beat.genre}</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-slate-900/70 text-[10px] text-slate-200">
            {beat.bpm} BPM
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-3">
        <h3 className="text-sm font-semibold truncate mb-1">{beat.title}</h3>
        <p className="text-[11px] text-slate-400 truncate mb-3">Prod. {beat.producer}</p>

        <div className="flex items-center justify-between text-xs">
          <div className="flex flex-col">
            <span className="text-slate-400">Price</span>
            <span className="font-semibold text-emerald-300">{beat.priceEth} ETH</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-slate-400">Likes</span>
            <span className="font-semibold">{beat.likes.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


