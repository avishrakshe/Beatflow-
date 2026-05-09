'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users } from 'lucide-react';
import { useWeb3 } from '../hooks/useWeb3';
import { getDiscussion, addMessage } from '../data/mockDiscussions';
import MessageCard from './MessageCard';
import PostMessageBox from './PostMessageBox';
import { toast } from '../utils/toast';

/**
 * CreatorCircle component - Discussion thread for beats and remixes
 * Wallet-gated community feature for creators to discuss their work
 */
export default function CreatorCircle({
  contentType, // 'beat' or 'remix'
  contentId,
  originalCreatorAddress,
  remixCreators = [], // Array of wallet addresses who created remixes
  userOwnsNFT = false,
  isVerifiedArtist = false, // Mock flag for verified artists
}) {
  const { account } = useWeb3();
  const [discussion, setDiscussion] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [canPost, setCanPost] = useState(false);

  const storageKey = `creator-circle:${contentType}-${contentId}`;

  // Load discussion on mount
  useEffect(() => {
    const discussionData = getDiscussion(contentType, contentId);
    // Assumption (MVP): persistence is local-only (no backend). We store messages in localStorage
    // keyed by contentType-contentId so refresh keeps the thread.
    if (typeof window !== 'undefined') {
      try {
        const stored = window.localStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.messages && Array.isArray(parsed.messages)) {
            setDiscussion({ ...discussionData, messages: parsed.messages });
            return;
          }
        }
      } catch (e) {
        // If storage is corrupted/unavailable, fall back to mock discussion
        console.warn('Failed to load Creator Circle from storage', e);
      }
    }
    setDiscussion(discussionData);
  }, [contentType, contentId]);

  // Determine if user can post
  useEffect(() => {
    if (!account) {
      setCanPost(false);
      return;
    }

    const userAddress = account.toLowerCase();
    const isOriginalCreator = originalCreatorAddress?.toLowerCase() === userAddress;
    const isRemixCreator = remixCreators.some(
      (addr) => addr?.toLowerCase() === userAddress
    );

    // User can post if:
    // 1. They own the beat NFT, OR
    // 2. They are the original creator, OR
    // 3. They created a remix, OR
    // 4. They are a verified artist (mock flag)
    const canUserPost = userOwnsNFT || isOriginalCreator || isRemixCreator || isVerifiedArtist;

    setCanPost(canUserPost);
  }, [account, userOwnsNFT, originalCreatorAddress, remixCreators, isVerifiedArtist]);

  // Determine user's role for posting
  const getUserRole = () => {
    if (!account) return null;

    const userAddress = account.toLowerCase();
    
    if (originalCreatorAddress?.toLowerCase() === userAddress) {
      return 'original-artist';
    }
    
    if (remixCreators.some((addr) => addr?.toLowerCase() === userAddress)) {
      return 'remix-artist';
    }
    
    if (isVerifiedArtist) {
      return 'verified-artist';
    }
    
    return 'remix-artist'; // Default for NFT owners
  };

  const handlePostMessage = async (text) => {
    if (!account || !canPost) {
      toast.error('You cannot post in this discussion');
      return;
    }

    setIsPosting(true);

    try {
      const role = getUserRole();
      
      // Add message to discussion (in production, this would be an API call)
      const updatedDiscussion = addMessage(contentType, contentId, {
        wallet: account,
        ensName: null, // Could fetch ENS name here
        role: role,
        text: text,
      });

      setDiscussion(updatedDiscussion);
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(
            storageKey,
            JSON.stringify({ messages: updatedDiscussion.messages })
          );
        } catch (e) {
          console.warn('Failed to persist Creator Circle', e);
        }
      }
      toast.success('Message posted successfully');
    } catch (error) {
      console.error('Error posting message:', error);
      toast.error('Failed to post message');
    } finally {
      setIsPosting(false);
    }
  };

  if (!discussion) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-green"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-blue-green flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Creator Circle</h3>
          <p className="text-sm text-gray-400">
            Discussion for {contentType === 'beat' ? 'this beat' : 'this remix'}
          </p>
        </div>
      </div>

      {/* Post Message Box */}
      <PostMessageBox
        canPost={canPost}
        onPost={handlePostMessage}
        isPosting={isPosting}
        disabledMessage="Only creators involved in this beat can participate."
      />

      {/* Messages List */}
      <div className="space-y-4">
        {discussion.messages.length === 0 ? (
          <div className="glass rounded-xl p-8 text-center border border-dark-border">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 mb-1">No messages yet</p>
            <p className="text-sm text-gray-500">
              {canPost
                ? 'Be the first to start the discussion!'
                : 'Only creators can start discussions.'}
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-semibold text-gray-400">
                {discussion.messages.length} {discussion.messages.length === 1 ? 'message' : 'messages'}
              </span>
            </div>
            {[...discussion.messages]
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}


