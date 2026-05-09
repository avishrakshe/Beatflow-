# BeatFlow - Quick Setup Guide

## Project Overview

BeatFlow is a Web3 music marketplace MVP with:
- **Smart Contracts**: BeatNFT.sol & MusicRegistry.sol (Solidity/Hardhat)
- **Frontend**: Next.js dark-themed UI with Spotify-like design

## Quick Start

### 1. Install Dependencies

```bash
# Root directory (smart contracts)
npm install

# Frontend directory
cd frontend
npm install
```

### 2. Smart Contracts Setup

```bash
# Compile contracts
npm run compile

# Run tests
npm run test

# Deploy to local network
npx hardhat node  # Terminal 1
npm run deploy:local  # Terminal 2
```

### 3. Frontend Setup

```bash
cd frontend

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the BeatFlow UI.

## Environment Variables

Create `.env` file in root:

```env
PRIVATE_KEY=your_private_key_here
MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
NEXT_PUBLIC_BEAT_NFT_ADDRESS=0x...
NEXT_PUBLIC_MUSIC_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
```

## Project Structure

```
/
├── contracts/          # Solidity smart contracts
│   ├── BeatNFT.sol
│   └── MusicRegistry.sol
├── scripts/            # Deployment scripts
├── test/               # Hardhat tests
├── frontend/           # Next.js frontend
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   ├── data/          # Mock data
│   ├── hooks/         # React hooks (useWeb3)
│   └── utils/         # Utilities (contracts, IPFS)
└── hardhat.config.js
```

## Key Features

### Smart Contracts
- ✅ Beat NFT minting and trading
- ✅ Remix registration with ownership enforcement
- ✅ On-chain beat and remix registry

### Frontend UI
- ✅ Dark theme with gradient accents
- ✅ Beat marketplace with trending/new releases
- ✅ Beat detail panel with license info
- ✅ Music player (sticky bottom)
- ✅ Wallet connection (MetaMask ready)
- ✅ Mock data for demo

## Next Steps

1. **Deploy Contracts**: Deploy to Polygon Mumbai testnet
2. **Update Addresses**: Add contract addresses to `.env`
3. **Connect Frontend**: Update `frontend/utils/contracts.js` with deployed addresses
4. **IPFS Setup**: Configure IPFS node (Infura/Pinata)
5. **Test Integration**: Connect wallet and test minting/purchasing

## Design Decisions

- **Dark Theme**: Modern, premium feel matching music streaming apps
- **Card-Based Layout**: Easy to scan and browse beats
- **Three-Panel Layout**: Sidebar navigation, main content, detail panel
- **Sticky Player**: Always accessible music playback
- **Glassmorphism**: Subtle depth with backdrop blur effects
- **Gradient Accents**: Purple/blue/green for Web3 aesthetic

## Troubleshooting

### Frontend won't start
- Check Node.js version (18+)
- Delete `node_modules` and reinstall
- Check port 3000 is available

### Contracts won't compile
- Check Solidity version in `hardhat.config.js`
- Ensure OpenZeppelin contracts are installed

### Wallet connection issues
- Ensure MetaMask is installed
- Check network (should be localhost or Mumbai)
- Verify contract addresses are set

## Resources

- [Hardhat Docs](https://hardhat.org/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

