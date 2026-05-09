# 🛠️ BeatFlow Troubleshooting Guide

## Common Issues and Solutions

### 1. "Connect Wallet" Button Not Working

**Symptoms:**
- Button doesn't respond when clicked
- No MetaMask popup appears

**Solutions:**
1. **Check if MetaMask is installed:**
   - Look for MetaMask extension icon in browser toolbar
   - If not installed: https://metamask.io/

2. **Check browser console for errors:**
   - Press `F12` to open developer tools
   - Click "Console" tab
   - Look for red error messages
   - Share the error message

3. **Make sure MetaMask is unlocked:**
   - Click MetaMask extension icon
   - Enter your password if locked

4. **Try refreshing the page:**
   - Press `Ctrl + R` (or `Cmd + R` on Mac)

---

### 2. "Please install MetaMask" Message

**Solution:**
1. Install MetaMask from: https://metamask.io/
2. Create a new wallet or import existing
3. Refresh the BeatFlow page

---

### 3. MetaMask Popup Not Appearing

**Solutions:**
1. **Check popup blocker:**
   - Browser might be blocking MetaMask popups
   - Look for popup blocker icon in address bar
   - Click and allow popups for this site

2. **Try clicking button again:**
   - Sometimes first click gets blocked

3. **Check MetaMask extension:**
   - Click MetaMask icon in toolbar
   - Make sure it's enabled and unlocked

---

### 4. "Failed to connect wallet" Error

**Possible causes and solutions:**

**A. Network Mismatch:**
- Contracts deployed on different network than MetaMask
- **Fix:** Switch MetaMask to correct network (localhost:1337 or Mumbai:80001)

**B. Contract Addresses Not Set:**
- Check `.env` file has correct addresses:
  ```env
  NEXT_PUBLIC_BEAT_NFT_ADDRESS=0x...
  NEXT_PUBLIC_MUSIC_REGISTRY_ADDRESS=0x...
  ```

**C. Check browser console:**
- Press `F12` → Console tab
- Share any red error messages you see

---

### 5. Page Shows "Loading beats from blockchain..." Forever

**Solutions:**

**A. Contracts not deployed:**
- App will fallback to mock data after timeout
- This is normal if contracts aren't deployed yet

**B. Wrong network:**
- Make sure MetaMask is on correct network
- Contracts must be deployed on that network

**C. Contract addresses incorrect:**
- Verify addresses in `.env` file match deployed contracts

---

### 6. "Insufficient Balance" When Purchasing

**Solutions:**

**For Localhost:**
- Hardhat provides test accounts with 10000 ETH
- Make sure you're using one of the Hardhat accounts:
  ```bash
  npx hardhat node
  ```
- Copy one of the private keys and import to MetaMask

**For Mumbai Testnet:**
- Get free test MATIC from: https://faucet.polygon.technology/
- Enter your wallet address
- Wait a few minutes for tokens to arrive

---

### 7. Transaction Fails or Gets Rejected

**Common reasons:**
1. **Not enough gas:**
   - Make sure you have enough ETH/MATIC for gas fees
   - Increase gas limit in MetaMask if needed

2. **User rejected transaction:**
   - Click "Confirm" in MetaMask popup
   - Don't click "Reject" or close popup

3. **Contract error:**
   - Check console for specific error
   - Verify contract addresses are correct
   - Make sure contract is deployed

---

### 8. Beats Not Showing Up

**Solutions:**
1. **Check if any beats are minted:**
   - Go to upload page and mint a test beat
   - Refresh marketplace page

2. **Check network:**
   - Make sure you're on same network as contracts

3. **Try refreshing:**
   - Press `F5` or `Ctrl + R`

---

### 9. IPFS Upload Failing

**Solutions:**
1. **Check internet connection:**
   - IPFS requires internet to upload

2. **Try different IPFS gateway:**
   - Update `.env`:
     ```env
     NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
     # or
     NEXT_PUBLIC_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/
     ```

3. **For production:**
   - Use Pinata or Infura IPFS service
   - Public gateway can be slow/unreliable

---

### 10. "Cannot read property" or JavaScript Errors

**Solutions:**
1. **Check browser console (F12):**
   - Note the exact error message
   - Check which file/line number

2. **Clear browser cache:**
   - Press `Ctrl + Shift + Delete`
   - Clear cached files
   - Refresh page

3. **Restart dev server:**
   ```bash
   # Stop server (Ctrl + C)
   # Then restart:
   npm run dev
   ```

---

## Debug Steps (Do These First!)

### Step 1: Check Browser Console
1. Press `F12` to open developer tools
2. Click "Console" tab
3. Look for any red error messages
4. **Copy the error message** - this helps identify the issue

### Step 2: Check Network Tab
1. Still in developer tools (F12)
2. Click "Network" tab
3. Try connecting wallet
4. Look for failed requests (red)
5. Check what the error says

### Step 3: Verify MetaMask
1. Click MetaMask extension icon
2. Make sure it's unlocked
3. Check what network you're on
4. Verify you have an account selected

### Step 4: Check Environment Variables
1. Make sure `.env` file exists in `frontend/` folder
2. Check it has the contract addresses (if contracts are deployed):
   ```env
   NEXT_PUBLIC_BEAT_NFT_ADDRESS=0x...
   NEXT_PUBLIC_MUSIC_REGISTRY_ADDRESS=0x...
   ```

### Step 5: Verify Dev Server is Running
```bash
cd frontend
npm run dev
```
Should see: `✓ Ready in X seconds`

---

## Quick Test Checklist

Before asking for help, try these:

- [ ] MetaMask installed and unlocked?
- [ ] Dev server running (`npm run dev`)?
- [ ] Browser console open (F12) - any errors?
- [ ] Refreshed the page?
- [ ] On correct network in MetaMask?
- [ ] Contract addresses set (if using blockchain)?
- [ ] Have test ETH/MATIC for transactions?

---

## Still Having Issues?

Please share:
1. **What you're trying to do:** (e.g., "Connect wallet", "Purchase beat")
2. **What error you see:** (exact message from console/UI)
3. **Browser console errors:** (Press F12 → Console tab → copy errors)
4. **Screenshot:** If possible, share a screenshot

---

## Common Console Errors and Fixes

### "ethereum is not defined"
- **Fix:** Make sure MetaMask is installed

### "User rejected the request"
- **Fix:** Click "Confirm" in MetaMask, don't reject

### "Network error"
- **Fix:** Check internet connection, verify network RPC URL

### "Contract not found"
- **Fix:** Verify contract addresses in `.env` are correct

### "Nonce too high"
- **Fix:** Reset MetaMask account (Settings → Advanced → Reset Account)

---

## Getting Help

When asking for help, include:
1. Operating system (Windows/Mac/Linux)
2. Browser (Chrome/Firefox/Brave)
3. MetaMask version
4. What you were trying to do
5. Exact error message from console
6. Screenshot if possible

