const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BeatNFT", function () {
  let beatNFT;
  let owner, creator, buyer;
  const testIPFSHash = "QmTestHash123";
  const testPrice = ethers.parseEther("0.1"); // 0.1 ETH

  beforeEach(async function () {
    [owner, creator, buyer] = await ethers.getSigners();

    const BeatNFT = await ethers.getContractFactory("BeatNFT");
    beatNFT = await BeatNFT.deploy();
    await beatNFT.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await beatNFT.owner()).to.equal(owner.address);
    });

    it("Should have correct name and symbol", async function () {
      expect(await beatNFT.name()).to.equal("BeatNFT");
      expect(await beatNFT.symbol()).to.equal("BEAT");
    });
  });

  describe("Minting", function () {
    it("Should mint a beat NFT", async function () {
      await expect(beatNFT.connect(creator).mintBeat(testIPFSHash, testPrice))
        .to.emit(beatNFT, "BeatMinted")
        .withArgs(0, creator.address, testIPFSHash, testPrice);

      expect(await beatNFT.ownerOf(0)).to.equal(creator.address);
      expect(await beatNFT.beatPrice(0)).to.equal(testPrice);
      expect(await beatNFT.beatCreator(0)).to.equal(creator.address);
    });

    it("Should reject minting with zero price", async function () {
      await expect(
        beatNFT.connect(creator).mintBeat(testIPFSHash, 0)
      ).to.be.revertedWith("Price must be greater than 0");
    });

    it("Should reject minting with empty IPFS hash", async function () {
      await expect(
        beatNFT.connect(creator).mintBeat("", testPrice)
      ).to.be.revertedWith("IPFS hash cannot be empty");
    });

    it("Should increment token ID counter", async function () {
      await beatNFT.connect(creator).mintBeat(testIPFSHash, testPrice);
      await beatNFT.connect(creator).mintBeat("QmHash2", testPrice);
      
      expect(await beatNFT.totalSupply()).to.equal(2);
    });
  });

  describe("Purchasing", function () {
    beforeEach(async function () {
      await beatNFT.connect(creator).mintBeat(testIPFSHash, testPrice);
    });

    it("Should allow purchasing a beat", async function () {
      const initialCreatorBalance = await ethers.provider.getBalance(creator.address);
      
      await expect(
        beatNFT.connect(buyer).purchaseBeat(0, { value: testPrice })
      )
        .to.emit(beatNFT, "BeatPurchased")
        .withArgs(0, buyer.address, creator.address, testPrice);

      expect(await beatNFT.ownerOf(0)).to.equal(buyer.address);
      
      // Check creator received payment
      const finalCreatorBalance = await ethers.provider.getBalance(creator.address);
      expect(finalCreatorBalance - initialCreatorBalance).to.equal(testPrice);
    });

    it("Should reject purchase with incorrect payment", async function () {
      await expect(
        beatNFT.connect(buyer).purchaseBeat(0, { value: ethers.parseEther("0.05") })
      ).to.be.revertedWith("Incorrect payment amount");
    });

    it("Should reject purchase by current owner", async function () {
      await expect(
        beatNFT.connect(creator).purchaseBeat(0, { value: testPrice })
      ).to.be.revertedWith("You already own this beat");
    });

    it("Should reject purchase of non-existent beat", async function () {
      await expect(
        beatNFT.connect(buyer).purchaseBeat(999, { value: testPrice })
      ).to.be.revertedWith("Beat does not exist");
    });
  });

  describe("Query Functions", function () {
    beforeEach(async function () {
      await beatNFT.connect(creator).mintBeat(testIPFSHash, testPrice);
    });

    it("Should return correct beat info", async function () {
      const [creatorAddr, price, ipfsHash, currentOwner] = await beatNFT.getBeatInfo(0);
      
      expect(creatorAddr).to.equal(creator.address);
      expect(price).to.equal(testPrice);
      expect(ipfsHash).to.equal(testIPFSHash);
      expect(currentOwner).to.equal(creator.address);
    });

    it("Should check if beat exists", async function () {
      expect(await beatNFT.beatExists(0)).to.be.true;
      expect(await beatNFT.beatExists(999)).to.be.false;
    });
  });
});

