'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import BeatMarketplace from '../../components/BeatMarketplace';
import BeatDetails from '../../components/BeatDetails';
import MusicPlayer from '../../components/MusicPlayer';
import Toast from '../../components/Toast';
import TradingInvestModal from '../../components/TradingInvestModal';
import { useBeats } from '../../hooks/useBeats';
import { useWeb3 } from '../../hooks/useWeb3';
import { mockBeats, mockRemixes } from '../../data/mockData';
import { toast } from '../../utils/toast';

export default function MarketplacePage() {
  const router = useRouter();
  const { account } = useWeb3();
  const { beats: blockchainBeats, loading: beatsLoading, refetch: refetchBeats } = useBeats();
  const [selectedBeat, setSelectedBeat] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [tradeBeat, setTradeBeat] = useState(null);
  const [portfolio, setPortfolio] = useState([]);

  const beats = blockchainBeats.length > 0 ? blockchainBeats : mockBeats;
  const remixes = mockRemixes;

  useEffect(() => {
    if (beats.length > 0 && !selectedBeat) setSelectedBeat(beats[0]);
  }, [beats, selectedBeat]);

  const handleBeatSelect = (beat) => {
    setSelectedBeat(beat);
    setCurrentTrack(beat);
    setDetailsOpen(true);
  };

  const handlePlay = (beat) => {
    setCurrentTrack(beat);
    setIsPlaying(true);
  };

  const handleOpenTrade = (beat) => {
    setTradeBeat(beat);
    setTradeModalOpen(true);
  };

  const handleInvest = (trade) => {
    setPortfolio((prev) => [trade, ...prev].slice(0, 8));
    toast.info(`Portfolio updated: ${trade.amount} ETH in ${trade.beatName}`);
  };

  const handlePurchase = () => refetchBeats();

  const handleRemixClick = (beat) => router.push(`/remix?beatId=${beat.tokenId}`);

  const userOwnsNFT = selectedBeat && account
    ? selectedBeat.isOwned || selectedBeat.currentOwner?.toLowerCase() === account.toLowerCase()
    : false;

  const remixCreators = selectedBeat
    ? mockRemixes.filter((remix) => remix.originalBeatId === selectedBeat.tokenId).map((remix) => remix.remixerAddress)
    : [];

  return (
    <Layout>
      <Toast />
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-dark-border bg-dark-surface/60 backdrop-blur-xl">
            <div className="min-w-0">
              <p className="font-semibold truncate">Beat Marketplace</p>
              <p className="text-xs text-gray-500 truncate">Discover beats, verify provenance, publish remixes</p>
            </div>
          </div>

          {beatsLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-green mx-auto mb-4"></div>
                <p className="text-gray-400">Loading beats from blockchain...</p>
              </div>
            </div>
          ) : (
            <BeatMarketplace beats={beats} remixes={remixes} onBeatSelect={handleBeatSelect} onPlay={handlePlay} onInvest={handleOpenTrade} />
          )}
        </div>

        <div className="hidden xl:block">
          <BeatDetails
            beat={selectedBeat}
            userOwnsNFT={userOwnsNFT}
            onPurchase={handlePurchase}
            onRemixClick={handleRemixClick}
            remixCreators={remixCreators}
            className="w-96"
          />
        </div>

        <AnimatePresence>
          {detailsOpen && selectedBeat && (
            <motion.div className="fixed inset-0 z-40 xl:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="absolute inset-0 bg-black/60" onClick={() => setDetailsOpen(false)} />
              <motion.div
                className="absolute inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl overflow-hidden"
                initial={{ y: 600 }}
                animate={{ y: 0 }}
                exit={{ y: 600 }}
                transition={{ type: 'spring', damping: 30, stiffness: 260 }}
              >
                <BeatDetails
                  beat={selectedBeat}
                  userOwnsNFT={userOwnsNFT}
                  onPurchase={handlePurchase}
                  onRemixClick={handleRemixClick}
                  remixCreators={remixCreators}
                  showClose
                  onClose={() => setDetailsOpen(false)}
                  className="border-l-0 w-full max-w-none"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hidden lg:flex xl:hidden w-80 border-l border-dark-border bg-dark-surface/70 p-4">
          <div className="w-full rounded-2xl border border-dark-border bg-dark-card p-4">
            <h3 className="text-sm font-semibold mb-3">Your Trading Positions</h3>
            {portfolio.length === 0 ? (
              <p className="text-xs text-gray-500">No investments yet. Use “Invest / Trade” on trending beats.</p>
            ) : (
              <div className="space-y-2 max-h-[70vh] overflow-y-auto scrollbar-custom pr-1">
                {portfolio.map((item, index) => (
                  <div key={`${item.beatId}-${index}`} className="rounded-lg border border-dark-border p-3">
                    <p className="text-sm font-medium line-clamp-1">{item.beatName}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.amount} ETH → {item.projectedReturn} ETH projected</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {currentTrack && (
          <MusicPlayer track={currentTrack} isPlaying={isPlaying} onPlayPause={() => setIsPlaying(!isPlaying)} />
        )}
      </div>

      <TradingInvestModal open={tradeModalOpen} beat={tradeBeat} onClose={() => setTradeModalOpen(false)} onInvest={handleInvest} />
      {currentTrack && <div className="h-24"></div>}
    </Layout>
  );
}

