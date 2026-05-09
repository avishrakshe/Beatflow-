import { useCallback, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';

const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');

export function useSolanaProof() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isPosting, setIsPosting] = useState(false);

  const postProof = useCallback(
    async ({ payload }) => {
      if (!publicKey) throw new Error('Connect Solana wallet');
      if (!sendTransaction) throw new Error('Wallet cannot send transactions');

      const memo = typeof payload === 'string' ? payload : JSON.stringify(payload);
      const ix = new TransactionInstruction({
        programId: MEMO_PROGRAM_ID,
        keys: [{ pubkey: publicKey, isSigner: true, isWritable: false }],
        data: Buffer.from(memo, 'utf8'),
      });

      setIsPosting(true);
      try {
        const tx = new Transaction().add(ix);
        const sig = await sendTransaction(tx, connection, { skipPreflight: false });
        return sig;
      } finally {
        setIsPosting(false);
      }
    },
    [connection, publicKey, sendTransaction]
  );

  return { postProof, isPosting };
}

