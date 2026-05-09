'use client';

import { motion } from 'framer-motion';
import { Wallet, LogOut } from 'lucide-react';
import { useWeb3 } from '../hooks/useWeb3';

/**
 * WalletConnect Component
 * Dark-themed wallet connection button matching BeatFlow design
 * Integrates with useWeb3 hook for real wallet connection
 */
export default function WalletConnect() {
  const { account, connectWallet, disconnectWallet, isConnecting, isMetaMaskInstalled } = useWeb3();

  if (!isMetaMaskInstalled) {
    return (
      <motion.a
        href="https://metamask.io/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glass rounded-lg px-4 py-2 text-yellow-400 text-sm hover:bg-dark-hover transition-colors border-yellow-500/50"
      >
        Install MetaMask
      </motion.a>
    );
  }

  if (account) {
    return (
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center gap-2 glass rounded-lg px-4 py-2 border-accent-green/50">
          <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
          <p className="text-sm font-mono text-white">
            {account.slice(0, 6)}...{account.slice(-4)}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={disconnectWallet}
          className="glass rounded-lg px-3 py-2 hover:bg-dark-hover transition-colors"
        >
          <LogOut className="w-4 h-4 text-gray-400 hover:text-white" />
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={connectWallet}
      disabled={isConnecting}
      className="glass rounded-lg px-4 py-2 font-semibold hover:bg-dark-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 border-accent-green/30 hover:border-accent-green/50"
    >
      <Wallet className="w-4 h-4" />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </motion.button>
  );
}

