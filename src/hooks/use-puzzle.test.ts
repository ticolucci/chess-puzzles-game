import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePuzzle } from './use-puzzle';
import { Puzzle } from '../types/puzzle';
import { parseFen, parseUciMove } from '../utils/chess-helpers';

// Simple puzzle: White to move, mate in 1
// FEN: 6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1
// Solution: Re8# (e1e8)
const createSimplePuzzle = (): Puzzle => {
  const fen = '6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1';
  const { board, activeColor } = parseFen(fen);
  return {
    id: 'test-puzzle-1',
    title: 'Back Rank Mate',
    difficulty: 'easy',
    fen,
    board,
    playerColor: activeColor,
    solution: [parseUciMove('e1e8')],
    hint: 'Look for a back rank mate!',
  };
};

// Multi-move puzzle: White to move
// FEN: r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4
// Solution: Qxf7# (h5f7)
const createMateIn1Puzzle = (): Puzzle => {
  const fen = 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4';
  const { board, activeColor } = parseFen(fen);
  return {
    id: 'test-puzzle-scholars',
    title: "Scholar's Mate",
    difficulty: 'easy',
    fen,
    board,
    playerColor: activeColor,
    solution: [parseUciMove('h5f7')],
    hint: 'Attack f7!',
  };
};

// Two-move puzzle with opponent response
const createTwoMovePuzzle = (): Puzzle => {
  const fen = '6k1/5ppp/8/8/8/8/5PPP/R3R1K1 w - - 0 1';
  const { board, activeColor } = parseFen(fen);
  return {
    id: 'test-puzzle-2',
    title: 'Two Move Puzzle',
    difficulty: 'medium',
    fen,
    board,
    playerColor: activeColor,
    solution: [
      parseUciMove('e1e8'), // White: Rook to e8+
      parseUciMove('g8f8'), // Black: King moves (opponent auto-play)
      parseUciMove('a1a8'), // White: Rook a8#
    ],
    hint: 'Double rook attack',
  };
};

