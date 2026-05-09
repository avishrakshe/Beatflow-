'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Lock } from 'lucide-react';
import { useWeb3 } from '../hooks/useWeb3';

/**
 * PostMessageBox component for posting messages in Creator Circles
 * Includes gating logic to check if user can post
 */
export default function PostMessageBox({
  canPost,
  onPost,
  isPosting = false,
  disabledMessage = 'Only creators involved in this beat can participate.',
}) {
  const { account } = useWeb3();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim() || !canPost || !account) {
      return;
    }

    await onPost(message.trim());
    setMessage(''); // Clear input after posting
  };

  if (!account) {
    return (
      <div className="glass rounded-xl p-6 border border-dark-border text-center">
        <Lock className="w-8 h-8 text-gray-500 mx-auto mb-3" />
        <p className="text-sm text-gray-400">
          Connect your wallet to participate in discussions
        </p>
      </div>
    );
  }

  if (!canPost) {
    return (
      <div className="glass rounded-xl p-6 border border-dark-border">
        <div className="flex items-center gap-3 mb-2">
          <Lock className="w-5 h-5 text-gray-500" />
          <p className="text-sm font-semibold text-gray-400">Read Only</p>
        </div>
        <p className="text-sm text-gray-500">{disabledMessage}</p>
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="glass rounded-xl p-4 border border-dark-border"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-400 mb-2">
          Post a message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your thoughts, ask questions, or discuss the beat..."
          className="input w-full h-24 resize-none"
          disabled={isPosting}
          maxLength={500}
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-500">
            {message.length}/500 characters
          </p>
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={!message.trim() || isPosting}
        className="btn-primary w-full flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Send className="w-4 h-4" />
        {isPosting ? 'Posting...' : 'Post Message'}
      </motion.button>
    </motion.form>
  );
}


