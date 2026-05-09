import { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from './useWeb3';

/**
 * Hook for purchasing beats
 */
export function useBeatPurchase() {
  const { beatNFTContract, account } = useWeb3();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [error, setError] = useState(null);

  const purchaseBeat = async (tokenId, price) => {
    if (!beatNFTContract || !account) {
      throw new Error('Please connect your wallet');
    }

    setIsPurchasing(true);
    setError(null);

    try {
      const priceWei = ethers.parseEther(price.toString());
      
      const tx = await beatNFTContract.purchaseBeat(tokenId, {
        value: priceWei,
      });

      // Wait for transaction confirmation
      await tx.wait();

      return { success: true, txHash: tx.hash };
    } catch (err) {
      let errorMessage = 'Purchase failed';
      
      if (err.reason) {
        errorMessage = err.reason;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsPurchasing(false);
    }
  };

  return { purchaseBeat, isPurchasing, error };
}

