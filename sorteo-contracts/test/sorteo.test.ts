import { expect } from "chai";
import { ethers } from "hardhat";

const deploySorteo = async () => {
  const Sorteo = await ethers.getContractFactory("Sorteo");
  const sorteo = await Sorteo.deploy();
  await sorteo.deployed()

  return { sorteo }
}
describe("Sorteo", function () {
  it('suscribirse', async () => {
    const { sorteo } = await deploySorteo()

    const [alice, bob, charlie] = await ethers.getSigners()

    await sorteo.connect(alice).suscribirse().then(tx => tx.wait())
    await sorteo.connect(bob).suscribirse().then(tx => tx.wait())
    await sorteo.connect(charlie).suscribirse().then(tx => tx.wait())

    expect(await sorteo.suscripto(0)).eq(alice.address)
    expect(await sorteo.suscripto(1)).eq(bob.address)
    expect(await sorteo.suscripto(2)).eq(charlie.address)

    expect(await sorteo.cantSuscriptos()).eq(3)
  })

  it('hacer sorteo', async () => {
    const { sorteo } = await deploySorteo()

    const signers = await ethers.getSigners().then(s => s.slice(0, 10))

    for (const signer of signers) {
      await sorteo.connect(signer).suscribirse().then(tx => tx.wait())
    }

    await sorteo.sortear(10).then(tx => tx.wait)


    const ganadores = await sorteo.obtenerGanadores()

    const ganadoresSet = new Set()
    for (const ganador of ganadores) ganadoresSet.add(ganador)

    expect(ganadoresSet.size).eq(3)
  })

  it('no suscribirse doble', async () => {
    const { sorteo } = await deploySorteo()

    const [alice] = await ethers.getSigners()

    await sorteo.connect(alice).suscribirse().then(tx => tx.wait())

    await expect(sorteo.connect(alice).suscribirse()).rejected
  })
});
