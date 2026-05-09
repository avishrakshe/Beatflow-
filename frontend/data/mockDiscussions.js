// Mock discussion data for Creator Circles
// In production, this would come from a backend/database

export const mockDiscussions = {
  // Discussion for beat with tokenId 1
  'beat-1': {
    discussionId: 'beat-1',
    contentType: 'beat',
    contentId: 1,
    messages: [
      {
        id: 'msg-1',
        wallet: '0x1234...5678',
        ensName: null,
        role: 'original-artist',
        text: 'Hey everyone! This beat was inspired by late-night studio sessions. Feel free to share your thoughts or ask questions about the production process.',
        timestamp: new Date('2024-01-15T10:30:00Z').toISOString(),
      },
      {
        id: 'msg-2',
        wallet: '0x9876...5432',
        ensName: null,
        role: 'remix-artist',
        text: 'Love the vibe! I just finished a remix of this. The bassline hits different. What BPM did you use?',
        timestamp: new Date('2024-01-15T14:20:00Z').toISOString(),
      },
      {
        id: 'msg-3',
        wallet: '0x1234...5678',
        ensName: null,
        role: 'original-artist',
        text: 'Thanks! It\'s 140 BPM. Glad you liked it! Can\'t wait to hear your remix.',
        timestamp: new Date('2024-01-15T15:45:00Z').toISOString(),
      },
      {
        id: 'msg-4',
        wallet: '0xabcd...ef01',
        ensName: null,
        role: 'remix-artist',
        text: 'The synth work on this is incredible. What plugins did you use?',
        timestamp: new Date('2024-01-16T09:15:00Z').toISOString(),
      },
    ],
  },
  // Discussion for beat with tokenId 2
  'beat-2': {
    discussionId: 'beat-2',
    contentType: 'beat',
    contentId: 2,
    messages: [
      {
        id: 'msg-5',
        wallet: '0x2345...6789',
        ensName: null,
        role: 'original-artist',
        text: 'This one took me a while to perfect. The mix was challenging but I\'m happy with how it turned out.',
        timestamp: new Date('2024-01-14T11:00:00Z').toISOString(),
      },
      {
        id: 'msg-6',
        wallet: '0x9876...5432',
        ensName: null,
        role: 'remix-artist',
        text: 'The energy is amazing! Working on a remix now.',
        timestamp: new Date('2024-01-14T16:30:00Z').toISOString(),
      },
    ],
  },
  // Discussion for remix
  'remix-1': {
    discussionId: 'remix-1',
    contentType: 'remix',
    contentId: 1,
    messages: [
      {
        id: 'msg-7',
        wallet: '0x9876...5432',
        ensName: null,
        role: 'remix-artist',
        text: 'Just dropped my remix! Added some trap elements to the original. Hope you all enjoy it.',
        timestamp: new Date('2024-01-19T12:00:00Z').toISOString(),
      },
    ],
  },
};

/**
 * Get discussion for a specific content item
 * @param {string} contentType - 'beat' or 'remix'
 * @param {number} contentId - The ID of the beat or remix
 * @returns {Object|null} Discussion object or null if not found
 */
export function getDiscussion(contentType, contentId) {
  const key = `${contentType}-${contentId}`;
  return mockDiscussions[key] || {
    discussionId: key,
    contentType,
    contentId,
    messages: [],
  };
}

/**
 * Add a new message to a discussion
 * @param {string} contentType - 'beat' or 'remix'
 * @param {number} contentId - The ID of the beat or remix
 * @param {Object} message - Message object with wallet, role, text
 * @returns {Object} Updated discussion
 */
export function addMessage(contentType, contentId, message) {
  const key = `${contentType}-${contentId}`;
  const discussion = getDiscussion(contentType, contentId);
  
  const newMessage = {
    id: `msg-${Date.now()}`,
    wallet: message.wallet,
    ensName: message.ensName || null,
    role: message.role,
    text: message.text,
    timestamp: new Date().toISOString(),
  };

  discussion.messages = [newMessage, ...discussion.messages];
  mockDiscussions[key] = discussion;

  return discussion;
}


