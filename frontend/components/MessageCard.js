'use client';

import { motion } from 'framer-motion';
import { User, Clock } from 'lucide-react';

/**
 * MessageCard component for displaying individual discussion messages
 * Features wallet address, role badge, timestamp, and message content
 */
export default function MessageCard({ message }) {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      'original-artist': {
        label: 'Original Artist',
        className: 'bg-accent-green/20 text-accent-green border-accent-green/50',
      },
      'remix-artist': {
        label: 'Remix Artist',
        className: 'bg-accent-blue/20 text-accent-blue border-accent-blue/50',
      },
      'verified-artist': {
        label: 'Verified Artist',
        className: 'bg-accent-purple/20 text-accent-purple border-accent-purple/50',
      },
    };

    return badges[role] || {
      label: 'Artist',
      className: 'bg-dark-hover text-gray-400 border-dark-border',
    };
  };

  const roleBadge = getRoleBadge(message.role);

  return (
    <motion.div
      className="glass rounded-xl p-4 border border-dark-border hover:border-dark-hover transition-all duration-200"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header: Wallet, Role, Timestamp */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-purple-blue flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>

          {/* Wallet Address / ENS */}
          <div>
            <p className="font-mono text-sm font-semibold">
              {message.ensName || message.wallet}
            </p>
            <div className="flex items-center gap-2 mt-1">
              {/* Role Badge */}
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${roleBadge.className}`}
              >
                {roleBadge.label}
              </span>
            </div>
          </div>
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
          <Clock className="w-3 h-3" />
          <span>{formatTimestamp(message.timestamp)}</span>
        </div>
      </div>

      {/* Message Content */}
      <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
        {message.text}
      </div>
    </motion.div>
  );
}


