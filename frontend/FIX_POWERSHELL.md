# 🔧 Fix PowerShell Execution Policy Error

## The Problem
PowerShell is blocking npm scripts due to security settings.

## ✅ Solution 1: Use npm.cmd (Easiest)

Instead of `npm run dev`, use:

```powershell
npm.cmd run dev
```

This bypasses the PowerShell script restriction.

---

## ✅ Solution 2: Change Execution Policy (Recommended)

Run this command in PowerShell (as Administrator):

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then type `Y` when prompted.

After this, `npm run dev` will work normally.

---

## ✅ Solution 3: Use Command Prompt Instead

1. Close PowerShell terminal in VS Code
2. Open Command Prompt:
   - Press `Ctrl + Shift + P`
   - Type: "Terminal: Select Default Profile"
   - Choose "Command Prompt"
3. Open new terminal and run:
   ```cmd
   cd frontend
   npm run dev
   ```

---

## Quick Fix (Right Now)

In your current terminal, just run:

```powershell
npm.cmd run dev
```

This should work immediately! 🚀

