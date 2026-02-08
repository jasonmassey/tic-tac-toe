import type { Cell } from '../types';

interface SquareProps {
  value: Cell;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

export function Square({ value, onClick, isWinning, disabled }: SquareProps) {
  const className = [
    'square',
    value ? `square--${value.toLowerCase()}` : '',
    isWinning ? 'square--winning' : '',
    !value && !disabled ? 'square--available' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={className} onClick={onClick} disabled={disabled || !!value}>
      {value && <span className="square__mark">{value}</span>}
    </button>
  );
}
