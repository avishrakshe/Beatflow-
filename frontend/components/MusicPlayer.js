'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Volume2,
  Heart,
} from 'lucide-react';
import { getIPFSURL } from '../utils/ipfs';
import { useSolanaTip } from '../hooks/useSolanaTip';
import { useX402Stream } from '../hooks/useX402Stream';
import { toast } from '../utils/toast';
import FirstListenModal from './figma/FirstListenModal';

/**
 * Sticky bottom music player component
 * Features playback controls, progress bar, and track info
 */
export default function MusicPlayer({ track, isPlaying, onPlayPause }) {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isLiked, setIsLiked] = useState(false);
  const [unlockedBeatIds, setUnlockedBeatIds] = useState([]);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const audioRef = useRef(null);
  const { publicKey: solanaPublicKey } = useWallet();
  const { tip, isTipping } = useSolanaTip();
  const { fetchWithPay, isPaying } = useX402Stream();

  const beatId = track?.tokenId ?? track?.id;
  const isUnlocked = beatId && unlockedBeatIds.includes(String(beatId));
  const hasSolanaWallet = Boolean(solanaPublicKey);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleUnlock = async () => {
    try {
      if (!hasSolanaWallet) {
        toast.info('Connect Solana wallet from top-right to unlock stream');
        return;
      }
      const recipient = track?.producerSolana;
      const paymentResult = await fetchWithPay({ beatId: beatId ?? 'unknown', recipient });
      if (!paymentResult?.ok) {
        throw new Error(paymentResult?.error || 'Payment verification failed');
      }
      setUnlockedBeatIds((prev) => [...prev, String(beatId)]);
      toast.success('Stream unlocked via x402 payment');
      setShowUnlockModal(false);
      onPlayPause(true); // Start playing automatically
    } catch (e) {
      toast.error(e.message || 'Unable to unlock stream');
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Number(volume) / 100;
    }
  }, [volume]);

  const handleTimeUpdate = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    if (duration) {
      setProgress((current / duration) * 100);
    }
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (audioRef.current) {
      audioRef.current.currentTime = percent * audioRef.current.duration;
    }
  };

  if (!track) return null;

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-purple-200/50 z-50 text-gray-900"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 25 }}
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={track.audioUrl ? getIPFSURL(track.audioUrl) : ''}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => onPlayPause(false)}
      />

      <div className="px-6 py-4">
        {/* Progress Bar */}
        <div
          className="h-1.5 bg-purple-100 rounded-full mb-4 cursor-pointer group"
          onClick={handleProgressClick}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          {/* Track Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <img
              src={track.coverImage}
              alt={track.name}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{track.name}</p>
              <p className="text-xs text-gray-500 truncate">
                Original Beat: {track.name} by {track.producer}
              </p>
            </div>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-lg transition-colors ${
                isLiked
                  ? 'text-purple-600'
                  : 'text-gray-400 hover:text-purple-600'
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
              />
            </button>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-2 flex-1 justify-center">
            <button className="p-2 rounded-lg hover:bg-purple-50 transition-colors text-gray-400 hover:text-purple-600">
              <Shuffle className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-purple-50 transition-colors text-gray-400 hover:text-purple-600">
              <SkipBack className="w-5 h-5" />
            </button>
            <motion.button
              onClick={() => {
                if (!isPlaying && !isUnlocked) {
                  setShowUnlockModal(true);
                } else {
                  onPlayPause(!isPlaying);
                }
              }}
              disabled={isPaying}
              className="w-12 h-12 bg-purple-600 text-white shadow-lg shadow-purple-600/30 rounded-full flex items-center justify-center hover:scale-110 hover:bg-purple-700 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" fill="currentColor" />
              ) : (
                <Play className="w-6 h-6 ml-1" fill="currentColor" />
              )}
            </motion.button>
            <button className="p-2 rounded-lg hover:bg-purple-50 transition-colors text-gray-400 hover:text-purple-600">
              <SkipForward className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-purple-50 transition-colors text-gray-400 hover:text-purple-600">
              <Repeat className="w-5 h-5" />
            </button>
          </div>

          {/* Volume & Actions */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-gray-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-24 accent-purple-600"
              />
            </div>
            <button
              className="rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 transition-colors text-sm px-4 py-2 font-semibold"
              disabled={isTipping || isPaying}
              onClick={async () => {
                try {
                  if (!hasSolanaWallet) {
                    toast.info('Connect Solana wallet from top-right to tip artists');
                    return;
                  }
                  const recipient = track?.producerSolana;
                  const sig = await tip({ recipient, solAmount: 0.01 });
                  toast.success(`Tipped 0.01 SOL • ${sig.slice(0, 8)}…`);
                } catch (e) {
                  toast.error(e.message || 'Tip failed');
                }
              }}
            >
              {isTipping ? 'Tipping...' : 'Tip Artist (0.01 SOL)'}
            </button>
          </div>
        </div>
        {!hasSolanaWallet && (
          <p className="mt-3 text-xs text-amber-500">
            EVM wallet is connected. For streaming payments and tips, connect a Solana wallet.
          </p>
        )}
        {isPaying && (
          <p className="mt-3 text-xs text-purple-600">
            Processing x402 payment on Solana devnet...
          </p>
        )}
      </div>

      <FirstListenModal 
        open={showUnlockModal} 
        onClose={() => setShowUnlockModal(false)} 
        song={track} 
        isLoading={isPaying}
        onUnlock={handleUnlock}
      />
    </motion.div>
  );
}
