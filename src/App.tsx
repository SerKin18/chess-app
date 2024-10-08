import React, { useEffect, useState } from "react";

import "./App.css";
import BoardComponent from "./components/BoardComponent";
import { Colors } from "./models/Colors";
import { Board } from "./models/Board";
import { Player } from "./models/Player";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";
function App() {
  const [board, setBoard] = useState(new Board());
  const whitePlayer = new Player(Colors.WHITE);
  const blackPlayer = new Player(Colors.BLACK);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }
  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }

  return (
    <div className="app">
      <Timer currentPlayer={currentPlayer} restart={restart} />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />

      <div>
        <LostFigures title="Player WHITE " figures={board.lostBlackFigures} />
        <LostFigures title="Player BLACK" figures={board.lostWhiteFigures} />
      </div>
    </div>
  );
}

export default App;
