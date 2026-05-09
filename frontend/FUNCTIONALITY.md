# BeatFlow Functionality Guide

## ✅ Implemented Features

### 1. **Wallet Connection**
- ✅ MetaMask integration
- ✅ Real-time balance display
- ✅ Account change detection
- ✅ Chain change handling

### 2. **Beat Marketplace**
- ✅ Fetch beats from blockchain (with mock data fallback)
- ✅ Display beat cards with NFT badges
- ✅ Real-time ownership checking
- ✅ Beat selection and details view

### 3. **Beat Purchasing**
- ✅ Purchase beats with ETH
- ✅ Transaction handling and confirmation
- ✅ Toast notifications for success/error
- ✅ Automatic ownership update after purchase

### 4. **Beat Upload/Minting**
- ✅ Upload audio files to IPFS
- ✅ Upload cover images to IPFS
- ✅ Create metadata JSON
- ✅ Mint NFT on blockchain
- ✅ Register in MusicRegistry
- ✅ Progress tracking during upload

### 5. **Remix Upload**
- ✅ Ownership verification before upload
- ✅ Upload remix audio to IPFS
- ✅ Register remix on blockchain
- ✅ Link remix to original beat

### 6. **Music Player**
- ✅ Audio playback
- ✅ Play/pause controls
- ✅ Progress bar
- ✅ Volume control
- ✅ Like functionality (localStorage)

### 7. **User Interface**
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive design

## 📋 How to Use

### Connect Wallet
1. Click "Connect Wallet" in top-right
2. Approve MetaMask connection
3. Your balance will appear

### Browse Beats
1. View beats in marketplace
2. Click any beat card to see details
3. Hover over cards to see play button

### Purchase a Beat
1. Select a beat from marketplace
2. Click "BUY LICENSE" in right panel
3. Approve transaction in MetaMask
4. Wait for confirmation
5. Beat ownership updates automatically

### Upload a Beat
1. Click "UPLOAD BEAT" in sidebar
2. Fill in beat details (name, price, etc.)
3. Upload audio file (required)
4. Upload cover image (optional)
5. Click "Mint Beat NFT"
6. Approve transactions in MetaMask
7. Wait for IPFS uploads and minting

### Upload a Remix
1. Purchase a beat first (must own NFT)
2. Click "PUBLISH REMIX" in sidebar or beat details
3. Enter original beat NFT ID
4. Fill in remix details
5. Upload remix audio file
6. Click "Upload Remix"
7. System verifies ownership automatically

## 🔧 Configuration

### Contract Addresses
Update in `.env` or `frontend/utils/contracts.js`:
```env
NEXT_PUBLIC_BEAT_NFT_ADDRESS=0x...
NEXT_PUBLIC_MUSIC_REGISTRY_ADDRESS=0x...
```

### IPFS Gateway
Update in `.env`:
```env
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
```

## 🚨 Important Notes

1. **IPFS Setup**: Currently uses public IPFS gateway. For production, set up your own IPFS node or use Pinata/Infura.

2. **Network**: Make sure you're on the correct network (localhost, Mumbai, etc.) that matches your deployed contracts.

3. **Mock Data**: If contracts aren't deployed, the app falls back to mock data for demonstration.

4. **File Uploads**: Large audio files may take time to upload to IPFS. Be patient during the upload process.

5. **Gas Fees**: All blockchain transactions require gas fees. Make sure your wallet has enough ETH.

## 🐛 Troubleshooting

### "Please connect your wallet"
- Make sure MetaMask is installed
- Click "Connect Wallet" button
- Approve connection in MetaMask popup

### "Contract not found"
- Check contract addresses in `.env`
- Make sure contracts are deployed
- Verify you're on the correct network

### "IPFS upload failed"
- Check internet connection
- Try using a different IPFS gateway
- For production, set up dedicated IPFS node

### "Transaction failed"
- Check you have enough ETH for gas
- Verify contract addresses are correct
- Check network matches deployed contracts

## 📝 Next Steps (Future Enhancements)

- [ ] Real-time beat updates via events
- [ ] Remix listing and playback
- [ ] User profile pages
- [ ] Like/play count tracking on-chain
- [ ] Search and filtering
- [ ] Playlist functionality
- [ ] Social features (comments, shares)

