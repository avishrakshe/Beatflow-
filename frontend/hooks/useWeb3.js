import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { BEAT_NFT_ABI, MUSIC_REGISTRY_ABI, BEAT_NFT_ADDRESS, MUSIC_REGISTRY_ADDRESS } from '../utils/contracts';

export function useWeb3() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [beatNFTContract, setBeatNFTContract] = useState(null);
  const [musicRegistryContract, setMusicRegistryContract] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [chainId, setChainId] = useState(null);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = typeof window !== 'undefined' && window.ethereum;

  // Connect wallet
  const connectWallet = useCallback(async () => {
    if (!isMetaMaskInstalled) {
      alert('Please install MetaMask!');
      return;
    }

    setIsConnecting(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();

      setProvider(provider);
      setSigner(signer);
      setAccount(accounts[0]);
      setChainId(Number(network.chainId));

      // Initialize contracts
      if (BEAT_NFT_ADDRESS) {
        const beatNFT = new ethers.Contract(BEAT_NFT_ADDRESS, BEAT_NFT_ABI, signer);
        setBeatNFTContract(beatNFT);
      }

      if (MUSIC_REGISTRY_ADDRESS) {
        const musicRegistry = new ethers.Contract(MUSIC_REGISTRY_ADDRESS, MUSIC_REGISTRY_ABI, signer);
        setMusicRegistryContract(musicRegistry);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setBeatNFTContract(null);
    setMusicRegistryContract(null);
    setChainId(null);
  }, []);

  // Check connection on mount and handle account/chain changes
  useEffect(() => {
    if (!isMetaMaskInstalled) return;

    const checkConnection = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        
        if (accounts.length > 0) {
          const signer = await provider.getSigner();
          const network = await provider.getNetwork();

          setProvider(provider);
          setSigner(signer);
          setAccount(accounts[0].address);
          setChainId(Number(network.chainId));

          // Initialize contracts
          if (BEAT_NFT_ADDRESS) {
            const beatNFT = new ethers.Contract(BEAT_NFT_ADDRESS, BEAT_NFT_ABI, signer);
            setBeatNFTContract(beatNFT);
          }

          if (MUSIC_REGISTRY_ADDRESS) {
            const musicRegistry = new ethers.Contract(MUSIC_REGISTRY_ADDRESS, MUSIC_REGISTRY_ABI, signer);
            setMusicRegistryContract(musicRegistry);
          }
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    };

    checkConnection();

    // Listen for account changes
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        checkConnection();
      }
    });

    // Listen for chain changes
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, [disconnectWallet, isMetaMaskInstalled]);

  return {
    account,
    provider,
    signer,
    beatNFTContract,
    musicRegistryContract,
    isConnecting,
    chainId,
    connectWallet,
    disconnectWallet,
    isMetaMaskInstalled,
  };
}

