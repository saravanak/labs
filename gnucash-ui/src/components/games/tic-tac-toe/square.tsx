"use client";

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


