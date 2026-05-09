import { useCallback, useState } from 'react';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

function b64ToJson(b64) {
  const str = atob(b64);
  return JSON.parse(str);
}

export function useX402Stream() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isPaying, setIsPaying] = useState(false);

  const fetchWithPay = useCallback(
    async ({ beatId, recipient }) => {
      if (!recipient) throw new Error('Missing recipient');

      const first = await fetch(`/api/stream/${encodeURIComponent(String(beatId))}`, {
        headers: { 'x-recipient': recipient },
      });

      if (first.status !== 402) {
        return await first.json();
      }

      const requiredHeader = first.headers.get('payment-required');
      if (!requiredHeader) throw new Error('Missing payment-required header');

      const req = b64ToJson(requiredHeader);
      if (!publicKey) throw new Error('Streaming payments require a Solana wallet connection');
      if (!sendTransaction) throw new Error('Wallet cannot send transactions');

      setIsPaying(true);
      try {
        const tx = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(req.recipient),
            lamports: Number(req.amountLamports),
          })
        );
        const sig = await sendTransaction(tx, connection, { skipPreflight: false });

        const second = await fetch(`/api/stream/${encodeURIComponent(String(beatId))}`, {
          headers: {
            'x-recipient': recipient,
            'payment-signature': sig,
          },
        });
        return await second.json();
      } finally {
        setIsPaying(false);
      }
    },
    [connection, publicKey, sendTransaction]
  );

  return { fetchWithPay, isPaying };
}

