'use client';

import { useMemo, useState } from 'react';
import Layout from '../../components/Layout';
import TradingInvestModal from '../../components/TradingInvestModal';
import Toast from '../../components/Toast';
import ExplainAgent from '../../components/ExplainAgent';
import { mockBeats, mockRemixes } from '../../data/mockData';
import { toast } from '../../utils/toast';

export default function TradingPage() {
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [tradeBeat, setTradeBeat] = useState(null);
  const [positions, setPositions] = useState([]);

  const tradingAssets = useMemo(() => {
    const beatAssets = mockBeats.map((beat) => ({
      id: `beat-${beat.id}`,
      name: beat.name,
      kind: 'Beat',
      price: Number(beat.price),
      volume: beat.plays,
      chatSentiment: beat.likes > 1000 ? 'Bullish' : beat.likes > 700 ? 'Neutral' : 'Bearish',
      chatMentions: Math.max(35, Math.floor(beat.likes / 12)),
      source: beat,
    }));

    const songAssets = mockRemixes.map((song) => ({
      id: `song-${song.id}`,
      name: song.name,
      kind: 'Song',
      price: 0.25 + (song.plays % 10) * 0.02,
      volume: song.plays,
      chatSentiment: song.likes > 5200 ? 'Bullish' : 'Neutral',
      chatMentions: Math.max(42, Math.floor(song.likes / 20)),
      source: {
        id: song.id,
        name: song.name,
        price: (0.25 + (song.plays % 10) * 0.02).toFixed(2),
      },
    }));

    return [...beatAssets, ...songAssets].sort((a, b) => b.volume - a.volume);
  }, []);

  const openTrade = (asset) => {
    setTradeBeat({
      id: asset.source.id,
      name: asset.name,
      price: asset.price.toFixed(2),
    });
    setTradeModalOpen(true);
  };

  const onInvest = (trade) => {
    setPositions((prev) => [trade, ...prev].slice(0, 10));
    toast.success(`Position opened for ${trade.beatName}`);
  };

  return (
    <Layout>
      <Toast />
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 py-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-3">
              <div className="min-w-0">
                <p className="font-semibold truncate">Trading</p>
                <p className="text-xs text-gray-500 truncate">Markets + chat sentiment + positions</p>
              </div>
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">Trading on Beats & Songs</h1>
              <p className="text-gray-400">
                Invest in music momentum with market stats and chat-based sentiment analysis.
              </p>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="card p-5">
                <p className="text-xs text-gray-500 mb-1">24h Volume</p>
                <p className="text-2xl font-bold">18.4 ETH</p>
              </div>
              <div className="card p-5">
                <p className="text-xs text-gray-500 mb-1">Top Sentiment</p>
                <p className="text-2xl font-bold text-accent-green">Bullish</p>
              </div>
              <div className="card p-5">
                <p className="text-xs text-gray-500 mb-1">Open Markets</p>
                <p className="text-2xl font-bold">{tradingAssets.length}</p>
              </div>
              <ExplainAgent page="trading" />
            </section>

            <section className="card p-0 overflow-hidden">
              <div className="px-5 py-4 border-b border-dark-border">
                <h2 className="font-semibold">Music Markets</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-gray-400 bg-dark-surface">
                    <tr>
                      <th className="text-left px-5 py-3 font-medium">Asset</th>
                      <th className="text-left px-5 py-3 font-medium">Type</th>
                      <th className="text-left px-5 py-3 font-medium">Price</th>
                      <th className="text-left px-5 py-3 font-medium">Volume</th>
                      <th className="text-left px-5 py-3 font-medium">Chat Analysis</th>
                      <th className="text-left px-5 py-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradingAssets.map((asset) => (
                      <tr key={asset.id} className="border-t border-dark-border/80">
                        <td className="px-5 py-4 font-medium">{asset.name}</td>
                        <td className="px-5 py-4 text-gray-400">{asset.kind}</td>
                        <td className="px-5 py-4">{asset.price.toFixed(2)} ETH</td>
                        <td className="px-5 py-4">{asset.volume.toLocaleString()}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs px-2 py-1 rounded-full border ${
                                asset.chatSentiment === 'Bullish'
                                  ? 'text-accent-green border-accent-green/40'
                                  : asset.chatSentiment === 'Neutral'
                                  ? 'text-yellow-400 border-yellow-400/40'
                                  : 'text-red-400 border-red-400/40'
                              }`}
                            >
                              {asset.chatSentiment}
                            </span>
                            <span className="text-xs text-gray-500">{asset.chatMentions} mentions</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <button className="btn-primary py-2 px-3 text-xs" onClick={() => openTrade(asset)}>
                            Invest
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="card p-5">
              <h2 className="font-semibold mb-3">Your Positions</h2>
              {positions.length === 0 ? (
                <p className="text-sm text-gray-500">No positions yet. Invest from the table above.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  {positions.map((p, idx) => (
                    <div key={`${p.beatId}-${idx}`} className="rounded-lg border border-dark-border p-3">
                      <p className="font-medium">{p.beatName}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {p.amount} ETH → projected {p.projectedReturn} ETH
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>

      <TradingInvestModal
        open={tradeModalOpen}
        beat={tradeBeat}
        onClose={() => setTradeModalOpen(false)}
        onInvest={onInvest}
      />
    </Layout>
  );
}

