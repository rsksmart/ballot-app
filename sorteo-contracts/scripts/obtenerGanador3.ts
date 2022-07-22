import { ethers } from "hardhat";

async function main() {
  const i = 2

  console.log(`el ganador ${i} es...`)
  const Sorteo = await ethers.getContractFactory("Sorteo");
  const sorteo = await Sorteo.attach('0x079653C904BAbaDf9eb625Ab07a8766aA75BE613')

  const ganadores = await sorteo.obtenerGanadores()

  console.log(ganadores[i])
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
