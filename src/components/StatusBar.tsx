import type { GameState } from '../types';

interface StatusBarProps {
  game: GameState;
}

export function StatusBar({ game }: StatusBarProps) {
  let message: string;
  let className = 'status-bar';

  switch (game.status) {
    case 'won':
      message = `Player ${game.winner} wins!`;
      className += ' status-bar--won';
      break;
    case 'draw':
      message = "It's a draw!";
      className += ' status-bar--draw';
      break;
    default:
      message = `Player ${game.currentPlayer}'s turn`;
      break;
  }

  return (
    <div className={className}>
      <span className="status-bar__message">{message}</span>
      {game.status === 'playing' && (
        <span className={`status-bar__indicator status-bar__indicator--${game.currentPlayer.toLowerCase()}`}>
          {game.currentPlayer}
        </span>
      )}
    </div>
  );
}
