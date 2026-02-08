import { useState } from 'react';
import type { Score, PlayerNames, Player } from '../types';

interface ScoreBoardProps {
  score: Score;
  playerNames: PlayerNames;
  onReset: () => void;
  onPlayerNameChange: (player: Player, name: string) => void;
}

interface EditablePlayerNameProps {
  player: Player;
  name: string;
  onNameChange: (player: Player, name: string) => void;
  className?: string;
}

function EditablePlayerName({ player, name, onNameChange, className }: EditablePlayerNameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(name);

  const handleClick = () => {
    setIsEditing(true);
    setEditValue(name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newName = editValue.trim();
    onNameChange(player, newName);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setEditValue(name);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    const newName = editValue.trim();
    onNameChange(player, newName);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className={className}>
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="scoreboard__name-input"
          autoFocus
          maxLength={20}
        />
      </form>
    );
  }

  return (
    <span 
      className={`${className} scoreboard__name-clickable`} 
      onClick={handleClick}
      title="Click to edit name"
    >
      {name}
    </span>
  );
}

export function ScoreBoard({ score, playerNames, onReset, onPlayerNameChange }: ScoreBoardProps) {
  const total = score.X + score.O + score.draws;

  return (
    <div className="scoreboard">
      <div className="scoreboard__scores">
        <div className="scoreboard__player scoreboard__player--x">
          <EditablePlayerName 
            player="X"
            name={playerNames.X}
            onNameChange={onPlayerNameChange}
            className="scoreboard__label"
          />
          <span className="scoreboard__value">{score.X}</span>
        </div>
        <div className="scoreboard__player scoreboard__player--draws">
          <span className="scoreboard__label">Draws</span>
          <span className="scoreboard__value">{score.draws}</span>
        </div>
        <div className="scoreboard__player scoreboard__player--o">
          <EditablePlayerName 
            player="O"
            name={playerNames.O}
            onNameChange={onPlayerNameChange}
            className="scoreboard__label"
          />
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