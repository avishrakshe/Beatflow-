'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import {
  Home,
  Search,
  Music,
  Library,
  User,
  Music2,
  Check,
} from 'lucide-react';
import { mockArtists } from '../data/mockData';

/**
 * Left sidebar navigation component
 * Features navigation menu and artist profile section
 */
export default function Sidebar({ className = '', onClose }) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedArtist, setSelectedArtist] = useState(mockArtists[0]);

  const navItems = [
    { icon: Home, label: 'Home', id: 'Home', path: '/' },
    { icon: Search, label: 'Marketplace', id: 'Marketplace', path: '/marketplace' },
    { icon: Music, label: 'Trading', id: 'Trading', path: '/trading' },
    { icon: Library, label: 'Library', id: 'Library', path: '/marketplace' },
    { icon: User, label: 'Artist Profile', id: 'Artist Profile', path: '/profile' },
    { icon: Music2, label: 'Community', id: 'Community', path: '/community' },
  ];

  return (
    <div className={`w-72 bg-dark-surface border-r border-dark-border flex flex-col h-screen ${className}`}>
      {/* Logo */}
      <div className="p-6 border-b border-dark-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-purple-blue flex items-center justify-center">
            <Music2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-blue-green bg-clip-text text-transparent">
            BeatFlow
          </h1>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-auto btn-ghost px-2 py-2"
              aria-label="Close sidebar"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-5 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => {
                if (item.path) {
                  router.push(item.path);
                  onClose?.();
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-dark-hover text-white'
                  : 'text-gray-400 hover:text-white hover:bg-dark-card'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <Check className="w-4 h-4 ml-auto text-accent-green" />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Artist Profile Section */}
      <div className="p-5 border-t border-dark-border space-y-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4">
          Artist Profile
        </h3>
        
        {/* Current Artist */}
        <div className="glass rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={selectedArtist.avatar}
              alt={selectedArtist.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-accent-green"
            />
            <div className="flex-1">
              <p className="font-semibold text-sm">{selectedArtist.name}</p>
              <p className="text-xs text-gray-400">{selectedArtist.followers.toLocaleString()} followers</p>
            </div>
          </div>
          <button className="btn-secondary w-full text-sm py-2">
            Follow
          </button>
        </div>

        {/* Upload Beat Button */}
        <div className="space-y-2 mb-2">
          <motion.button
            className="w-full bg-gradient-purple-blue text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              router.push('/upload-beat');
              onClose?.();
            }}
          >
            UPLOAD BEAT
          </motion.button>
        </div>

        {/* Publish Remix Button */}
        <div className="space-y-2">
          <motion.button
            className="w-full bg-gradient-blue-green text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              router.push('/remix');
              onClose?.();
            }}
          >
            PUBLISH REMIX
          </motion.button>
          <p className="text-xs text-gray-500 text-center px-2">
            Requires Beat NFT ownership
          </p>
        </div>
      </div>
    </div>
  );
}
