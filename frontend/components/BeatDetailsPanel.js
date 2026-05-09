// Right-hand beat details panel
// Shows cover, title, producer, license actions, and info tabs (UI only)
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckBadgeIcon,
  MusicalNoteIcon,
  LockOpenIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline';

const tabs = ['License Terms', 'Remixes', 'Blockchain Info'];

export default function BeatDetailsPanel({ beat }) {
  const [activeTab, setActiveTab] = useState('License Terms');

  if (!beat) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-slate-500">
        Select a beat to view details
      </div>
    );
  }

  const ownsNft = beat.owned; // UI-only flag from mock data

  return (
    <div className="h-full flex flex-col">
      {/* Cover + header */}
      <div className="p-5 border-b border-slate-800/70">
        <div className="relative mb-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-tr from-purple-600 via-sky-500 to-emerald-400 shadow-[0_25px_60px_rgba(15,23,42,0.9)]">
            {beat.cover && (
              <img
                src={beat.cover}
                alt={beat.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/70 border border-emerald-400/60 text-[10px] uppercase tracking-wide text-emerald-300 flex items-center gap-1">
            <CheckBadgeIcon className="h-3.5 w-3.5" />
            Verified NFT Owner
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">{beat.title}</h2>
          <p className="text-sm text-slate-400">
            Prod. <span className="text-slate-200 font-medium">{beat.producer}</span>
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col text-sm">
            <span className="text-slate-400">Price</span>
            <span className="text-emerald-300 font-semibold text-lg">
              {beat.priceEth} ETH
            </span>
          </div>

          {/* BUY LICENSE CTA (no blockchain logic yet) */}
          <button className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-emerald-500 text-slate-900 font-semibold text-sm shadow-[0_18px_45px_rgba(16,185,129,0.75)] hover:bg-emerald-400 transition-colors">
            <LockOpenIcon className="h-4 w-4 mr-2" />
            Buy License
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 pt-4 border-b border-slate-800/70 flex gap-2 text-xs font-medium">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-3 py-1.5 rounded-full transition-colors ${
              activeTab === tab
                ? 'bg-slate-800/90 text-slate-50'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 text-sm">
        <AnimatePresence mode="wait">
          {activeTab === 'License Terms' && (
            <motion.div
              key="license"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="space-y-3"
            >
              <div className="rounded-xl bg-slate-900/80 border border-slate-800/80 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
                  License Summary
                </p>
                <ul className="space-y-1.5 text-sm text-slate-200">
                  <li>• Non-exclusive license</li>
                  <li>• Unlimited streaming rights</li>
                  <li>• Unlimited monetized streams</li>
                  <li>• Must credit original producer</li>
                </ul>
              </div>

              <div className="rounded-xl bg-slate-900/80 border border-slate-800/80 p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Remix Access
                  </p>
                  <p className="text-sm text-slate-200">
                    Only NFT owners can publish remixes.
                  </p>
                </div>
                <button
                  disabled={!ownsNft}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                    ownsNft
                      ? 'bg-emerald-500/90 text-slate-900 hover:bg-emerald-400'
                      : 'bg-slate-800/80 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Publish Remix
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'Remixes' && (
            <motion.div
              key="remixes"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="space-y-3"
            >
              {beat.remixes?.length ? (
                beat.remixes.map((remix) => (
                  <div
                    key={remix.id}
                    className="rounded-xl bg-slate-900/80 border border-slate-800/80 p-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium">{remix.title}</p>
                      <p className="text-xs text-slate-400">
                        by {remix.artist} • {remix.plays.toLocaleString()} plays
                      </p>
                    </div>
                    <button className="text-xs px-3 py-1.5 rounded-full bg-slate-800/90 text-slate-100 hover:bg-slate-700">
                      Play
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No remixes yet. Be the first to publish a remix if you own the NFT.
                </p>
              )}
            </motion.div>
          )}

          {activeTab === 'Blockchain Info' && (
            <motion.div
              key="chain"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="space-y-3"
            >
              <div className="rounded-xl bg-slate-900/80 border border-slate-800/80 p-3 text-xs space-y-2">
                <p className="uppercase tracking-wide text-slate-400">
                  On-chain Metadata (mock)
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Token ID</span>
                  <span className="font-mono text-slate-200">{beat.tokenId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Contract</span>
                  <span className="font-mono text-[11px] text-slate-200">
                    {beat.contractShort}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Chain</span>
                  <span className="text-slate-200 flex items-center gap-1">
                    <CpuChipIcon className="h-3.5 w-3.5" />
                    Polygon / Mumbai (demo)
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


