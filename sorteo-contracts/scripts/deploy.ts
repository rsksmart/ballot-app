import { ethers } from "hardhat";

async function main() {
  const Sorteo = await ethers.getContractFactory("Sorteo");
  const sorteo = await Sorteo.deploy();
  console.log('address', sorteo.address)
  console.log('deployTx', sorteo.deployTransaction.hash)
  await sorteo.deployed();

  console.log('success');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
