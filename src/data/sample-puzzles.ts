import { Puzzle } from '../types/puzzle';

// Simple checkmate puzzles for beginners
export const SAMPLE_PUZZLES: Puzzle[] = [
  {
    id: 'easy-1',
    title: 'Checkmate in 1',
    difficulty: 'easy',
    playerColor: 'white',
    hint: 'Use your Queen!',
    board: [
      [null, null, null, null, { type: 'king', color: 'black' }, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [{ type: 'queen', color: 'white' }, null, null, null, { type: 'king', color: 'white' }, null, null, null],
    ],
    solution: [
      { from: { row: 7, col: 0 }, to: { row: 0, col: 0 } }, // Queen to a8, checkmate
    ],
  },
  {
    id: 'easy-2',
    title: 'Rook Checkmate',
    difficulty: 'easy',
    playerColor: 'white',
    hint: 'Move your Rook!',
    board: [
      [null, null, null, null, { type: 'king', color: 'black' }, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, { type: 'king', color: 'white' }, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [{ type: 'rook', color: 'white' }, null, null, null, null, null, null, null],
    ],
    solution: [
      { from: { row: 7, col: 0 }, to: { row: 0, col: 0 } }, // Rook to a8, checkmate
    ],
  },
  {
    id: 'easy-3',
    title: 'Back Rank Mate',
    difficulty: 'easy',
    playerColor: 'white',
    hint: 'Attack the back row!',
    board: [
      [null, null, null, null, null, null, { type: 'king', color: 'black' }, null],
      [null, null, null, null, null, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, { type: 'rook', color: 'white' }, null, null, { type: 'king', color: 'white' }],
    ],
    solution: [
      { from: { row: 7, col: 4 }, to: { row: 0, col: 4 } }, // Rook to e8, checkmate
    ],
  },
];
