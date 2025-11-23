import { describe, it, expect } from 'vitest';
import {
  squareToNotation,
  notationToSquare,
  isLightSquare,
  getInitialBoard,
} from './chess-helpers';

describe('chess-helpers', () => {
  describe('squareToNotation', () => {
    it('converts top-left corner to a8', () => {
      expect(squareToNotation({ row: 0, col: 0 })).toBe('a8');
    });

    it('converts bottom-right corner to h1', () => {
      expect(squareToNotation({ row: 7, col: 7 })).toBe('h1');
    });

    it('converts e4 correctly', () => {
      expect(squareToNotation({ row: 4, col: 4 })).toBe('e4');
    });
  });

  describe('notationToSquare', () => {
    it('converts a8 to top-left corner', () => {
      expect(notationToSquare('a8')).toEqual({ row: 0, col: 0 });
    });

    it('converts h1 to bottom-right corner', () => {
      expect(notationToSquare('h1')).toEqual({ row: 7, col: 7 });
    });

    it('converts e4 correctly', () => {
      expect(notationToSquare('e4')).toEqual({ row: 4, col: 4 });
    });
  });

  describe('isLightSquare', () => {
    it('a8 is light', () => {
      expect(isLightSquare(0, 0)).toBe(true);
    });

    it('a1 is dark', () => {
      expect(isLightSquare(7, 0)).toBe(false);
    });

    it('h1 is light', () => {
      expect(isLightSquare(7, 7)).toBe(true);
    });
  });

  describe('getInitialBoard', () => {
    it('returns 8x8 board', () => {
      const board = getInitialBoard();
      expect(board.length).toBe(8);
      expect(board[0].length).toBe(8);
    });

    it('has white pawns on rank 2', () => {
      const board = getInitialBoard();
      for (let col = 0; col < 8; col++) {
        expect(board[6][col]).toEqual({ type: 'pawn', color: 'white' });
      }
    });

    it('has black king on e8', () => {
      const board = getInitialBoard();
      expect(board[0][4]).toEqual({ type: 'king', color: 'black' });
    });
  });
});
