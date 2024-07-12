'use client';

export function Square({
  value,
  onSquareClick,
  disabled,
  isWinningSquare,
  style,
}: any) {
  return (
    <button
      style={style}
      disabled={disabled || value != null}
      className={`square h-100 w-100 bg-gray-200 aspect-square	 ${
        disabled ? 'disabled' : ''
      } ${isWinningSquare ? 'winning' : ''}`}
      onClick={onSquareClick}
    >
      {value ? value : <span>&nbsp;</span>}
    </button>
  );
}
