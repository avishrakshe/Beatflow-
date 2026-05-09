# Creator Circles Feature Documentation

## Overview

Creator Circles is a lightweight, wallet-gated discussion system that allows artists to discuss beats and remixes. It's a thread-based community feature (not real-time chat) that appears on beat and remix detail pages.

## Features

### ✅ Implemented

1. **Discussion Thread UI**
   - List of messages sorted by newest first
   - Wallet address display (with ENS name support ready)
   - Role badges (Original Artist, Remix Artist, Verified Artist)
   - Timestamp display (relative time: "2h ago", "3d ago", etc.)
   - Message content with proper formatting

2. **Post Message Box**
   - Text area with character counter (500 char limit)
   - "Post Message" button
   - Disabled state when user cannot post
   - Wallet connection required

3. **Gating Logic (UI-Level)**
   - User can post if:
     - They own the beat NFT, OR
     - They are the original creator, OR
     - They created a remix linked to this beat, OR
     - They are a verified artist (mock flag)
   - Read-only view for non-creators with clear message

4. **UI Design**
   - Dark theme matching BeatFlow
   - Glassmorphism message cards
   - Rounded corners and subtle hover effects
   - Clean, minimal design (no emojis, no reactions)

## Components

### CreatorCircle
Main component that manages the discussion thread.

**Props:**
- `contentType`: 'beat' | 'remix'
- `contentId`: The ID of the beat or remix
- `originalCreatorAddress`: Wallet address of original creator
- `remixCreators`: Array of wallet addresses who created remixes
- `userOwnsNFT`: Boolean indicating if user owns the NFT
- `isVerifiedArtist`: Boolean for verified artist status (mock)

### MessageCard
Displays individual messages in the discussion.

**Features:**
- Avatar with gradient background
- Wallet address or ENS name
- Role badge with color coding
- Relative timestamp
- Message content

### PostMessageBox
Input component for posting new messages.

**Features:**
- Text area with character limit
- Submit button
- Gating logic display
- Wallet connection prompt

## Mock Data

Discussions are stored in `frontend/data/mockDiscussions.js`:

```javascript
{
  discussionId: 'beat-1',
  contentType: 'beat',
  contentId: 1,
  messages: [
    {
      id: 'msg-1',
      wallet: '0x1234...5678',
      ensName: null,
      role: 'original-artist',
      text: 'Message content...',
      timestamp: '2024-01-15T10:30:00Z'
    }
  ]
}
```

## Integration

### Beat Details Page

Creator Circle appears as a new tab in the Beat Details panel:

1. Select a beat from marketplace
2. Click on "Creator Circle" tab
3. View discussion or post messages (if eligible)

### Gating Logic Flow

```
User connects wallet
  ↓
Check if user can post:
  - Owns NFT? → Can post
  - Original creator? → Can post
  - Remix creator? → Can post
  - Verified artist? → Can post
  ↓
If yes → Show PostMessageBox
If no → Show read-only message
```

## Role Detection

The system automatically detects user roles:

- **Original Artist**: Wallet matches `originalCreatorAddress`
- **Remix Artist**: Wallet is in `remixCreators` array
- **Verified Artist**: `isVerifiedArtist` flag is true (mock)
- **NFT Owner**: `userOwnsNFT` is true

## Usage Example

```jsx
<CreatorCircle
  contentType="beat"
  contentId={1}
  originalCreatorAddress="0x1234...5678"
  remixCreators={["0x9876...5432"]}
  userOwnsNFT={true}
  isVerifiedArtist={false}
/>
```

## Future Enhancements (Not in MVP)

- Real-time updates via WebSockets
- Backend API integration
- ENS name resolution
- Message editing/deletion
- Moderation tools
- Notifications
- Direct messages
- Reactions/emojis

## Notes

- **No Backend Required**: All data is stored in local state/mock data
- **No Real-time**: Messages appear after page refresh (in production, would use API)
- **Wallet Identity**: Wallet address is the primary user identifier
- **Context-Based**: Discussions are attached to specific content (beats/remixes)
- **Purpose-Driven**: Focused on creator-to-creator discussions about their work

## Testing

To test the feature:

1. Connect wallet
2. Select a beat that has mock discussion data (beat tokenId 1 or 2)
3. Click "Creator Circle" tab
4. View existing messages
5. If you own the NFT or are a creator, try posting a message
6. If you don't own it, you'll see the read-only message

## Mock Data Locations

- Beat 1: Has 4 messages
- Beat 2: Has 2 messages
- Remix 1: Has 1 message

All other beats/remixes start with empty discussions.


