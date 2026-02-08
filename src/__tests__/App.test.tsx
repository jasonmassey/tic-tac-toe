import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App', () => {
  it('renders the title', () => {
    render(<App />);
    expect(screen.getByText('Tic Tac Toe')).toBeInTheDocument();
  });

  it('shows player X turn initially', () => {
    render(<App />);
    expect(screen.getByText("Player X's turn")).toBeInTheDocument();
  });

  it('renders 9 squares', () => {
    render(<App />);
    const buttons = screen.getAllByRole('button').filter((b) => b.classList.contains('square'));
    expect(buttons).toHaveLength(9);
  });

  it('alternates turns on click', async () => {
    const user = userEvent.setup();
    render(<App />);

    const squares = screen.getAllByRole('button').filter((b) => b.classList.contains('square'));

    await user.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
    expect(screen.getByText("Player O's turn")).toBeInTheDocument();

    await user.click(squares[1]);
    expect(squares[1]).toHaveTextContent('O');
    expect(screen.getByText("Player X's turn")).toBeInTheDocument();
  });

  it('prevents clicking an occupied square', async () => {
    const user = userEvent.setup();
    render(<App />);

    const squares = screen.getAllByRole('button').filter((b) => b.classList.contains('square'));

    await user.click(squares[0]); // X
    await user.click(squares[0]); // try again — should be ignored

    expect(squares[0]).toHaveTextContent('X');
    expect(screen.getByText("Player O's turn")).toBeInTheDocument();
  });

  it('detects a winner and shows play again', async () => {
    const user = userEvent.setup();
    render(<App />);

    const squares = screen.getAllByRole('button').filter((b) => b.classList.contains('square'));

    // X wins top row: X(0), O(3), X(1), O(4), X(2)
    await user.click(squares[0]);
    await user.click(squares[3]);
    await user.click(squares[1]);
    await user.click(squares[4]);
    await user.click(squares[2]);

    expect(screen.getByText('Player X wins!')).toBeInTheDocument();
    expect(screen.getByText('Play Again')).toBeInTheDocument();
  });

  it('resets the board on Play Again', async () => {
    const user = userEvent.setup();
    render(<App />);

    const squares = screen.getAllByRole('button').filter((b) => b.classList.contains('square'));

    // Quick win for X
    await user.click(squares[0]);
    await user.click(squares[3]);
    await user.click(squares[1]);
    await user.click(squares[4]);
    await user.click(squares[2]);

    await user.click(screen.getByText('Play Again'));

    // Board should be empty, no win message
    const newSquares = screen.getAllByRole('button').filter((b) => b.classList.contains('square'));
    expect(newSquares.every((s) => s.textContent === '')).toBe(true);
  });

  it('updates the scoreboard after a win', async () => {
    const user = userEvent.setup();
    render(<App />);

    const squares = screen.getAllByRole('button').filter((b) => b.classList.contains('square'));

    // X wins
    await user.click(squares[0]);
    await user.click(squares[3]);
    await user.click(squares[1]);
    await user.click(squares[4]);
    await user.click(squares[2]);

    // X score should be 1 — scores are rendered as X / Draws / O
    const scoreContainers = document.querySelectorAll('.scoreboard__value');
    expect(scoreContainers[0]).toHaveTextContent('1'); // X
    expect(scoreContainers[1]).toHaveTextContent('0'); // Draws
    expect(scoreContainers[2]).toHaveTextContent('0'); // O
  });

  it('shows score reset button after a game', async () => {
    const user = userEvent.setup();
    render(<App />);

    // No reset button initially
    expect(screen.queryByText('Reset Scores')).not.toBeInTheDocument();

    const squares = screen.getAllByRole('button').filter((b) => b.classList.contains('square'));

    // Play a game
    await user.click(squares[0]);
    await user.click(squares[3]);
    await user.click(squares[1]);
    await user.click(squares[4]);
    await user.click(squares[2]);

    expect(screen.getByText('Reset Scores')).toBeInTheDocument();
  });
});
