// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Sorteo {
  mapping(address=>bool) estaSuscripto;
  address[] suscriptos;
  address[] ganadores;

  function suscripto(uint i) external view returns(address) {
    return suscriptos[i];
  }

  function cantSuscriptos() external view returns(uint) {
    return suscriptos.length;
  }

  function suscribirse() external {
    require(!estaSuscripto[msg.sender]);
    suscriptos.push(msg.sender);
    estaSuscripto[msg.sender] = true;
  }

  function sortear(uint salt, uint winnersAmount) external {
    ganadores = new address[](winnersAmount);

    address[] memory restantes = suscriptos;
    uint randomInt = uint(keccak256(abi.encodePacked(blockhash(block.number - 1), salt)));

    for (uint256 i = 0; i < winnersAmount; i++) {
      uint winner = randomInt % restantes.length;

      ganadores[i] = restantes[winner];

      address[] memory nuevosRestantes = new address[](restantes.length - 1);
      uint k = 0;

      for (uint256 j = 0; j < restantes.length; j++) {
        if (j != winner) {
          nuevosRestantes[k] = restantes[j];
          k++;
        }
      }

      restantes = nuevosRestantes;
    }
  }

  function obtenerGanadores() public view returns(address[] memory) {
    return ganadores;
  }
}
