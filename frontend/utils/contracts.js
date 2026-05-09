// Contract ABIs and addresses
// These will be populated after deployment

export const BEAT_NFT_ABI = [
  "function mintBeat(string memory ipfsHash, uint256 price) public returns (uint256)",
  "function purchaseBeat(uint256 tokenId) public payable",
  "function getBeatInfo(uint256 tokenId) public view returns (address creator, uint256 price, string memory ipfsHash, address currentOwner)",
  "function totalSupply() public view returns (uint256)",
  "function beatExists(uint256 tokenId) public view returns (bool)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "event BeatMinted(uint256 indexed tokenId, address indexed creator, string ipfsHash, uint256 price)",
  "event BeatPurchased(uint256 indexed tokenId, address indexed buyer, address indexed creator, uint256 price)",
];

export const MUSIC_REGISTRY_ABI = [
  "function registerOriginalBeat(uint256 beatNFTId, string memory ipfsHash) public",
  "function registerRemix(uint256 originalBeatNFTId, string memory ipfsHash) public returns (uint256)",
  "function getRemixInfo(uint256 remixId) public view returns (tuple(uint256 remixId, uint256 originalBeatNFTId, address remixer, string ipfsHash, uint256 createdAt, bool exists))",
  "function getRemixesByOriginal(uint256 originalBeatNFTId) public view returns (uint256[] memory)",
  "function getOriginalBeat(uint256 beatNFTId) public view returns (tuple(uint256 beatNFTId, address creator, string ipfsHash, uint256 createdAt, bool exists))",
  "function ownsOriginalBeat(uint256 originalBeatNFTId, address user) public view returns (bool)",
  "function totalRemixes() public view returns (uint256)",
  "event OriginalBeatRegistered(uint256 indexed beatNFTId, address indexed creator, string ipfsHash)",
  "event RemixRegistered(uint256 indexed remixId, uint256 indexed originalBeatNFTId, address indexed remixer, string ipfsHash)",
];

// Contract addresses - Update these after deployment
export const BEAT_NFT_ADDRESS = process.env.NEXT_PUBLIC_BEAT_NFT_ADDRESS || "";
export const MUSIC_REGISTRY_ADDRESS = process.env.NEXT_PUBLIC_MUSIC_REGISTRY_ADDRESS || "";

export const IPFS_GATEWAY = process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://ipfs.io/ipfs/";

