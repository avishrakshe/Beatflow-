const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MusicRegistry", function () {
  let beatNFT, musicRegistry;
  let owner, creator, buyer, remixer;
  const testIPFSHash = "QmTestHash123";
  const testPrice = ethers.parseEther("0.1");

  beforeEach(async function () {
    [owner, creator, buyer, remixer] = await ethers.getSigners();

    // Deploy BeatNFT
    const BeatNFT = await ethers.getContractFactory("BeatNFT");
    beatNFT = await BeatNFT.deploy();
    await beatNFT.waitForDeployment();
    const beatNFTAddress = await beatNFT.getAddress();

    // Deploy MusicRegistry
    const MusicRegistry = await ethers.getContractFactory("MusicRegistry");
    musicRegistry = await MusicRegistry.deploy(beatNFTAddress);
    await musicRegistry.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct BeatNFT address", async function () {
      expect(await musicRegistry.beatNFT()).to.equal(await beatNFT.getAddress());
    });

    it("Should reject invalid BeatNFT address", async function () {
      const MusicRegistry = await ethers.getContractFactory("MusicRegistry");
      await expect(
        MusicRegistry.deploy(ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid BeatNFT address");
    });
  });

  describe("Original Beat Registration", function () {
    beforeEach(async function () {
      // Mint a beat NFT
      await beatNFT.connect(creator).mintBeat(testIPFSHash, testPrice);
    });

    it("Should register an original beat", async function () {
      await expect(
        musicRegistry.connect(creator).registerOriginalBeat(0, testIPFSHash)
      )
        .to.emit(musicRegistry, "OriginalBeatRegistered")
        .withArgs(0, creator.address, testIPFSHash);

      const originalBeat = await musicRegistry.getOriginalBeat(0);
      expect(originalBeat.beatNFTId).to.equal(0);
      expect(originalBeat.creator).to.equal(creator.address);
      expect(originalBeat.exists).to.be.true;
    });

    it("Should reject registration by non-owner", async function () {
      await expect(
        musicRegistry.connect(buyer).registerOriginalBeat(0, testIPFSHash)
      ).to.be.revertedWith("You must own the beat NFT to register it");
    });

    it("Should reject registration of non-existent beat", async function () {
      await expect(
        musicRegistry.connect(creator).registerOriginalBeat(999, testIPFSHash)
      ).to.be.revertedWith("Beat NFT does not exist");
    });

    it("Should reject duplicate registration", async function () {
      await musicRegistry.connect(creator).registerOriginalBeat(0, testIPFSHash);
      
      await expect(
        musicRegistry.connect(creator).registerOriginalBeat(0, testIPFSHash)
      ).to.be.revertedWith("Beat already registered");
    });
  });

  describe("Remix Registration", function () {
    const remixIPFSHash = "QmRemixHash456";

    beforeEach(async function () {
      // Mint and register original beat
      await beatNFT.connect(creator).mintBeat(testIPFSHash, testPrice);
      await musicRegistry.connect(creator).registerOriginalBeat(0, testIPFSHash);
    });

    it("Should register a remix by beat owner", async function () {
      await expect(
        musicRegistry.connect(creator).registerRemix(0, remixIPFSHash)
      )
        .to.emit(musicRegistry, "RemixRegistered")
        .withArgs(0, 0, creator.address, remixIPFSHash);

      const remix = await musicRegistry.getRemixInfo(0);
      expect(remix.originalBeatNFTId).to.equal(0);
      expect(remix.remixer).to.equal(creator.address);
      expect(remix.exists).to.be.true;
    });

    it("Should link remix to original beat", async function () {
      await musicRegistry.connect(creator).registerRemix(0, remixIPFSHash);
      
      const remixIds = await musicRegistry.getRemixesByOriginal(0);
      expect(remixIds.length).to.equal(1);
      expect(remixIds[0]).to.equal(0);
      
      expect(await musicRegistry.remixToOriginal(0)).to.equal(0);
    });

    it("Should reject remix by non-owner", async function () {
      await expect(
        musicRegistry.connect(buyer).registerRemix(0, remixIPFSHash)
      ).to.be.revertedWith("You must own the original beat NFT to create a remix");
    });

    it("Should allow multiple remixes for same beat", async function () {
      await musicRegistry.connect(creator).registerRemix(0, remixIPFSHash);
      await musicRegistry.connect(creator).registerRemix(0, "QmRemixHash789");
      
      const remixIds = await musicRegistry.getRemixesByOriginal(0);
      expect(remixIds.length).to.equal(2);
    });

    it("Should handle remix after beat purchase", async function () {
      // Creator sells beat to buyer
      await beatNFT.connect(buyer).purchaseBeat(0, { value: testPrice });
      
      // Buyer can now create remix
      await expect(
        musicRegistry.connect(buyer).registerRemix(0, remixIPFSHash)
      )
        .to.emit(musicRegistry, "RemixRegistered")
        .withArgs(0, 0, buyer.address, remixIPFSHash);

      // Creator can no longer create remix
      await expect(
        musicRegistry.connect(creator).registerRemix(0, remixIPFSHash)
      ).to.be.revertedWith("You must own the original beat NFT to create a remix");
    });
  });

  describe("Query Functions", function () {
    beforeEach(async function () {
      await beatNFT.connect(creator).mintBeat(testIPFSHash, testPrice);
      await musicRegistry.connect(creator).registerOriginalBeat(0, testIPFSHash);
      await musicRegistry.connect(creator).registerRemix(0, "QmRemix1");
      await musicRegistry.connect(creator).registerRemix(0, "QmRemix2");
    });

    it("Should return correct remix info", async function () {
      const remix = await musicRegistry.getRemixInfo(0);
      expect(remix.originalBeatNFTId).to.equal(0);
      expect(remix.remixer).to.equal(creator.address);
    });

    it("Should return all remixes for original beat", async function () {
      const remixIds = await musicRegistry.getRemixesByOriginal(0);
      expect(remixIds.length).to.equal(2);
      expect(remixIds[0]).to.equal(0);
      expect(remixIds[1]).to.equal(1);
    });

    it("Should check ownership correctly", async function () {
      expect(await musicRegistry.ownsOriginalBeat(0, creator.address)).to.be.true;
      expect(await musicRegistry.ownsOriginalBeat(0, buyer.address)).to.be.false;
    });

    it("Should return total remix count", async function () {
      expect(await musicRegistry.totalRemixes()).to.equal(2);
    });
  });
});

