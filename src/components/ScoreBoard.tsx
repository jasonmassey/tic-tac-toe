import type { Score } from '../types';

interface ScoreBoardProps {
  score: Score;
  onReset: () => void;
}

export function ScoreBoard({ score, onReset }: ScoreBoardProps) {
  const total = score.X + score.O + score.draws;

  return (
    <div className="scoreboard">
      <div className="scoreboard__scores">
        <div className="scoreboard__player scoreboard__player--x">
          <span className="scoreboard__label">X</span>
          <span className="scoreboard__value">{score.X}</span>
        </div>
        <div className="scoreboard__player scoreboard__player--draws">
          <span className="scoreboard__label">Draws</span>
          <span className="scoreboard__value">{score.draws}</span>
        </div>
        <div className="scoreboard__player scoreboard__player--o">
          <span className="scoreboard__label">O</span>
          <span className="scoreboard__value">{score.O}</span>
        </div>
      </div>
      {total > 0 && (
        <button className="scoreboard__reset" onClick={onReset}>
          Reset Scores
        </button>
      )}
    </div>
  );
}
