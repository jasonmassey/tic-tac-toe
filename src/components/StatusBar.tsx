import type { GameState, PlayerNames } from '../types';

interface StatusBarProps {
  game: GameState;
  playerNames: PlayerNames;
}

export function StatusBar({ game, playerNames }: StatusBarProps) {
  let message: string;
  let className = 'status-bar';

  switch (game.status) {
    case 'won':
      message = `${playerNames[game.winner!]} wins!`;
      className += ' status-bar--won';
      break;
    case 'draw':
      message = "It's a draw!";
      className += ' status-bar--draw';
      break;
    default:
      message = `${playerNames[game.currentPlayer]}'s turn`;
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