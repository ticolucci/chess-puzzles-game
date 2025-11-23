import { useState, useCallback, useEffect, useRef } from 'react';
import { Piece, Square, Move } from '../utils/chess-helpers';
import { Puzzle } from '../types/puzzle';

interface UsePuzzleState {
  board: (Piece | null)[][];
  selectedSquare: Square | null;
  currentMoveIndex: number;
  isComplete: boolean;
  isWrong: boolean;
  feedback: string | null;
  isOpponentMoving: boolean;
  isShowingSolution: boolean;
}

// Helper to check if a move index is the player's move
// Player moves are at even indices (0, 2, 4...) since player always moves first
function isPlayerMove(moveIndex: number): boolean {
  return moveIndex % 2 === 0;
}

// Helper to apply a move to the board
function applyMove(board: (Piece | null)[][], move: Move): (Piece | null)[][] {
  const newBoard = board.map((row) => [...row]);
  newBoard[move.to.row][move.to.col] = newBoard[move.from.row][move.from.col];
  newBoard[move.from.row][move.from.col] = null;
  return newBoard;
}

export function usePuzzle(puzzle: Puzzle) {
  const [state, setState] = useState<UsePuzzleState>({
    board: puzzle.board.map((row) => [...row]),
    selectedSquare: null,
    currentMoveIndex: 0,
    isComplete: false,
    isWrong: false,
    feedback: null,
    isOpponentMoving: false,
    isShowingSolution: false,
  });

  const opponentMoveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (opponentMoveTimeoutRef.current) {
        clearTimeout(opponentMoveTimeoutRef.current);
      }
    };
  }, []);

  // Handle opponent's automatic moves
  useEffect(() => {
    const { currentMoveIndex, isComplete, isOpponentMoving } = state;

    // If puzzle is complete or already processing opponent move, skip
    if (isComplete || isOpponentMoving) return;

    // If it's still the player's turn, skip
    if (isPlayerMove(currentMoveIndex)) return;

    // It's the opponent's turn - play their move automatically
    const opponentMove = puzzle.solution[currentMoveIndex];
    if (!opponentMove) return;

    setState((prev) => ({ ...prev, isOpponentMoving: true }));

    // Delay opponent move slightly so player can see what's happening
    opponentMoveTimeoutRef.current = setTimeout(() => {
      setState((prev) => {
        const newBoard = applyMove(prev.board, opponentMove);
        const nextMoveIndex = prev.currentMoveIndex + 1;
        const isComplete = nextMoveIndex >= puzzle.solution.length;

        return {
          ...prev,
          board: newBoard,
          currentMoveIndex: nextMoveIndex,
          isComplete,
          isOpponentMoving: false,
          feedback: isComplete ? 'Great job!' : 'Your turn!',
        };
      });
    }, 500);
  }, [state.currentMoveIndex, state.isComplete, state.isOpponentMoving, puzzle.solution]);

  const selectSquare = useCallback(
    (square: Square) => {
      // Don't allow interaction while opponent is moving or puzzle is complete
      if (state.isComplete || state.isOpponentMoving) return;

      // Don't allow interaction if it's not the player's turn
      if (!isPlayerMove(state.currentMoveIndex)) return;

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
        const newBoard = applyMove(state.board, move);
        const nextMoveIndex = state.currentMoveIndex + 1;
        const isComplete = nextMoveIndex >= puzzle.solution.length;

        setState({
          board: newBoard,
          selectedSquare: null,
          currentMoveIndex: nextMoveIndex,
          isComplete,
          isWrong: false,
          isOpponentMoving: false,
          isShowingSolution: false,
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
    // Clear any pending opponent move timeout
    if (opponentMoveTimeoutRef.current) {
      clearTimeout(opponentMoveTimeoutRef.current);
    }
    setState({
      board: puzzle.board.map((row) => [...row]),
      selectedSquare: null,
      currentMoveIndex: 0,
      isComplete: false,
      isWrong: false,
      feedback: null,
      isOpponentMoving: false,
      isShowingSolution: false,
    });
  }, [puzzle]);

  const getHint = useCallback(() => {
    if (puzzle.hint) {
      setState((prev) => ({ ...prev, feedback: puzzle.hint || null }));
    }
  }, [puzzle.hint]);

  const showNextStep = useCallback(() => {
    if (state.isComplete || state.isOpponentMoving) return;

    const nextMove = puzzle.solution[state.currentMoveIndex];
    if (!nextMove) return;

    const newBoard = applyMove(state.board, nextMove);
    const nextMoveIndex = state.currentMoveIndex + 1;
    const isComplete = nextMoveIndex >= puzzle.solution.length;

    setState((prev) => ({
      ...prev,
      board: newBoard,
      currentMoveIndex: nextMoveIndex,
      isComplete,
      isShowingSolution: true,
      feedback: isComplete ? 'Solution complete!' : 'Next move shown',
    }));
  }, [state.board, state.currentMoveIndex, state.isComplete, state.isOpponentMoving, puzzle.solution]);

  const showSolution = useCallback(() => {
    if (state.isComplete) return;

    // Apply all remaining moves
    let newBoard = state.board;
    for (let i = state.currentMoveIndex; i < puzzle.solution.length; i++) {
      newBoard = applyMove(newBoard, puzzle.solution[i]);
    }

    setState((prev) => ({
      ...prev,
      board: newBoard,
      currentMoveIndex: puzzle.solution.length,
      isComplete: true,
      isShowingSolution: true,
      feedback: 'Here is the solution!',
    }));
  }, [state.board, state.currentMoveIndex, state.isComplete, puzzle.solution]);

  return {
    ...state,
    selectSquare,
    reset,
    getHint,
    showNextStep,
    showSolution,
    highlightedSquares: state.selectedSquare ? [state.selectedSquare] : [],
  };
}
