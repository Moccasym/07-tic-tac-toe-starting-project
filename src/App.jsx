import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./components/winning-combinations";

import React, { useState } from "react"


const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

// initial empty game Board
const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
]

//helper function outside of component function
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
      
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return (currentPlayer);
}



const deriveWinner = (gameBoard, players) => {
  let winner;

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol];
  }}
return winner;
}

const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
      const { square, player} = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState({PLAYERS});
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      
      const updatedTurns = [{ 
        square: {row : rowIndex, col: colIndex}, 
        player: activePlayer }, 
        ...prevTurns];
        return updatedTurns;
    });
  }

    const handleRestart = () => {
      setGameTurns([]);
    }

    const handlePlayerNameChange = (symbol, newName) => {
      setPlayers(prevPlayers => {
        return{
          ...prevPlayers,
          [symbol] : newName
        };
      });
    }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player isActive={activePlayer === 'X'} initialName={PLAYERS.X} symbol="X" onChangeName={handlePlayerNameChange}/>
          <Player isActive={activePlayer === 'O'} initialName={PLAYERS.O} symbol="O" onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App;
