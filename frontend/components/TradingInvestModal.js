'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TrendingUp, Wallet } from 'lucide-react';
import { toast } from '../utils/toast';

/**
 * TradingInvestModal
 * UI-only trading flow for MVP: users can "invest" in a beat with mock PnL.
 */
export default function TradingInvestModal({ open, beat, onClose, onInvest }) {
  const [amount, setAmount] = useState('0.1');

  const projected = useMemo(() => {
    const val = Number(amount || 0);
    const growth = 1.18; // mock trend multiplier
    return (val * growth).toFixed(3);
  }, [amount]);

  const handleInvest = () => {
    const parsed = Number(amount);
    if (!parsed || parsed <= 0) {
      toast.error('Enter a valid investment amount');
      return;
    }
    onInvest?.({
      beatId: beat?.id,
      beatName: beat?.name,
      amount: parsed,
      projectedReturn: Number(projected),
      timestamp: new Date().toISOString(),
    });
    toast.success(`Invested ${parsed} ETH into ${beat?.name}`);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {open && beat && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70" onClick={onClose} />
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              className="w-full max-w-md max-h-[90vh] overflow-y-auto glass rounded-2xl p-6 border border-dark-border"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
            >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent-green/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent-green" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Invest in {beat.name}</h3>
                <p className="text-xs text-gray-400">Mock trading engine (MVP)</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-dark-card border border-dark-border p-3 flex items-center justify-between">
                <span className="text-sm text-gray-400">Current popularity price</span>
                <span className="font-semibold text-white">{beat.price} ETH</span>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Investment amount (ETH)</label>
                <div className="relative">
                  <Wallet className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    className="input w-full pl-9"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div className="rounded-xl bg-dark-card border border-dark-border p-3 flex items-center justify-between">
                <span className="text-sm text-gray-400">Projected value (+18%)</span>
                <span className="font-semibold text-accent-green">{projected} ETH</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={onClose} className="btn-secondary w-full">
                Cancel
              </button>
              <button onClick={handleInvest} className="btn-primary w-full">
                Invest Now
              </button>
            </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

