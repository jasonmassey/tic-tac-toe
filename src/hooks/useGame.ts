import { useState, useCallback } from 'react';
import { createEmptyBoard, checkWinner, isDraw, makeMove } from '../game-logic';
import type { GameState, Player, Score, PlayerNames } from '../types';

function createInitialState(startingPlayer: Player = 'X'): GameState {
  return {
    board: createEmptyBoard(),
    currentPlayer: startingPlayer,
    status: 'playing',
    winner: null,
    winningLine: null,
    moveCount: 0,
  };
}

export function useGame() {
  const [game, setGame] = useState<GameState>(createInitialState());
  const [score, setScore] = useState<Score>({ X: 0, O: 0, draws: 0 });
  const [history, setHistory] = useState<GameState[]>([]);
  const [playerNames, setPlayerNames] = useState<PlayerNames>({ X: 'Player X', O: 'Player O' });

  const updatePlayerName = useCallback((player: Player, name: string) => {
    setPlayerNames(prev => ({ ...prev, [player]: name.trim() || `Player ${player}` }));
  }, []);

  const play = useCallback((index: number) => {
    setGame((prev) => {
      if (prev.status !== 'playing' || prev.board[index] !== null) return prev;

      const newBoard = makeMove(prev.board, index, prev.currentPlayer);
      const result = checkWinner(newBoard);

      if (result) {
        setScore((s) => ({ ...s, [result.winner]: s[result.winner] + 1 }));
        const newState: GameState = {
          board: newBoard,
          currentPlayer: prev.currentPlayer,
          status: 'won',
          winner: result.winner,
          winningLine: result.line,
          moveCount: prev.moveCount + 1,
        };
        setHistory((h) => [...h, newState]);
        return newState;
      }

      if (isDraw(newBoard)) {
        setScore((s) => ({ ...s, draws: s.draws + 1 }));
        const newState: GameState = {
          board: newBoard,
          currentPlayer: prev.currentPlayer,
          status: 'draw',
          winner: null,
          winningLine: null,
          moveCount: prev.moveCount + 1,
        };
        setHistory((h) => [...h, newState]);
        return newState;
      }

      return {
        board: newBoard,
        currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
        status: 'playing',
        winner: null,
        winningLine: null,
        moveCount: prev.moveCount + 1,
      };
    });
  }, []);

  const reset = useCallback(() => {
    setGame((prev) => {
      // Alternate who goes first each game
      const nextStarter: Player = prev.currentPlayer === 'X' ? 'O' : 'X';
      return createInitialState(nextStarter);
    });
  }, []);

  const resetAll = useCallback(() => {
    setGame(createInitialState());
    setScore({ X: 0, O: 0, draws: 0 });
    setHistory([]);
  }, []);

  return { game, score, history, playerNames, play, reset, resetAll, updatePlayerName };
}