describe('usePuzzle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('initialization', () => {
    it('should initialize with correct state', () => {
      const puzzle = createSimplePuzzle();
      const { result } = renderHook(() => usePuzzle(puzzle));

      expect(result.current.board).toEqual(puzzle.board);
      expect(result.current.selectedSquare).toBeNull();
      expect(result.current.currentMoveIndex).toBe(0);
      expect(result.current.isComplete).toBe(false);
      expect(result.current.isWrong).toBe(false);
      expect(result.current.feedback).toBeNull();
      expect(result.current.isOpponentMoving).toBe(false);
      expect(result.current.isShowingSolution).toBe(false);
      expect(result.current.highlightedSquares).toEqual([]);
    });
  });

  describe('selectSquare', () => {
    it('should select a player piece', () => {
      const puzzle = createSimplePuzzle();
      const { result } = renderHook(() => usePuzzle(puzzle));

      // Select the white rook at e1 (row 7, col 4)
      act(() => {
        result.current.selectSquare({ row: 7, col: 4 });
      });

      expect(result.current.selectedSquare).toEqual({ row: 7, col: 4 });
      expect(result.current.highlightedSquares).toEqual([{ row: 7, col: 4 }]);
    });

    it('should not select opponent piece', () => {
      const puzzle = createSimplePuzzle();
      const { result } = renderHook(() => usePuzzle(puzzle));

      // Try to select black king at g8 (row 0, col 6)
      act(() => {
        result.current.selectSquare({ row: 0, col: 6 });
      });

      expect(result.current.selectedSquare).toBeNull();
    });

    it('should deselect when clicking same square', () => {
      const puzzle = createSimplePuzzle();
      const { result } = renderHook(() => usePuzzle(puzzle));

      act(() => {
        result.current.selectSquare({ row: 7, col: 4 });
      });
      expect(result.current.selectedSquare).toEqual({ row: 7, col: 4 });

      act(() => {
        result.current.selectSquare({ row: 7, col: 4 });
      });
      expect(result.current.selectedSquare).toBeNull();
    });

    it('should make correct move and complete single-move puzzle', () => {
      const puzzle = createSimplePuzzle();
      const { result } = renderHook(() => usePuzzle(puzzle));

      // Select rook at e1
      act(() => {
        result.current.selectSquare({ row: 7, col: 4 });
      });

      // Move to e8 (correct solution)
      act(() => {
        result.current.selectSquare({ row: 0, col: 4 });
      });

      expect(result.current.selectedSquare).toBeNull();
      expect(result.current.isComplete).toBe(true);
      expect(result.current.feedback).toBe('Great job!');
      expect(result.current.isWrong).toBe(false);
    });

    it('should show error for wrong but legal move', () => {
      const puzzle = createMateIn1Puzzle();
      const { result } = renderHook(() => usePuzzle(puzzle));

      // Select queen at h5
      act(() => {
        result.current.selectSquare({ row: 3, col: 7 });
      });

      // Move to e5 (legal but wrong move)
      act(() => {
        result.current.selectSquare({ row: 3, col: 4 });
      });

      expect(result.current.isWrong).toBe(true);
      expect(result.current.feedback).toBe('Try again!');
      expect(result.current.isComplete).toBe(false);
    });

    it('should silently reject illegal moves', () => {
      const puzzle = createSimplePuzzle();
      const { result } = renderHook(() => usePuzzle(puzzle));

      // Select rook at e1
      act(() => {
        result.current.selectSquare({ row: 7, col: 4 });
      });

      // Try to move diagonally (illegal for rook)
      act(() => {
        result.current.selectSquare({ row: 6, col: 5 });
      });

      // Should just deselect without error
      expect(result.current.selectedSquare).toBeNull();
      expect(result.current.isWrong).toBe(false);
      expect(result.current.feedback).toBeNull();
    });
  });

  describe('reset', () => {
    it('should reset puzzle to initial state', () => {
      const puzzle = createSimplePuzzle();
      const { result } = renderHook(() => usePuzzle(puzzle));

      // Make a correct move
      act(() => {
        result.current.selectSquare({ row: 7, col: 4 });
      });
      act(() => {
        result.current.selectSquare({ row: 0, col: 4 });
      });

      expect(result.current.isComplete).toBe(true);

      // Reset
      act(() => {
        result.current.reset();
      });

      expect(result.current.board).toEqual(puzzle.board);
      expect(result.current.currentMoveIndex).toBe(0);
      expect(result.current.isComplete).toBe(false);
      expect(result.current.feedback).toBeNull();
    });
  });

  describe('getHint', () => {
    it('should display hint message', () => {
      const puzzle = createSimplePuzzle();
      const { result } = renderHook(() => usePuzzle(puzzle));

      act(() => {
        result.current.getHint();
      });

      expect(result.current.feedback).toBe('Look for a back rank mate!');
    });
  });

  describe('showNextStep', () => {
    it('should show next move in solution', () => {
      const puzzle = createSimplePuzzle();
      const { result } = renderHook(() => usePuzzle(puzzle));

      act(() => {
        result.current.showNextStep();
      });

      expect(result.current.currentMoveIndex).toBe(1);
      expect(result.current.isComplete).toBe(true);
      expect(result.current.isShowingSolution).toBe(true);
      expect(result.current.feedback).toBe('Solution complete!');
    });

    it('should not advance if puzzle is complete', () => {
      const puzzle = createSimplePuzzle();
      const { result } = renderHook(() => usePuzzle(puzzle));

      // Complete the puzzle
      act(() => {
        result.current.selectSquare({ row: 7, col: 4 });
      });
      act(() => {
        result.current.selectSquare({ row: 0, col: 4 });
      });

      const prevMoveIndex = result.current.currentMoveIndex;

      act(() => {
        result.current.showNextStep();
      });

      expect(result.current.currentMoveIndex).toBe(prevMoveIndex);
    });
  });

  describe('showSolution', () => {
    it('should show complete solution', () => {
      const puzzle = createTwoMovePuzzle();
      const { result } = renderHook(() => usePuzzle(puzzle));

      act(() => {
        result.current.showSolution();
      });

      expect(result.current.currentMoveIndex).toBe(puzzle.solution.length);
      expect(result.current.isComplete).toBe(true);
      expect(result.current.isShowingSolution).toBe(true);
      expect(result.current.feedback).toBe('Here is the solution!');
    });
  });

  describe('opponent auto-moves', () => {
    it('should auto-play opponent move after correct player move', () => {
      const puzzle = createTwoMovePuzzle();
      const { result } = renderHook(() => usePuzzle(puzzle));

      // Make first correct move (Re1-e8)
      act(() => {
        result.current.selectSquare({ row: 7, col: 4 });
      });
      act(() => {
        result.current.selectSquare({ row: 0, col: 4 });
      });

      expect(result.current.currentMoveIndex).toBe(1);
      expect(result.current.feedback).toBe('Good move!');

      // Opponent should move after delay
      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current.currentMoveIndex).toBe(2);
      expect(result.current.feedback).toBe('Your turn!');
      expect(result.current.isOpponentMoving).toBe(false);
    });
  });

  describe('blocking conditions', () => {
    it('should not allow moves when puzzle is complete', () => {
      const puzzle = createSimplePuzzle();
      const { result } = renderHook(() => usePuzzle(puzzle));

      // Complete puzzle
      act(() => {
        result.current.selectSquare({ row: 7, col: 4 });
      });
      act(() => {
        result.current.selectSquare({ row: 0, col: 4 });
      });

      const boardAfterComplete = result.current.board;

      // Try to select
      act(() => {
        result.current.selectSquare({ row: 7, col: 6 });
      });

      expect(result.current.selectedSquare).toBeNull();
      expect(result.current.board).toEqual(boardAfterComplete);
    });
  });
});
