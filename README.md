# Creator-to-Creator Music Marketplace

A Web3 music platform MVP for ETHMumbai hackathon where artists can upload beats as NFTs, sell them, and enable remix creation for NFT owners.

## Features

- **Beat NFTs**: Mint beats as ERC721 NFTs with fixed ETH prices
- **Marketplace**: Buy and sell beat licenses
- **Remix Economy**: Only NFT owners can upload remixes
- **On-chain Registry**: Track original beats and their remixes
- **IPFS Storage**: Audio files and metadata stored on IPFS

## Tech Stack

- **Smart Contracts**: Solidity 0.8.20, Hardhat, OpenZeppelin
- **Frontend**: Next.js, React, Tailwind CSS
- **Blockchain**: Ethereum / Polygon
- **Storage**: IPFS
- **Wallet**: MetaMask

## Project Structure

```
/
├── contracts/          # Solidity smart contracts
│   ├── BeatNFT.sol
│   └── MusicRegistry.sol
├── scripts/            # Deployment scripts
│   └── deploy.js
├── test/               # Hardhat tests
│   ├── BeatNFT.test.js
│   └── MusicRegistry.test.js
├── frontend/           # Next.js frontend
│   ├── pages/
│   ├── components/
│   ├── hooks/
│   └── utils/
└── hardhat.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask browser extension
- Hardhat

### Installation

1. Install dependencies:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd frontend && npm install
```

### Smart Contract Development

1. Compile contracts:
```bash
npm run compile
```

2. Run tests:
```bash
npm run test
```

3. Deploy to local network:
```bash
npx hardhat node  # In one terminal
npm run deploy:local  # In another terminal
```

### Frontend Development

1. Start development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000)

## Smart Contracts

### BeatNFT.sol

ERC721 NFT contract for beat licenses.

**Key Functions:**
- `mintBeat(ipfsHash, price)` - Mint a new beat NFT
- `purchaseBeat(tokenId)` - Buy a beat (payable)
- `getBeatInfo(tokenId)` - Get beat details

### MusicRegistry.sol

Registry for original beats and remixes.

**Key Functions:**
- `registerOriginalBeat(beatNFTId, ipfsHash)` - Register original beat
- `registerRemix(originalBeatNFTId, ipfsHash)` - Register remix (requires ownership)
- `getRemixesByOriginal(beatNFTId)` - Get all remixes for a beat

## IPFS Metadata Structure

### Beat Metadata
```json
{
  "name": "Beat Name",
  "description": "Beat description",
  "audio": "ipfs://Qm...",
  "image": "ipfs://Qm...",
  "genre": "Hip-Hop",
  "bpm": 140,
  "creator": "0x...",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Remix Metadata
```json
{
  "name": "Remix Name",
  "description": "Remix description",
  "audio": "ipfs://Qm...",
  "originalBeatId": 1,
  "remixer": "0x...",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## Environment Variables

Create a `.env` file in the root directory:

```
PRIVATE_KEY=your_private_key_here
MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
NEXT_PUBLIC_BEAT_NFT_ADDRESS=0x...
NEXT_PUBLIC_MUSIC_REGISTRY_ADDRESS=0x...
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
```

## License

MIT

## Hackathon Notes

This is an MVP built for ETHMumbai hackathon. Future enhancements could include:
- Royalty splits
- Streaming payments
- DAO governance
- Token rewards
- Advanced search/filtering

