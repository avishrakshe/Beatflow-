# Creator-to-Creator Music Marketplace - Architecture

## Smart Contract Architecture

### 1. BeatNFT.sol
**Purpose:** ERC721 NFT contract for minting and trading beat licenses

**Key Features:**
- Mint beats as NFTs with IPFS metadata
- Store creator address and fixed ETH price
- Purchase functionality (transfer NFT + send ETH to creator)
- Query functions for beat information

**State Variables:**
- `tokenId` counter
- `beatMetadata` mapping (tokenId => IPFS hash)
- `beatPrice` mapping (tokenId => price in ETH)
- `beatCreator` mapping (tokenId => creator address)

**Functions:**
- `mintBeat(ipfsHash, price)` - Mint new beat NFT
- `purchaseBeat(tokenId)` - Buy beat (payable)
- `getBeatInfo(tokenId)` - Get beat metadata, price, creator

---

### 2. MusicRegistry.sol
**Purpose:** Registry for original beats and remixes with ownership enforcement

**Key Features:**
- Register original beats (linked to BeatNFT)
- Register remixes (only if caller owns the original beat NFT)
- Map remixId -> originalBeatId
- Query functions for remix relationships

**State Variables:**
- `originalBeats` mapping (beatNFTId => OriginalBeat struct)
- `remixes` mapping (remixId => Remix struct)
- `remixCounter` - Auto-incrementing remix IDs
- `remixToOriginal` mapping (remixId => originalBeatNFTId)

**Structs:**
```solidity
struct OriginalBeat {
    uint256 beatNFTId;
    address creator;
    string ipfsHash;
    uint256 createdAt;
}

struct Remix {
    uint256 remixId;
    uint256 originalBeatNFTId;
    address remixer;
    string ipfsHash;
    uint256 createdAt;
}
```

**Functions:**
- `registerOriginalBeat(beatNFTId, ipfsHash)` - Register original beat
- `registerRemix(originalBeatNFTId, ipfsHash)` - Register remix (checks ownership)
- `getRemixesByOriginal(beatNFTId)` - Get all remixes for a beat
- `getRemixInfo(remixId)` - Get remix details

---

## Frontend Architecture

### Pages
1. **Marketplace (`/`)** - List all beat NFTs, buy functionality
2. **Upload Beat (`/upload-beat`)** - Mint new beat NFT
3. **Remix Upload (`/remix`)** - Upload remix (requires NFT ownership)
4. **Artist Profile (`/profile`)** - View artist's beats and remixes
5. **Music Player (`/player/:id`)** - Play music, like, view popularity

### Components
- `BeatCard` - Display beat info, price, buy button
- `MusicPlayer` - Audio player with like functionality
- `WalletConnect` - MetaMask connection component

### Hooks
- `useWeb3` - Web3 provider, account, contract instances
- `useIPFS` - IPFS upload/download utilities

### Utils
- `contracts.js` - Contract ABIs and addresses
- `ipfs.js` - IPFS client configuration

---

## Data Flow

### Upload Beat Flow:
1. User uploads audio file → IPFS
2. Create metadata JSON → IPFS
3. Call `BeatNFT.mintBeat(ipfsHash, price)`
4. Call `MusicRegistry.registerOriginalBeat(beatNFTId, metadataHash)`

### Purchase Beat Flow:
1. User clicks "Buy" → `BeatNFT.purchaseBeat(tokenId)` with ETH
2. NFT transferred to buyer
3. ETH sent to original creator

### Upload Remix Flow:
1. Check if user owns beat NFT
2. Upload remix audio → IPFS
3. Create remix metadata → IPFS
4. Call `MusicRegistry.registerRemix(originalBeatNFTId, remixMetadataHash)`

---

## IPFS Metadata Structure

### Beat Metadata:
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

### Remix Metadata:
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

---

## Security Considerations (MVP)

1. **Ownership Checks:** Remix registration verifies NFT ownership
2. **Price Validation:** Ensure price > 0 when minting
3. **Access Control:** Only NFT owner can register remix
4. **Reentrancy:** Use checks-effects-interactions pattern

---

## Future Enhancements (Post-MVP)

- Royalty splits for remixes
- Streaming payments
- DAO governance
- Token rewards
- Advanced search/filtering
- Social features (comments, follows)

