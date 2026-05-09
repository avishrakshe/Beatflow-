import { useCallback, useState } from 'react';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

/**
 * useSolanaTip
 * Sends a real SOL transfer on the currently selected cluster (devnet by default).
 *
 * MVP assumptions:
 * - Tip is a plain SystemProgram transfer (no custom program required).
 * - We use SOL (lamports) and show a simple success/failure toast in the caller.
 */
export function useSolanaTip() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isTipping, setIsTipping] = useState(false);

  const tip = useCallback(
    async ({ recipient, solAmount }) => {
      if (!publicKey) throw new Error('Solana action requires a Solana wallet (Phantom/Backpack/Solflare)');
      if (!recipient) throw new Error('Recipient wallet is missing');
      const amount = Number(solAmount);
      if (!amount || amount <= 0) throw new Error('Enter a valid tip amount');

      const toPubkey = new PublicKey(recipient);
      const lamports = Math.round(amount * 1e9);

      setIsTipping(true);
      try {
        const tx = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey,
            lamports,
          })
        );

        const sig = await sendTransaction(tx, connection);
        await connection.confirmTransaction(sig, 'confirmed');
        return sig;
      } finally {
        setIsTipping(false);
      }
    },
    [publicKey, sendTransaction, connection]
  );

  return { tip, isTipping, publicKey };
}

