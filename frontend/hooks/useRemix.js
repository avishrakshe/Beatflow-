import { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from './useWeb3';
import { uploadToIPFS, uploadMetadataToIPFS } from '../utils/ipfs';

/**
 * Hook for uploading remixes
 */
export function useRemix() {
  const { musicRegistryContract, beatNFTContract, account } = useWeb3();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState('');

  const checkOwnership = async (originalBeatNFTId) => {
    if (!beatNFTContract || !account) {
      return false;
    }

    try {
      const owner = await beatNFTContract.ownerOf(originalBeatNFTId);
      return owner.toLowerCase() === account.toLowerCase();
    } catch (err) {
      console.error('Error checking ownership:', err);
      return false;
    }
  };

  const uploadRemix = async (remixData) => {
    if (!musicRegistryContract || !account) {
      throw new Error('Please connect your wallet');
    }

    // Check ownership
    const ownsBeat = await checkOwnership(remixData.originalBeatNFTId);
    if (!ownsBeat) {
      throw new Error('You must own the original beat NFT to create a remix');
    }

    setIsUploading(true);
    setError(null);
    setProgress('');

    try {
      // Step 1: Upload audio file to IPFS
      setProgress('Uploading remix audio to IPFS...');
      const audioHash = await uploadToIPFS(remixData.audioFile);
      const audioUrl = `ipfs://${audioHash}`;

      // Step 2: Upload image to IPFS (if provided)
      let imageUrl = '';
      if (remixData.imageFile) {
        setProgress('Uploading image to IPFS...');
        const imageHash = await uploadToIPFS(remixData.imageFile);
        imageUrl = `ipfs://${imageHash}`;
      }

      // Step 3: Create metadata JSON
      setProgress('Creating remix metadata...');
      const metadata = {
        name: remixData.name,
        description: remixData.description || '',
        audio: audioUrl,
        image: imageUrl || '',
        originalBeatId: remixData.originalBeatNFTId,
        remixer: account,
        createdAt: new Date().toISOString(),
      };

      // Step 4: Upload metadata to IPFS
      setProgress('Uploading metadata to IPFS...');
      const metadataHash = await uploadMetadataToIPFS(metadata);

      // Step 5: Register remix on blockchain
      setProgress('Registering remix on blockchain...');
      const tx = await musicRegistryContract.registerRemix(
        remixData.originalBeatNFTId,
        metadataHash
      );
      const receipt = await tx.wait();

      // Extract remix ID from events
      const remixEvent = receipt.logs.find(
        (log) => log.topics[0] === ethers.id('RemixRegistered(uint256,uint256,address,string)')
      );
      const remixId = parseInt(remixEvent.topics[1], 16);

      setProgress('Complete!');
      return { success: true, remixId, txHash: tx.hash };
    } catch (err) {
      let errorMessage = 'Remix upload failed';
      
      if (err.reason) {
        errorMessage = err.reason;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsUploading(false);
      setProgress('');
    }
  };

  return { uploadRemix, checkOwnership, isUploading, error, progress };
}

