import { useState } from 'react'
import { Contract, providers } from 'ethers'
import "./App.css"

function App() {
  const [tx, setTx] = useState()
  const [receipt, setReceipt] = useState()

  const suscribirse = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const signer = new providers.Web3Provider(window.ethereum).getSigner()
    const sorteo = new Contract('0x079653C904BAbaDf9eb625Ab07a8766aA75BE613', ['function suscribirse() external']).connect(signer)

    const tx = await sorteo.suscribirse()
    setTx(tx)

    const receipt = await tx.wait()
    setReceipt(receipt)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://www.rsk.co/img/rsk_logo.svg" className="App-logo" alt="logo" />
      </header>
      <h3>Suscribite!!!</h3>
      {(typeof window.ethereum === 'undefined') && <p>
        Instala Metamask y conectate a RSK siguiendo los pasos <a href="https://metamask-landing.testnet.rifos.org/" target="_blank" rel="noreferrer">aca</a><br />
        Una vez instalado y conectado recarga sta pagina
      </p>}
      <button onClick={suscribirse}>suscribirse!!!!</button>
      {tx && tx.hash}
      {receipt && receipt.status}
    </div>
  );
}

export default App;
