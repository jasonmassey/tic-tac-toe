import { describe, it, expect } from 'vitest';
import {
  createEmptyBoard,
  checkWinner,
  isDraw,
  makeMove,
} from '../game-logic';
import type { Board } from '../types';

describe('createEmptyBoard', () => {
  it('returns a 9-cell board of nulls', () => {
    const board = createEmptyBoard();
    expect(board).toHaveLength(9);
    expect(board.every((c) => c === null)).toBe(true);
  });
});

describe('checkWinner', () => {
  it('returns null for an empty board', () => {
    expect(checkWinner(createEmptyBoard())).toBeNull();
  });

  it('detects a row win', () => {
    const board: Board = ['X', 'X', 'X', null, 'O', 'O', null, null, null];
    const result = checkWinner(board);
    expect(result).toEqual({ winner: 'X', line: [0, 1, 2] });
  });

  it('detects a column win', () => {
    const board: Board = ['O', 'X', null, 'O', 'X', null, 'O', null, null];
    const result = checkWinner(board);
    expect(result).toEqual({ winner: 'O', line: [0, 3, 6] });
  });

  it('detects a diagonal win', () => {
    const board: Board = ['X', 'O', null, null, 'X', 'O', null, null, 'X'];
    const result = checkWinner(board);
    expect(result).toEqual({ winner: 'X', line: [0, 4, 8] });
  });

  it('detects anti-diagonal win', () => {
    const board: Board = [null, null, 'O', null, 'O', null, 'O', 'X', 'X'];
    const result = checkWinner(board);
    expect(result).toEqual({ winner: 'O', line: [2, 4, 6] });
  });

  it('returns null when no winner yet', () => {
    const board: Board = ['X', 'O', 'X', null, null, null, null, null, null];
    expect(checkWinner(board)).toBeNull();
  });
});

describe('isDraw', () => {
  it('returns false for an empty board', () => {
    expect(isDraw(createEmptyBoard())).toBe(false);
  });

  it('returns true when board is full with no winner', () => {
    const board: Board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(isDraw(board)).toBe(true);
  });

  it('returns false when board is full with a winner', () => {
    const board: Board = ['X', 'X', 'X', 'O', 'O', 'X', 'O', 'X', 'O'];
    expect(isDraw(board)).toBe(false);
  });
});

describe('makeMove', () => {
  it('places a mark on an empty cell', () => {
    const board = createEmptyBoard();
    const result = makeMove(board, 4, 'X');
    expect(result[4]).toBe('X');
    expect(result.filter((c) => c === null)).toHaveLength(8);
  });

  it('does not modify the original board', () => {
    const board = createEmptyBoard();
    makeMove(board, 0, 'O');
    expect(board[0]).toBeNull();
  });

  it('returns the same board if cell is occupied', () => {
    const board = makeMove(createEmptyBoard(), 0, 'X');
    const result = makeMove(board, 0, 'O');
    expect(result).toBe(board);
    expect(result[0]).toBe('X');
  });
});