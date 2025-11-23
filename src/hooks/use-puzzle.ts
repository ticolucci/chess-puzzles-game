import { useState, useCallback } from 'react';
import { Piece, Square, Move } from '../utils/chess-helpers';
import { Puzzle } from '../types/puzzle';

interface UsePuzzleState {
  board: (Piece | null)[][];
  selectedSquare: Square | null;
  currentMoveIndex: number;
  isComplete: boolean;
  isWrong: boolean;
  feedback: string | null;
}

export function usePuzzle(puzzle: Puzzle) {
  const [state, setState] = useState<UsePuzzleState>({
    board: puzzle.board.map((row) => [...row]),
    selectedSquare: null,
    currentMoveIndex: 0,
    isComplete: false,
    isWrong: false,
    feedback: null,
  });

  const selectSquare = useCallback(
    (square: Square) => {
      if (state.isComplete) return;

      const piece = state.board[square.row][square.col];

      // If no square selected and clicking on own piece, select it
      if (!state.selectedSquare) {
        if (piece && piece.color === puzzle.playerColor) {
          setState((prev) => ({ ...prev, selectedSquare: square }));
        }
        return;
      }

      // If clicking same square, deselect
      if (
        state.selectedSquare.row === square.row &&
        state.selectedSquare.col === square.col
      ) {
        setState((prev) => ({ ...prev, selectedSquare: null }));
        return;
      }

      // Try to make a move
      const move: Move = { from: state.selectedSquare, to: square };
      const expectedMove = puzzle.solution[state.currentMoveIndex];

      if (
        move.from.row === expectedMove.from.row &&
        move.from.col === expectedMove.from.col &&
        move.to.row === expectedMove.to.row &&
        move.to.col === expectedMove.to.col
      ) {
        // Correct move!
        const newBoard = state.board.map((row) => [...row]);
        newBoard[move.to.row][move.to.col] =
          newBoard[move.from.row][move.from.col];
        newBoard[move.from.row][move.from.col] = null;

        const nextMoveIndex = state.currentMoveIndex + 1;
        const isComplete = nextMoveIndex >= puzzle.solution.length;

        setState({
          board: newBoard,
          selectedSquare: null,
          currentMoveIndex: nextMoveIndex,
          isComplete,
          isWrong: false,
          feedback: isComplete ? 'Great job!' : 'Good move!',
        });
      } else {
        // Wrong move
        setState((prev) => ({
          ...prev,
          selectedSquare: null,
          isWrong: true,
          feedback: 'Try again!',
        }));
      }
    },
    [state, puzzle]
  );

  const reset = useCallback(() => {
    setState({
      board: puzzle.board.map((row) => [...row]),
      selectedSquare: null,
      currentMoveIndex: 0,
      isComplete: false,
      isWrong: false,
      feedback: null,
    });
  }, [puzzle]);

  const getHint = useCallback(() => {
    if (puzzle.hint) {
      setState((prev) => ({ ...prev, feedback: puzzle.hint || null }));
    }
  }, [puzzle.hint]);

  return {
    ...state,
    selectSquare,
    reset,
    getHint,
    highlightedSquares: state.selectedSquare ? [state.selectedSquare] : [],
  };
}
