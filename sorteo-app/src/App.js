import { useState } from 'react'
import { Contract, providers } from 'ethers'
import "./App.css"

const abi = [
  'function cantSuscriptos() external view returns(uint)',
  'function suscripto(uint i) external view returns(address)',
  'function suscribirse() external'
]

function App() {
  const [sorteo, setSorteo] = useState()

  const [suscritos, setSuscritos] = useState([])

  const [tx, setTx] = useState()
  const [receipt, setReceipt] = useState()


  const login = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const signer = new providers.Web3Provider(window.ethereum).getSigner()
    const sorteo = new Contract('0x079653C904BAbaDf9eb625Ab07a8766aA75BE613', abi).connect(signer)

    setSorteo(sorteo)
  }

  const getSuscritos = async () => {
    setSuscritos([])

    const cantSuscritpos = await sorteo.cantSuscriptos()

    setSuscritos(['...'])

    for (let i = 0; i < cantSuscritpos.toNumber(); i++) {
      const suscrito = await sorteo.suscripto(i)
      setSuscritos(s => [...s, suscrito])
    }

    setSuscritos(s => s.slice(1))
  }

  const suscribirse = async () => {
    const tx = await sorteo.suscribirse()
    setTx(tx)
    setReceipt()

    const receipt = await tx.wait()
    setReceipt(receipt)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://www.rsk.co/img/rsk_logo.svg" className="App-logo" alt="logo" />
      </header>

      <button onClick={login} disabled={!!sorteo}>login</button>

      <h3>Suscritos</h3>
      <button onClick={getSuscritos} disabled={!sorteo}>obtener suscritos</button>

      {suscritos.map(s => <p key={s}>{s}</p>)}

      <h3>Suscribite!!!</h3>
      {(typeof window.ethereum === 'undefined') && <p>
        Instala Metamask y conectate a RSK siguiendo los pasos <a href="https://metamask-landing.testnet.rifos.org/" target="_blank" rel="noreferrer">aca</a><br />
        Una vez instalado y conectado recarga sta pagina
      </p>}
      <button onClick={suscribirse} disabled={!sorteo}>suscribirse!!!!</button>
      {tx && <p><a href={`https://explorer.testnet.rsk.co/tx/${tx.hash}`} target='_blank'>{tx.hash}</a></p>}
      {!receipt ? <p>Waiting for confirmation</p> : <p>confirmed! status: {receipt.status === 1 ? 'OK' : 'FAILED'}</p>}
    </div>
  );
}

export default App;
