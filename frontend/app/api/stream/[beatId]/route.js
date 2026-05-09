import { NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';

const DEVNET_RPC = 'https://api.devnet.solana.com';
const DEFAULT_PRICE_LAMPORTS = 50_000; // 0.00005 SOL (demo micropayment)

function b64json(obj) {
  return Buffer.from(JSON.stringify(obj), 'utf8').toString('base64');
}

async function verifyPayment({ signature, recipient, minLamports }) {
  const connection = new Connection(DEVNET_RPC, 'confirmed');
  const tx = await connection.getParsedTransaction(signature, { maxSupportedTransactionVersion: 0 });
  if (!tx) return { ok: false, reason: 'Transaction not found (yet)' };

  const recipientStr = new PublicKey(recipient).toBase58();
  let paid = 0;

  for (const ix of tx.transaction.message.instructions) {
    if (ix?.program === 'system' && ix?.parsed?.type === 'transfer') {
      const info = ix.parsed.info;
      if (info?.destination === recipientStr) {
        paid += Number(info.lamports || 0);
      }
    }
  }

  if (paid < minLamports) return { ok: false, reason: `Insufficient payment: ${paid} lamports` };
  return { ok: true };
}

export async function GET(_req, { params }) {
  const beatId = params?.beatId || 'unknown';

  // For demo: pay the beat's producer address (client can pass it; we verify it exists).
  const recipient = _req.headers.get('x-recipient');
  const paymentSig = _req.headers.get('payment-signature');

  if (!recipient) {
    return NextResponse.json({ error: 'Missing x-recipient header' }, { status: 400 });
  }

  // No proof -> 402 with payment requirements (x402-style)
  if (!paymentSig) {
    const paymentRequired = {
      v: 1,
      scheme: 'solana-transfer',
      cluster: 'devnet',
      amountLamports: DEFAULT_PRICE_LAMPORTS,
      recipient,
      resource: { kind: 'beat_stream', beatId },
    };

    return new NextResponse(
      JSON.stringify({ error: 'Payment required', beatId }),
      {
        status: 402,
        headers: {
          'content-type': 'application/json',
          'payment-required': b64json(paymentRequired),
        },
      }
    );
  }

  // Proof provided -> verify on-chain transfer
  try {
    const v = await verifyPayment({ signature: paymentSig, recipient, minLamports: DEFAULT_PRICE_LAMPORTS });
    if (!v.ok) {
      return NextResponse.json({ error: 'Payment not verified', reason: v.reason }, { status: 402 });
    }

    // Return a "stream manifest" (demo). In production, you'd return a signed URL / range-stream.
    return NextResponse.json({
      ok: true,
      beatId,
      verifiedPaymentSig: paymentSig,
      playback: {
        mode: 'demo',
        note: 'Replace with signed URL / streaming proxy for real audio bytes.',
      },
    });
  } catch (e) {
    return NextResponse.json({ error: e?.message || 'Verification failed' }, { status: 500 });
  }
}

