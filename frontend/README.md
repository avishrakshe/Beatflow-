# BeatFlow Frontend

A modern, dark-themed Web3 music marketplace UI built with Next.js, React, and Tailwind CSS.

## Features

- 🎨 **Dark Theme Design** - Spotify-inspired dark UI with gradient accents
- 🎵 **Beat Marketplace** - Browse trending beats, new releases, and community remixes
- 🎧 **Music Player** - Sticky bottom player with playback controls
- 💎 **NFT Integration** - Display NFT badges and ownership status
- 🔗 **Wallet Connection** - MetaMask integration ready
- ✨ **Smooth Animations** - Framer Motion for premium feel

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS** - Custom dark theme configuration
- **Framer Motion** - Subtle animations
- **Lucide React** - Icon library
- **Ethers.js** - Web3 interactions (ready for integration)

## Project Structure

```
frontend/
├── app/
│   ├── layout.js          # Root layout
│   └── page.js            # Main marketplace page
├── components/
│   ├── Layout.js          # Main layout wrapper
│   ├── Sidebar.js         # Left navigation sidebar
│   ├── BeatCard.js        # Beat card component
│   ├── BeatMarketplace.js # Main marketplace view
│   ├── BeatDetails.js     # Right panel beat details
│   ├── MusicPlayer.js     # Bottom sticky player
│   └── WalletConnect.js   # Wallet connection component
├── data/
│   └── mockData.js        # Mock beats, remixes, artists data
├── hooks/
│   └── useWeb3.js         # Web3 hook (ready for integration)
├── utils/
│   ├── contracts.js       # Contract ABIs and addresses
│   └── ipfs.js            # IPFS utilities
└── styles/
    └── globals.css         # Global styles and Tailwind config
```

## Getting Started

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

## Design System

### Colors

- **Dark Background**: `#0a0a0a` (dark-bg)
- **Surface**: `#121212` (dark-surface)
- **Card**: `#181818` (dark-card)
- **Hover**: `#282828` (dark-hover)
- **Accent Purple**: `#8b5cf6`
- **Accent Blue**: `#3b82f6`
- **Accent Green**: `#10b981` (primary actions)

### Components

All components use Tailwind CSS with custom dark theme classes:
- `.glass` - Glassmorphism effect
- `.btn-primary` - Primary action button (green)
- `.btn-secondary` - Secondary button
- `.beat-card` - Beat card styling
- `.card` - General card component

## Mock Data

The app uses mock data from `data/mockData.js`:
- `mockBeats` - Array of beat objects
- `mockRemixes` - Array of remix objects
- `mockArtists` - Array of artist profiles
- `mockUser` - Current user data (for testing ownership)

## Integration Points

### Web3 Integration

The `useWeb3` hook is ready to connect to:
- MetaMask wallet
- BeatNFT contract
- MusicRegistry contract

Update contract addresses in `utils/contracts.js` after deployment.

### IPFS Integration

IPFS utilities are available in `utils/ipfs.js`:
- `uploadToIPFS()` - Upload files
- `uploadMetadataToIPFS()` - Upload JSON metadata
- `fetchFromIPFS()` - Fetch from IPFS
- `getIPFSURL()` - Get IPFS gateway URL

## Customization

### Adding New Pages

1. Create new page in `app/` directory
2. Add navigation item in `components/Sidebar.js`
3. Update routing logic

### Styling

- Modify `tailwind.config.js` for theme changes
- Update `styles/globals.css` for global styles
- Use Tailwind utility classes for component-specific styles

## Notes

- This is a UI-focused implementation with mock data
- Smart contract integration is prepared but not fully connected
- Audio playback uses HTML5 audio element
- Likes/plays are stored in localStorage (MVP)

## Future Enhancements

- Full Web3 integration with smart contracts
- Real-time audio streaming
- User authentication and profiles
- Search and filtering
- Playlist functionality
- Social features (comments, shares)
