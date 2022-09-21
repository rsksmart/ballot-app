import { ethers } from "hardhat";

async function main() {
  const Sorteo = await ethers.getContractFactory("Sorteo");
  const sorteo = await Sorteo.attach('0x079653C904BAbaDf9eb625Ab07a8766aA75BE613')

  const cantSuscritpos = await sorteo.cantSuscriptos()

  console.log('address', sorteo.address)

  console.log('cantidad de suscriptos', cantSuscritpos.toNumber())

  for (let i = 0; i < cantSuscritpos.toNumber(); i++) {
    console.log(`suscripto ${i}`, await sorteo.suscripto(i))
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
