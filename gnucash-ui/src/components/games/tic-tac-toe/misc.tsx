"use client";

import { GameState } from "./game";

export function Square({ value, onSquareClick, disabled, isWinningSquare }: any) {
  return (
    <button
      className={`square ${disabled ? "disabled" : ''} ${isWinningSquare ? "winning": ''}`}
      disabled={disabled}
      onClick={onSquareClick}
    >
      {value ?  value : <span>&nbsp;</span>}
    </button>
  );
}

export function Board({
  gameState,
  makeMove,
}: {
  gameState: GameState;
  makeMove: any;
}) {
  const {yourStatus, streak}= gameState;
  const isGameDisabled = !gameState.canStart || yourStatus != "your_move" || gameState.isDone
  let gameContent;

  if (gameState.canStart) {
    const squares = gameState.moves.map((v, index): any => {
      return (
        <Square
          key={index}
          disabled={isGameDisabled}
          value={v}
          isWinningSquare={streak && streak.includes(index)}
          onSquareClick={() => makeMove(index)}
        />
      );
    });
    gameContent = (
      <>
        {yourStatus == "your_move" ? "Waiting for your move" : null}
        {yourStatus == "their_move" ? "Waiting for opponent to move" : null}
        {yourStatus == "won" ? "You have won!! Another challenge?" : null}
        {yourStatus == "lost" ? "You lost!! Try again?" : null}
        <div className="board-row" key="0">
          {squares.slice(0, 3)}
        </div>
        <div className="board-row" key="1">
          {squares.slice(3, 6)}
        </div>
        <div className="board-row" key="2">
          {squares.slice(6)}
        </div>
      </>
    );
  } else {
    gameContent = null;
  }
  return (
    <>
      <div className="status">Your status: {yourStatus}</div>

      {gameContent}
    </>
  );
}

