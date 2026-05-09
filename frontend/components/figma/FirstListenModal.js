'use client';

import { X, DollarSign, Shield } from 'lucide-react';

export default function FirstListenModal({ open, onClose, song, onUnlock, isLoading }) {
  if (!open) return null;
  const price = song?.price || '0.01 SOL';

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center p-4">
        <div className="w-full md:max-w-lg rounded-3xl backdrop-blur-xl bg-white/80 border border-purple-200/50 shadow-2xl">
          <div className="p-5 border-b border-purple-200/40 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">First Listen</p>
              <p className="text-xs text-gray-500">Pay once to unlock streaming</p>
            </div>
            <button
              className="w-10 h-10 rounded-2xl hover:bg-purple-50 flex items-center justify-center"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-5">
            <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 p-5 text-white">
              <p className="text-xs text-white/80">Now playing</p>
              <p className="text-xl font-bold mt-1">{song?.title || song?.name || 'Untitled'}</p>
              <p className="text-sm text-white/80 mt-1">{song?.artist || song?.producer || 'Unknown artist'}</p>
              <div className="flex items-center gap-2 mt-4">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/15">
                  <Shield className="w-3.5 h-3.5" />
                  <span className="text-xs">Verified</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/15">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span className="text-xs">{price}</span>
                </span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button 
                className="flex-1 rounded-2xl bg-purple-700 hover:bg-purple-800 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3 transition-colors"
                onClick={onUnlock}
                disabled={isLoading}
              >
                {isLoading ? 'Unlocking...' : 'Unlock stream'}
              </button>
              <button
                className="rounded-2xl border border-purple-200 hover:bg-purple-50 px-5 py-3 font-semibold text-gray-700"
                onClick={onClose}
              >
                Not now
              </button>
            </div>
            <p className="text-[11px] text-gray-500 mt-3">
              Demo UI: unlocking is handled by the in-player x402 flow on Solana devnet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

