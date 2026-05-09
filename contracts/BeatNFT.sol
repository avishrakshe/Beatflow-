// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title BeatNFT
 * @dev ERC721 NFT contract for minting and trading beat licenses
 * 
 * Features:
 * - Mint beats as NFTs with IPFS metadata
 * - Set fixed ETH price per beat
 * - Purchase beats (transfer NFT + send ETH to creator)
 * - Query beat information
 */
contract BeatNFT is ERC721URIStorage, Ownable, ReentrancyGuard {
    // Token ID counter
    uint256 private _tokenIdCounter;
    
    // Mapping from token ID to beat price (in wei)
    mapping(uint256 => uint256) public beatPrice;
    
    // Mapping from token ID to creator address
    mapping(uint256 => address) public beatCreator;
    
    // Mapping from token ID to IPFS metadata hash
    mapping(uint256 => string) public beatMetadata;
    
    // Events
    event BeatMinted(
        uint256 indexed tokenId,
        address indexed creator,
        string ipfsHash,
        uint256 price
    );
    
    event BeatPurchased(
        uint256 indexed tokenId,
        address indexed buyer,
        address indexed creator,
        uint256 price
    );
    
    /**
     * @dev Constructor sets the contract deployer as the initial owner
     */
    constructor() ERC721("BeatNFT", "BEAT") Ownable(msg.sender) {}
    
    /**
     * @dev Mint a new beat NFT
     * @param ipfsHash IPFS hash of the beat metadata JSON
     * @param price Price in wei (must be > 0)
     * @return tokenId The newly minted token ID
     */
    function mintBeat(
        string memory ipfsHash,
        uint256 price
    ) public returns (uint256) {
        require(price > 0, "Price must be greater than 0");
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        // Mint NFT to creator
        _safeMint(msg.sender, tokenId);
        
        // Set token URI (IPFS hash)
        _setTokenURI(tokenId, ipfsHash);
        
        // Store beat information
        beatPrice[tokenId] = price;
        beatCreator[tokenId] = msg.sender;
        beatMetadata[tokenId] = ipfsHash;
        
        emit BeatMinted(tokenId, msg.sender, ipfsHash, price);
        
        return tokenId;
    }
    
    /**
     * @dev Purchase a beat NFT
     * @param tokenId The token ID of the beat to purchase
     * 
     * Requirements:
     * - Beat must exist
     * - Caller must not be the current owner
     * - Caller must send exact price in ETH
     */
    function purchaseBeat(uint256 tokenId) public payable nonReentrant {
        require(_ownerOf(tokenId) != address(0), "Beat does not exist");
        require(ownerOf(tokenId) != msg.sender, "You already own this beat");
        require(msg.value == beatPrice[tokenId], "Incorrect payment amount");
        
        address seller = ownerOf(tokenId);
        address creator = beatCreator[tokenId];
        uint256 price = beatPrice[tokenId];
        
        // Transfer NFT to buyer
        _transfer(seller, msg.sender, tokenId);
        
        // Send payment to creator (original artist gets the payment)
        (bool sent, ) = creator.call{value: price}("");
        require(sent, "Failed to send payment to creator");
        
        emit BeatPurchased(tokenId, msg.sender, creator, price);
    }
    
    /**
     * @dev Get complete beat information
     * @param tokenId The token ID to query
     * @return creator The creator's address
     * @return price The beat price in wei
     * @return ipfsHash The IPFS metadata hash
     * @return currentOwner The current NFT owner
     */
    function getBeatInfo(uint256 tokenId) public view returns (
        address creator,
        uint256 price,
        string memory ipfsHash,
        address currentOwner
    ) {
        require(_ownerOf(tokenId) != address(0), "Beat does not exist");
        
        return (
            beatCreator[tokenId],
            beatPrice[tokenId],
            beatMetadata[tokenId],
            ownerOf(tokenId)
        );
    }
    
    /**
     * @dev Get total number of beats minted
     * @return The total supply
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }
    
    /**
     * @dev Check if a beat exists
     * @param tokenId The token ID to check
     * @return True if beat exists
     */
    function beatExists(uint256 tokenId) public view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
}

