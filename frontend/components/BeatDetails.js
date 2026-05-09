'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Play, Music, ExternalLink, Copy } from 'lucide-react';
import { useBeatPurchase } from '../hooks/useBeatPurchase';
import { toast } from '../utils/toast';
import CreatorCircle from './CreatorCircle';
import { useSolanaTip } from '../hooks/useSolanaTip';

/**
 * Right panel component displaying detailed beat information
 * Features beat cover, buy button, license terms, remixes, and blockchain info
 */
export default function BeatDetails({
  beat,
  userOwnsNFT,
  onPurchase,
  onRemixClick,
  remixCreators = [],
  className = '',
  showClose = false,
  onClose,
}) {
  const [activeTab, setActiveTab] = useState('License Terms');
  const { purchaseBeat, isPurchasing } = useBeatPurchase();
  const { tip, isTipping } = useSolanaTip();

  if (!beat) {
    return (
      <div className="w-80 bg-dark-surface border-l border-dark-border p-6 flex items-center justify-center">
        <p className="text-gray-500">Select a beat to view details</p>
      </div>
    );
  }

  const tabs = ['License Terms', 'Remixes', 'Creator Circle', 'Blockchain Info'];

  return (
    <div className={`w-full max-w-md bg-dark-surface border-l border-dark-border overflow-y-auto scrollbar-custom ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-dark-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {userOwnsNFT && (
              <div className="flex items-center gap-1 text-accent-green text-sm">
                <CheckCircle className="w-4 h-4" />
                <span className="font-semibold">Verified NFT Owner</span>
              </div>
            )}
          </div>
          {showClose ? (
            <button
              onClick={onClose}
              className="btn-ghost px-3 py-2"
              aria-label="Close details"
            >
              ×
            </button>
          ) : (
            <div className="w-8 h-8 rounded-full bg-dark-card flex items-center justify-center cursor-pointer hover:bg-dark-hover">
              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            </div>
          )}
        </div>
      </div>

      {/* Beat Cover & Info */}
      <div className="p-6">
        <motion.img
          src={beat.coverImage}
          alt={beat.name}
          className="w-full aspect-square object-cover rounded-xl mb-4 shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        <h2 className="text-2xl font-bold mb-1">{beat.name}</h2>
        <p className="text-gray-400 mb-4">Prod. by {beat.producer}</p>

        {/* Play Button */}
        <button className="btn-secondary w-full mb-4 flex items-center justify-center gap-2">
          <Play className="w-5 h-5" fill="white" />
          Play Preview
        </button>

        {/* Buy License Button */}
        {!userOwnsNFT ? (
          <motion.button
            className="btn-primary w-full mb-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={async () => {
              try {
                await purchaseBeat(beat.tokenId, beat.price);
                toast.success(`Successfully purchased ${beat.name}!`);
                onPurchase?.();
              } catch (error) {
                toast.error(error.message || 'Purchase failed');
              }
            }}
            disabled={isPurchasing}
          >
            {isPurchasing ? 'Processing...' : `BUY LICENSE (${beat.price} ETH)`}
          </motion.button>
        ) : (
          <motion.button
            className="w-full bg-accent-green/20 text-accent-green border border-accent-green px-6 py-3 rounded-xl font-semibold mb-6"
            disabled
          >
            You Own This Beat
          </motion.button>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-4 border-b border-dark-border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'text-white border-b-2 border-accent-green'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === 'License Terms' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 text-sm"
            >
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Non-Exclusive License</p>
                  <p className="text-gray-400">You can use this beat for commercial purposes</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Unlimited Streams</p>
                  <p className="text-gray-400">No limit on streaming or distribution</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Credit Original Artist</p>
                  <p className="text-gray-400">Must credit {beat.producer} in your work</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-dark-border">
                <p className="text-xs text-gray-500 mb-2">Contract Address</p>
                <div className="flex items-center gap-2 bg-dark-card rounded-lg p-2">
                  <code className="text-xs font-mono flex-1">0x1234...5678</code>
                  <button className="text-gray-400 hover:text-white">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-xs text-gray-500 mb-2">IPFS Hash</p>
                <div className="flex items-center gap-2 bg-dark-card rounded-lg p-2">
                  <code className="text-xs font-mono flex-1">{beat.ipfsHash}</code>
                  <button className="text-gray-400 hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Remixes' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <p className="text-sm text-gray-400">
                {userOwnsNFT
                  ? 'You can create remixes of this beat'
                  : 'Purchase this beat to create remixes'}
              </p>
              {userOwnsNFT && (
                <button 
                  className="btn-primary w-full"
                  onClick={() => onRemixClick?.(beat)}
                >
                  PUBLISH REMIX
                </button>
              )}
              <div className="space-y-2">
                <p className="text-sm font-semibold mb-2">Community Remixes (2)</p>
                {/* Remix list would go here */}
              </div>
            </motion.div>
          )}

          {activeTab === 'Creator Circle' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CreatorCircle
                contentType="beat"
                contentId={beat.tokenId}
                originalCreatorAddress={beat.producerAddress}
                remixCreators={remixCreators}
                userOwnsNFT={userOwnsNFT}
                isVerifiedArtist={false}
              />
            </motion.div>
          )}

          {activeTab === 'Blockchain Info' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 text-sm"
            >
              <div>
                <p className="text-gray-500 mb-1">Token ID</p>
                <p className="font-mono">{beat.tokenId}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Creator</p>
                <p className="font-mono text-xs">{beat.producerAddress}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Price</p>
                <p className="font-semibold text-accent-green">{beat.price} ETH</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Network</p>
                <p>Polygon Mumbai</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Community Stats */}
        <div className="mt-8 pt-6 border-t border-dark-border">
          <h3 className="text-sm font-semibold mb-4">Community Bytes</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-dark-card rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Music className="w-4 h-4 text-accent-green" />
                <span className="text-gray-400">Uploaded Beats</span>
              </div>
              <p className="text-lg font-bold">10K</p>
            </div>
            <div className="bg-dark-card rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Play className="w-4 h-4 text-accent-blue" />
                <span className="text-gray-400">Total Plays</span>
              </div>
              <p className="text-lg font-bold">2.3K</p>
            </div>
            <div className="bg-dark-card rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Music className="w-4 h-4 text-accent-purple" />
                <span className="text-gray-400">Created Beats</span>
              </div>
              <p className="text-lg font-bold">5.8K</p>
            </div>
            <div className="bg-dark-card rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-accent-green">#</span>
                <span className="text-gray-400">Trending Score</span>
              </div>
              <p className="text-lg font-bold">50K</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          {userOwnsNFT && (
            <button className="btn-primary w-full" onClick={() => onRemixClick?.(beat)}>
              PUBLISH REMIX
            </button>
          )}
          <button
            className="btn-secondary w-full"
            disabled={isTipping}
            onClick={async () => {
              try {
                const recipient = beat.producerSolana;
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
    </div>
  );
}
