// Bottom sticky music player (UI only)
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlayCircleIcon,
  PauseCircleIcon,
  ForwardIcon,
  BackwardIcon,
  ArrowsRightLeftIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid';

export default function PlayerBar({ currentBeat }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  if (!currentBeat) return null;

  return (
    <motion.footer
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="sticky bottom-0 w-full border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Current beat info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="h-10 w-10 rounded-lg overflow-hidden bg-gradient-to-tr from-purple-600 via-sky-500 to-emerald-400 flex-shrink-0">
            {currentBeat.cover && (
              <img
                src={currentBeat.cover}
                alt={currentBeat.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">
              {currentBeat.title || 'Untitled Beat'}
            </p>
            <p className="text-xs text-slate-400 truncate">
              Original: {currentBeat.producer}
            </p>
          </div>
        </div>

        {/* Controls + progress */}
        <div className="flex-1 hidden md:flex flex-col items-center gap-1">
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-slate-100">
              <ArrowsRightLeftIcon className="h-5 w-5" />
            </button>
            <button className="text-slate-400 hover:text-slate-100">
              <BackwardIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsPlaying((v) => !v)}
              className="text-slate-100 hover:text-emerald-300"
            >
              {isPlaying ? (
                <PauseCircleIcon className="h-9 w-9" />
              ) : (
                <PlayCircleIcon className="h-9 w-9" />
              )}
            </button>
            <button className="text-slate-400 hover:text-slate-100">
              <ForwardIcon className="h-5 w-5" />
            </button>
            <button className="text-slate-400 hover:text-slate-100">
              <ArrowPathIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Progress bar (purely visual in MVP) */}
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-[10px] text-slate-400">1:23</span>
            <div className="relative flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400">3:47</span>
          </div>
        </div>

        {/* Tip artist CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end text-xs text-slate-400">
            <span>{currentBeat.plays.toLocaleString()} plays</span>
            <span>{currentBeat.likes.toLocaleString()} likes</span>
          </div>
          <button className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full bg-slate-800/90 text-slate-100 border border-slate-700/80 hover:bg-slate-700">
            Tip Artist
          </button>
        </div>
      </div>
    </motion.footer>
  );
}


