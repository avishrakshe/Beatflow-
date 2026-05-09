import { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from './useWeb3';
import { uploadToIPFS, uploadMetadataToIPFS } from '../utils/ipfs';

/**
 * Hook for minting new beats
 */
export function useBeatMint() {
  const { beatNFTContract, musicRegistryContract, account } = useWeb3();
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState('');

  const mintBeat = async (beatData) => {
    if (!beatNFTContract || !account) {
      throw new Error('Please connect your wallet');
    }

    setIsMinting(true);
    setError(null);
    setProgress('');

    try {
      // Step 1: Upload audio file to IPFS
      setProgress('Uploading audio to IPFS...');
      const audioHash = await uploadToIPFS(beatData.audioFile);
      const audioUrl = `ipfs://${audioHash}`;

      // Step 2: Upload image to IPFS (if provided)
      let imageUrl = '';
      if (beatData.imageFile) {
        setProgress('Uploading image to IPFS...');
        const imageHash = await uploadToIPFS(beatData.imageFile);
        imageUrl = `ipfs://${imageHash}`;
      }

      // Step 3: Create metadata JSON
      setProgress('Creating metadata...');
      const metadata = {
        name: beatData.name,
        description: beatData.description || '',
        audio: audioUrl,
        image: imageUrl || beatData.coverImage || '',
        genre: beatData.genre || 'Unknown',
        bpm: beatData.bpm || 0,
        creator: account,
        createdAt: new Date().toISOString(),
      };

      // Step 4: Upload metadata to IPFS
      setProgress('Uploading metadata to IPFS...');
      const metadataHash = await uploadMetadataToIPFS(metadata);
      const ipfsHash = `ipfs://${metadataHash}`;

      // Step 5: Mint NFT
      setProgress('Minting NFT on blockchain...');
      const priceWei = ethers.parseEther(beatData.price.toString());
      const mintTx = await beatNFTContract.mintBeat(metadataHash, priceWei);
      const mintReceipt = await mintTx.wait();

      // Extract token ID from events
      const mintEvent = mintReceipt.logs.find(
        (log) => log.topics[0] === ethers.id('BeatMinted(uint256,address,string,uint256)')
      );
      const tokenId = parseInt(mintEvent.topics[1], 16);

      // Step 6: Register in MusicRegistry (if contract available)
      if (musicRegistryContract) {
        setProgress('Registering beat in registry...');
        try {
          await musicRegistryContract.registerOriginalBeat(tokenId, metadataHash);
        } catch (err) {
          console.warn('Failed to register in MusicRegistry:', err);
          // Continue even if registration fails
        }
      }

      setProgress('Complete!');
      return { success: true, tokenId, txHash: mintTx.hash };
    } catch (err) {
      let errorMessage = 'Minting failed';
      
      if (err.reason) {
        errorMessage = err.reason;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsMinting(false);
      setProgress('');
    }
  };

  return { mintBeat, isMinting, error, progress };
}

