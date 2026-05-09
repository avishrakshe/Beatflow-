import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from './useWeb3';
import { fetchFromIPFS, getIPFSURL } from '../utils/ipfs';
import { BEAT_NFT_ADDRESS } from '../utils/contracts';

/**
 * Hook to fetch and manage beats from the blockchain
 */
export function useBeats() {
  const { beatNFTContract, account } = useWeb3();
  const [beats, setBeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBeats = useCallback(async () => {
    if (!beatNFTContract) {
      // Fallback to mock data if contract not available
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const totalSupply = await beatNFTContract.totalSupply();
      const beatPromises = [];

      // Fetch all beats
      for (let i = 0; i < totalSupply; i++) {
        try {
          const beatInfo = await beatNFTContract.getBeatInfo(i);
          const [creator, price, ipfsHash, currentOwner] = beatInfo;

          // Fetch metadata from IPFS
          let metadata = {};
          try {
            metadata = await fetchFromIPFS(ipfsHash);
          } catch (err) {
            console.warn(`Failed to fetch metadata for beat ${i}:`, err);
          }

          beatPromises.push({
            id: i,
            tokenId: i,
            name: metadata.name || `Beat #${i}`,
            producer: metadata.creator || creator,
            producerAddress: creator,
            price: ethers.formatEther(price),
            priceWei: price.toString(),
            coverImage: metadata.image ? getIPFSURL(metadata.image) : 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
            audioUrl: metadata.audio || ipfsHash,
            genre: metadata.genre || 'Unknown',
            bpm: metadata.bpm || 0,
            likes: 0, // Would need separate contract for likes
            plays: 0,
            isTrending: false,
            createdAt: new Date().toISOString(),
            ipfsHash: ipfsHash,
            currentOwner: currentOwner,
            isOwned: account && currentOwner.toLowerCase() === account.toLowerCase(),
          });
        } catch (err) {
          console.warn(`Error fetching beat ${i}:`, err);
        }
      }

      const fetchedBeats = await Promise.all(beatPromises);
      setBeats(fetchedBeats);
    } catch (err) {
      console.error('Error fetching beats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [beatNFTContract, account]);

  useEffect(() => {
    fetchBeats();
  }, [fetchBeats]);

  return { beats, loading, error, refetch: fetchBeats };
}

