let ipfsClientPromise;

async function getIpfsClient() {
  if (!ipfsClientPromise) {
    ipfsClientPromise = (async () => {
      // Dynamic import prevents SSR from resolving node-specific ipfs internals.
      const { create } = await import('ipfs-http-client');
      return create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
      });
    })();
  }
  return ipfsClientPromise;
}

/**
 * Upload file to IPFS
 * @param {File} file - File to upload
 * @returns {Promise<string>} IPFS hash
 */
export async function uploadToIPFS(file) {
  try {
    const ipfs = await getIpfsClient();
    const result = await ipfs.add(file);
    return result.path;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
}

/**
 * Upload JSON metadata to IPFS
 * @param {Object} metadata - Metadata object
 * @returns {Promise<string>} IPFS hash
 */
export async function uploadMetadataToIPFS(metadata) {
  try {
    const ipfs = await getIpfsClient();
    const jsonString = JSON.stringify(metadata);
    const result = await ipfs.add(jsonString);
    return result.path;
  } catch (error) {
    console.error('Error uploading metadata to IPFS:', error);
    throw error;
  }
}

/**
 * Get IPFS URL from hash
 * @param {string} hash - IPFS hash
 * @returns {string} Full IPFS URL
 */
export function getIPFSURL(hash) {
  if (!hash) return '';
  // Remove ipfs:// prefix if present
  const cleanHash = hash.replace('ipfs://', '');
  return `${process.env.NEXT_PUBLIC_IPFS_GATEWAY || 'https://ipfs.io/ipfs/'}${cleanHash}`;
}

/**
 * Fetch JSON from IPFS
 * @param {string} hash - IPFS hash
 * @returns {Promise<Object>} Parsed JSON object
 */
export async function fetchFromIPFS(hash) {
  try {
    const url = getIPFSURL(hash);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch from IPFS: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching from IPFS:', error);
    throw error;
  }
}

