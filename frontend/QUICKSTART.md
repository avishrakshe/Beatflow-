# 🚀 Quick Start Guide - BeatFlow Frontend

## Step-by-Step Instructions

### 1. Navigate to Frontend Directory

Open your terminal and navigate to the frontend folder:

```bash
cd frontend
```

### 2. Install Dependencies

Install all required packages:

```bash
npm install
```

**Expected output:** Packages will be installed (this may take 1-2 minutes)

### 3. Start Development Server

Run the Next.js development server:

```bash
npm run dev
```

**Expected output:**
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Ready in X seconds
```

### 4. Open in Browser

Open your web browser and go to:

```
http://localhost:3000
```

You should see the **BeatFlow** dark-themed music marketplace!

## What You'll See

- ✅ **Left Sidebar** - Navigation menu and artist profile
- ✅ **Main Area** - Trending Beats, New Releases, Community Remixes
- ✅ **Right Panel** - Beat details (select a beat to see)
- ✅ **Bottom Player** - Music player (appears when you play a beat)
- ✅ **Top Right** - Wallet connection button and ETH balance

## Troubleshooting

### Port 3000 Already in Use?

If you get an error about port 3000 being in use:

```bash
# Windows PowerShell
$env:PORT=3001; npm run dev

# Or use a different port
npm run dev -- -p 3001
```

Then open: `http://localhost:3001`

### Module Not Found Errors?

Delete `node_modules` and reinstall:

```bash
# Windows
rmdir /s /q node_modules
npm install

# Mac/Linux
rm -rf node_modules
npm install
```

### Build Errors?

Make sure you have Node.js 18+ installed:

```bash
node --version
```

If version is below 18, update Node.js from [nodejs.org](https://nodejs.org/)

## Next Steps

Once the app is running:

1. **Click on any beat card** to see details in the right panel
2. **Hover over beats** to see the play button
3. **Click "Connect Wallet"** (uses mock connection for now)
4. **Try the music player** at the bottom

## Commands Reference

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run linter
```

## Need Help?

- Check `README.md` for detailed documentation
- Check `SETUP.md` in the root directory for full project setup
- Ensure all dependencies are installed correctly

