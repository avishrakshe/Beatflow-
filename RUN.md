# 🎵 How to Run BeatFlow Frontend

## Quick Start (3 Steps)

### Step 1: Open Terminal
Open PowerShell or Command Prompt in your project folder:
```
C:\Users\Avish Rakshe\blockchain spotify project\
```

### Step 2: Go to Frontend Folder
```powershell
cd frontend
```

### Step 3: Install & Run
```powershell
npm install
npm run dev
```

### Step 4: Open Browser
Go to: **http://localhost:3000**

---

## Detailed Instructions

### Option A: Using PowerShell

1. **Open PowerShell** in your project root folder
2. **Navigate to frontend:**
   ```powershell
   cd frontend
   ```
3. **Install dependencies** (first time only):
   ```powershell
   npm install
   ```
4. **Start the server:**
   ```powershell
   npm run dev
   ```
5. **Open browser** and visit: `http://localhost:3000`

### Option B: Using VS Code Terminal

1. Open VS Code in your project folder
2. Press `` Ctrl + ` `` to open terminal
3. Type:
   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

---

## What You Should See

When `npm run dev` runs successfully, you'll see:

```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  ✓ Ready in 2.5s
```

Then open **http://localhost:3000** in your browser!

---

## If Something Goes Wrong

### Error: "npm is not recognized"
- Install Node.js from: https://nodejs.org/
- Restart your terminal after installing

### Error: "Port 3000 is already in use"
```powershell
npm run dev -- -p 3001
```
Then open: http://localhost:3001

### Error: "Cannot find module"
```powershell
cd frontend
rmdir /s /q node_modules
npm install
npm run dev
```

### Still having issues?
1. Make sure you're in the `frontend` folder
2. Check Node.js version: `node --version` (should be 18+)
3. Delete `node_modules` folder and run `npm install` again

---

## Success! 🎉

Once running, you'll see:
- Dark-themed BeatFlow interface
- Beat marketplace with cards
- Sidebar navigation
- Music player at bottom

**Enjoy exploring BeatFlow!** 🎵

