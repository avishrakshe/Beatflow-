# 🔗 How to Connect Wallet to BeatFlow

## Step-by-Step Guide

### Prerequisites
1. **Install MetaMask Extension**
   - Download from: https://metamask.io/
   - Available for Chrome, Firefox, Brave, Edge
   - Create a wallet or import existing one

### Connection Steps

#### Step 1: Open BeatFlow
1. Start the development server:
   ```bash
   cd frontend
   npm run dev
   ```
2. Open browser and go to: `http://localhost:3000`

#### Step 2: Connect Wallet
1. Look at the **top-right corner** of the screen
2. Click the **"Connect Wallet"** button
3. MetaMask popup will appear

#### Step 3: Approve Connection
1. In MetaMask popup, select your account
2. Click **"Next"**
3. Click **"Connect"** to approve

#### Step 4: Verify Connection
✅ You should see:
- Your wallet address (shortened: `0x1234...5678`)
- Your ETH balance displayed
- Green indicator showing you're connected

## Network Setup

### For Local Development (Hardhat)

1. **Add Local Network to MetaMask:**
   - Network Name: `Localhost 8545`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `1337`
   - Currency Symbol: `ETH`

2. **Steps:**
   - Open MetaMask
   - Click network dropdown (top)
   - Click "Add Network" → "Add a network manually"
   - Fill in details above
   - Click "Save"

### For Polygon Mumbai (Testnet)

1. **Add Polygon Mumbai:**
   - Network Name: `Polygon Mumbai`
   - RPC URL: `https://rpc-mumbai.maticvigil.com`
   - Chain ID: `80001`
   - Currency Symbol: `MATIC`
   - Block Explorer: `https://mumbai.polygonscan.com`

2. **Get Test MATIC:**
   - Visit: https://faucet.polygon.technology/
   - Enter your wallet address
   - Request test tokens

## Troubleshooting

### "Please install MetaMask"
- **Solution:** Install MetaMask browser extension
- Make sure it's enabled in your browser

### "Connection Failed"
- **Solution:** 
  - Refresh the page
  - Make sure MetaMask is unlocked
  - Try disconnecting and reconnecting

### "Wrong Network"
- **Solution:**
  - Check which network your contracts are deployed on
  - Switch MetaMask to that network
  - Refresh the page

### "Insufficient Balance"
- **Solution:**
  - For local: Get test ETH from Hardhat (accounts are pre-funded)
  - For Mumbai: Use Polygon faucet to get test MATIC

### Button Not Working
- **Solution:**
  - Check browser console for errors (F12)
  - Make sure MetaMask is unlocked
  - Try refreshing the page

## After Connecting

Once connected, you can:
- ✅ View your ETH balance
- ✅ Purchase beats
- ✅ Upload/mint beats
- ✅ Upload remixes
- ✅ See your owned beats

## Switching Accounts

1. Click on your address in top-right
2. Click "Disconnect"
3. Click "Connect Wallet" again
4. Select a different account in MetaMask

## Security Tips

⚠️ **Important:**
- Never share your private key or seed phrase
- Only connect to trusted dApps
- Verify contract addresses before transactions
- Use testnet for testing, mainnet for production

## Visual Guide

```
┌─────────────────────────────────────┐
│  BeatFlow                    [2.3 ETH] [Connect Wallet] │
│                                      │
│  ┌──────────┐  ┌──────────┐        │
│  │ Beat 1   │  │ Beat 2   │        │
│  │ 0.5 ETH  │  │ 0.3 ETH  │        │
│  └──────────┘  └──────────┘        │
└─────────────────────────────────────┘
         ↑
    Click here to connect
```

## Need Help?

- Check browser console (F12) for error messages
- Verify MetaMask is installed and unlocked
- Ensure you're on the correct network
- Check that contracts are deployed (if using blockchain)

