'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Music2, Search } from 'lucide-react';
import SolanaWalletConnect from '../SolanaWalletConnect';

export default function FigmaNavbar() {
  const pathname = usePathname();
  const isLanding = pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-purple-200/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow">
            <Music2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
            BeatFlow
          </span>
        </Link>

        {!isLanding && (
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type="text"
                placeholder="Search songs, artists, or genres..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/80 border border-purple-200/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300/30 transition-all placeholder:text-purple-300"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 md:gap-4">
          {!isLanding && (
            <div className="hidden lg:flex items-center gap-2">
              {[
                { href: '/discover', label: 'Discover' },
                { href: '/remix-marketplace', label: 'Marketplace' },
                { href: '/ai-studio', label: 'AI Studio' },
                { href: '/upload', label: 'Upload' },
                { href: '/transactions', label: 'Transactions' },
              ].map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="px-5 py-2.5 rounded-xl hover:bg-purple-50 transition-colors text-gray-700 hover:text-purple-700"
                >
                  {i.label}
                </Link>
              ))}
            </div>
          )}
          <div className="hidden md:block">
            <SolanaWalletConnect />
          </div>
        </div>
      </div>
    </nav>
  );
}

