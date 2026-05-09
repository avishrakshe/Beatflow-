# BeatFlow: AI-Powered Web3 Music Marketplace

BeatFlow is a decentralized, creator-to-creator music marketplace and AI production studio. It enables independent music producers and artists to generate AI vocals, mint their tracks as NFTs, seamlessly manage derivative works (remixes), and monetize their content via token-gated streaming and direct on-chain sales.

## 🚀 The Problem Solved
The traditional music industry is plagued by three major pain points for independent creators:
1. **Opaque Licensing & Provenance:** Tracking ownership of beats and ensuring original creators are credited (and paid) when remixes are made is nearly impossible, often resulting in automated copyright strikes.
2. **Expensive Production Assets:** Sourcing high-quality, royalty-free vocal hooks, spoken-word intros, or producer tags is prohibitively expensive for independent beatmakers.
3. **Inefficient Monetization:** Streaming payouts are notoriously low, and setting up micro-transactions for exclusive "first listens" or premium stems requires complex fiat payment gateways.

## 💡 How It Works (Technical Architecture)

BeatFlow solves these problems by combining generative AI with a full-stack Web3 architecture.

### 1. AI Voice Studio (ElevenLabs Integration)
We integrated an in-app AI Voice Studio to eliminate the cost of hiring vocalists. Built using a secure Next.js serverless proxy (`/api/elevenlabs/tts`), the frontend securely communicates with the **ElevenLabs `v1/text-to-speech` API** (`eleven_multilingual_v2` model). Creators can input lyrics, generate studio-quality audio buffers, and export the MP3s to overlay onto their instrumentals—resulting in 100% royalty-free tracks ready for on-chain minting.

### 2. Smart Contracts & Provenance (EVM & Solidity)
Our decentralized backend is powered by custom Solidity smart contracts (v0.8.24) deployed via Hardhat:
*   **`BeatNFT.sol`**: An ERC721 contract that handles the minting and trading of beat licenses. Metadata (including the audio buffer and cover art) is pinned immutably to IPFS.
*   **`MusicRegistry.sol`**: A custom on-chain registry that strictly enforces derivative rights. It tracks original beats and guarantees that only verified NFT owners can register and upload remixes, solving the provenance issue natively on-chain.

### 3. Web3 Authentication & Mobile Fallbacks (Solana)
To ensure maximum accessibility, we implemented the `@solana/wallet-adapter-react` suite connecting to Phantom, Solflare, and Backpack. The standard adapter automatically leverages the **Mobile Wallet Adapter (MWA)** protocol via native Android intents. For edge cases and iOS users, we engineered a custom `SolanaMobileDeepLinks` React component that intercepts wallet connection attempts on mobile viewports and formats universal deep links (e.g., `phantom.app/ul/browse/...`), ensuring a flawless cross-platform mobile UX.

### 4. Token-Gated Streaming (x402 Protocol Implementation)
To monetize streams directly, we built a custom `useX402Stream` React hook. When a user attempts to play a locked track in the global `MusicPlayer` component, the frontend intercepts the DOM audio request and triggers a `FirstListenModal`. This initiates a micro-transaction workflow via the connected Web3 wallet. Once the on-chain payment is verified, the frontend state unlocks, fetching and decrypting the audio stream for playback.

## 🛠 Tech Stack

**Frontend & UI**
*   **Framework:** Next.js 14 (App Router)
*   **Library:** React 18
*   **Styling:** Tailwind CSS (with Glassmorphism design system)
*   **Animations:** Framer Motion

**Web3 & Blockchain**
*   **Solana Integration:** `@solana/web3.js`, `@solana/wallet-adapter-react` (Supports Phantom, Backpack, Solflare)
*   **Mobile Web3:** Solana Mobile Wallet Adapter (MWA) protocol & Custom Deep-linking
*   **Smart Contracts:** Solidity (v0.8.24)
*   **Development Environment:** Hardhat (Ethereum Sepolia/Polygon)
*   **Client Interaction:** Ethers.js (v6)

**AI & Storage**
*   **Generative AI Audio:** ElevenLabs API (`v1/text-to-speech`)
*   **Decentralized Storage:** IPFS for immutable audio and metadata hosting

## 🏃 Getting Started

### Prerequisites
- Node.js 18+
- Phantom/MetaMask browser extension

### Installation
1. Install dependencies in root:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd frontend && npm install
```

3. Configure Environment Variables
Create a `.env.local` inside `/frontend` containing:
```
ELEVENLABS_API_KEY=your_key_here
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
```

### Running Locally
```bash
cd frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## 📝 License
MIT
