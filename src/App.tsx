import { Board } from './components/Board';
import { StatusBar } from './components/StatusBar';
import { ScoreBoard } from './components/ScoreBoard';
import { MoveHistory } from './components/MoveHistory';
import { useGame } from './hooks/useGame';

export default function App() {
  const { game, score, history, play, reset, resetAll } = useGame();
  const gameOver = game.status !== 'playing';

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Tic Tac Toe</h1>
      </header>

      <main className="app__main">
        <ScoreBoard score={score} onReset={resetAll} />
        <StatusBar game={game} />
        <Board
          board={game.board}
          winningLine={game.winningLine}
          disabled={gameOver}
          onSquareClick={play}
        />
        {gameOver && (
          <button className="app__play-again" onClick={reset}>
            Play Again
          </button>
        )}
      </main>

      <aside className="app__sidebar">
        <MoveHistory history={history} />
      </aside>
    </div>
  );
}
