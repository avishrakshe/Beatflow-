// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BeatNFT.sol";

/**
 * @title MusicRegistry
 * @dev Registry for original beats and remixes with ownership enforcement
 * 
 * Features:
 * - Register original beats (linked to BeatNFT)
 * - Register remixes (only if caller owns the original beat NFT)
 * - Map remixId -> originalBeatId
 * - Query remix relationships
 */
contract MusicRegistry {
    // Reference to BeatNFT contract
    BeatNFT public beatNFT;
    
    // Remix ID counter
    uint256 private _remixCounter;
    
    // Struct for original beat registration
    struct OriginalBeat {
        uint256 beatNFTId;
        address creator;
        string ipfsHash;
        uint256 createdAt;
        bool exists;
    }
    
    // Struct for remix registration
    struct Remix {
        uint256 remixId;
        uint256 originalBeatNFTId;
        address remixer;
        string ipfsHash;
        uint256 createdAt;
        bool exists;
    }
    
    // Mapping from beat NFT ID to original beat info
    mapping(uint256 => OriginalBeat) public originalBeats;
    
    // Mapping from remix ID to remix info
    mapping(uint256 => Remix) public remixes;
    
    // Mapping from original beat NFT ID to array of remix IDs
    mapping(uint256 => uint256[]) public remixesByOriginal;
    
    // Mapping from remix ID to original beat NFT ID
    mapping(uint256 => uint256) public remixToOriginal;
    
    // Events
    event OriginalBeatRegistered(
        uint256 indexed beatNFTId,
        address indexed creator,
        string ipfsHash
    );
    
    event RemixRegistered(
        uint256 indexed remixId,
        uint256 indexed originalBeatNFTId,
        address indexed remixer,
        string ipfsHash
    );
    
    /**
     * @dev Constructor sets the BeatNFT contract address
     * @param _beatNFTAddress Address of the deployed BeatNFT contract
     */
    constructor(address _beatNFTAddress) {
        require(_beatNFTAddress != address(0), "Invalid BeatNFT address");
        beatNFT = BeatNFT(_beatNFTAddress);
    }
    
    /**
     * @dev Register an original beat in the registry
     * @param beatNFTId The token ID from BeatNFT contract
     * @param ipfsHash IPFS hash of the beat metadata JSON
     * 
     * Requirements:
     * - Beat NFT must exist
     * - Caller must own the beat NFT
     * - Beat must not already be registered
     */
    function registerOriginalBeat(
        uint256 beatNFTId,
        string memory ipfsHash
    ) public {
        require(beatNFT.beatExists(beatNFTId), "Beat NFT does not exist");
        require(
            beatNFT.ownerOf(beatNFTId) == msg.sender,
            "You must own the beat NFT to register it"
        );
        require(
            !originalBeats[beatNFTId].exists,
            "Beat already registered"
        );
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");
        
        originalBeats[beatNFTId] = OriginalBeat({
            beatNFTId: beatNFTId,
            creator: msg.sender,
            ipfsHash: ipfsHash,
            createdAt: block.timestamp,
            exists: true
        });
        
        emit OriginalBeatRegistered(beatNFTId, msg.sender, ipfsHash);
    }
    
    /**
     * @dev Register a remix for an original beat
     * @param originalBeatNFTId The token ID of the original beat
     * @param ipfsHash IPFS hash of the remix metadata JSON
     * @return remixId The newly created remix ID
     * 
     * Requirements:
     * - Original beat must exist and be registered
     * - Caller must own the original beat NFT
     * - IPFS hash must not be empty
     */
    function registerRemix(
        uint256 originalBeatNFTId,
        string memory ipfsHash
    ) public returns (uint256) {
        require(
            originalBeats[originalBeatNFTId].exists,
            "Original beat not registered"
        );
        require(
            beatNFT.ownerOf(originalBeatNFTId) == msg.sender,
            "You must own the original beat NFT to create a remix"
        );
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");
        
        uint256 remixId = _remixCounter;
        _remixCounter++;
        
        remixes[remixId] = Remix({
            remixId: remixId,
            originalBeatNFTId: originalBeatNFTId,
            remixer: msg.sender,
            ipfsHash: ipfsHash,
            createdAt: block.timestamp,
            exists: true
        });
        
        // Link remix to original
        remixToOriginal[remixId] = originalBeatNFTId;
        remixesByOriginal[originalBeatNFTId].push(remixId);
        
        emit RemixRegistered(remixId, originalBeatNFTId, msg.sender, ipfsHash);
        
        return remixId;
    }
    
    /**
     * @dev Get remix information
     * @param remixId The remix ID to query
     * @return remix The remix struct
     */
    function getRemixInfo(uint256 remixId) public view returns (Remix memory) {
        require(remixes[remixId].exists, "Remix does not exist");
        return remixes[remixId];
    }
    
    /**
     * @dev Get all remix IDs for an original beat
     * @param originalBeatNFTId The original beat NFT ID
     * @return Array of remix IDs
     */
    function getRemixesByOriginal(
        uint256 originalBeatNFTId
    ) public view returns (uint256[] memory) {
        return remixesByOriginal[originalBeatNFTId];
    }
    
    /**
     * @dev Get original beat information
     * @param beatNFTId The beat NFT ID
     * @return The original beat struct
     */
    function getOriginalBeat(
        uint256 beatNFTId
    ) public view returns (OriginalBeat memory) {
        require(originalBeats[beatNFTId].exists, "Original beat not registered");
        return originalBeats[beatNFTId];
    }
    
    /**
     * @dev Get total number of remixes
     * @return The total remix count
     */
    function totalRemixes() public view returns (uint256) {
        return _remixCounter;
    }
    
    /**
     * @dev Check if user owns the original beat (for frontend validation)
     * @param originalBeatNFTId The original beat NFT ID
     * @param user The user address to check
     * @return True if user owns the beat
     */
    function ownsOriginalBeat(
        uint256 originalBeatNFTId,
        address user
    ) public view returns (bool) {
        if (!beatNFT.beatExists(originalBeatNFTId)) {
            return false;
        }
        return beatNFT.ownerOf(originalBeatNFTId) == user;
    }
}

