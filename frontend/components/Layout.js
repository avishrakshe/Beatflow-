'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WalletConnect from './WalletConnect';
import SolanaWalletConnect from './SolanaWalletConnect';
import MobileBottomNav from './MobileBottomNav';
import SolanaMobileDeepLinks from './SolanaMobileDeepLinks';
import { useWeb3 } from '../hooks/useWeb3';

/**
 * Main layout wrapper component
 * Handles wallet connection and provides global layout structure
 */
export default function Layout({ children }) {
  const { account, provider } = useWeb3();
  const [ethBalance, setEthBalance] = useState('0.0');
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Discover', href: '/discover' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Trading', href: '/trading' },
    { label: 'Profile', href: '/profile' },
  ];

  useEffect(() => {
    const fetchBalance = async () => {
      if (account && provider) {
        try {
          const balance = await provider.getBalance(account);
          const formatted = ethers.formatEther(balance);
          setEthBalance(parseFloat(formatted).toFixed(4));
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      } else {
        setEthBalance('0.0');
      }
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [account, provider]);

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-dark-border bg-dark-bg/90 backdrop-blur-xl">
        <div className="h-16 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <p className="font-semibold tracking-tight text-sm sm:text-base">BeatFlow Mobile</p>
            <div className="hidden md:flex items-center gap-1 text-sm">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      isActive ? 'bg-dark-hover text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {account && (
              <div className="hidden md:block glass rounded-lg px-3 py-2">
                <span className="text-xs text-gray-400">Balance:</span>
                <span className="ml-2 text-sm font-semibold text-accent-green">{ethBalance} ETH</span>
              </div>
            )}
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-[11px] text-gray-500">EVM</span>
              <WalletConnect />
            </div>
            <div className="flex items-center gap-1">
              <span className="hidden sm:block text-[11px] text-gray-500">Solana</span>
              <SolanaWalletConnect />
            </div>
          </div>
        </div>
      </header>
      <div className="pt-16">
        <SolanaMobileDeepLinks />
      </div>

      {/* Main Content */}
      <div className="pb-20 md:pb-0">{children}</div>
      <MobileBottomNav />
    </div>
  );
}

