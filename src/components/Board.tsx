import { Square } from './Square';
import type { Board as BoardType } from '../types';

interface BoardProps {
  board: BoardType;
  winningLine: number[] | null;
  disabled: boolean;
  onSquareClick: (index: number) => void;
}

export function Board({ board, winningLine, disabled, onSquareClick }: BoardProps) {
  const isWinning = (index: number) => winningLine?.includes(index) ?? false;

  return (
    <div className="board">
      {board.map((cell, i) => (
        <Square
          key={i}
          value={cell}
          onClick={() => onSquareClick(i)}
          isWinning={isWinning(i)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
