'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

/**
 * SolanaWalletConnect
 *
 * Production note:
 * - For a premium look, we can replace WalletMultiButton with a fully custom button + modal,
 *   but this is the quickest reliable integration for Phantom/Backpack/Solflare.
 */
export default function SolanaWalletConnect() {
  return (
    <div className="wallet-adapter-button-trigger">
      <WalletMultiButton className="!glass !rounded-lg !px-3 sm:!px-4 !py-2 !h-auto !text-xs sm:!text-sm !font-semibold !min-h-0" />
    </div>
  );
}

