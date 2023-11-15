import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import React, { useState } from "react"

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  const handleSelectSquare = (rowIndex, colIndex) => {
    setActivePlayer((curentlyActivePlayer) => curentlyActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns((prevTurns) => {
      let currentPlayer = 'X';
      
      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = '0';
      }
      const updatedTurns = [{ 
        square: {row : rowIndex, col: colIndex}, 
        player: activePlayer }, 
        ...prevTurns];
        return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player isActive={activePlayer === 'X'} initialName="Player 1" symbol="X" />
          <Player isActive={activePlayer === 'O'} initialName="Player 2" symbol="O" />
        </ol>
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          turns={gameTurns}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
