import type { GameState } from '../types';

interface MoveHistoryProps {
  history: GameState[];
}

export function MoveHistory({ history }: MoveHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="history">
      <h3 className="history__title">Game History</h3>
      <ul className="history__list">
        {history.map((game, i) => (
          <li key={i} className="history__item">
            <span className="history__game-number">Game {i + 1}</span>
            <span className={`history__result history__result--${game.status}`}>
              {game.status === 'won' ? `${game.winner} won` : 'Draw'}
            </span>
            <span className="history__moves">{game.moveCount} moves</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
