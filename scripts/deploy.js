const hre = require("hardhat");

async function main() {
  console.log("Deploying contracts...");

  // Deploy BeatNFT
  const BeatNFT = await hre.ethers.getContractFactory("BeatNFT");
  const beatNFT = await BeatNFT.deploy();
  await beatNFT.waitForDeployment();
  const beatNFTAddress = await beatNFT.getAddress();
  console.log("BeatNFT deployed to:", beatNFTAddress);

  // Deploy MusicRegistry
  const MusicRegistry = await hre.ethers.getContractFactory("MusicRegistry");
  const musicRegistry = await MusicRegistry.deploy(beatNFTAddress);
  await musicRegistry.waitForDeployment();
  const musicRegistryAddress = await musicRegistry.getAddress();
  console.log("MusicRegistry deployed to:", musicRegistryAddress);

  console.log("\n=== Deployment Summary ===");
  console.log("BeatNFT:", beatNFTAddress);
  console.log("MusicRegistry:", musicRegistryAddress);
  console.log("\nSave these addresses for frontend configuration!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

