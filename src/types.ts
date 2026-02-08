export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];
export type GameStatus = 'playing' | 'won' | 'draw';

export interface PlayerNames {
  X: string;
  O: string;
}

export interface GameState {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  winner: Player | null;
  winningLine: number[] | null;
  moveCount: number;
}

export interface Score {
  X: number;
  O: number;
  draws: number;
}