import { Move, Piece } from '../utils/chess-helpers';

export interface Puzzle {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  board: (Piece | null)[][];
  playerColor: 'white' | 'black';
  solution: Move[];
  hint?: string;
}

export interface PuzzleProgress {
  puzzleId: string;
  completed: boolean;
  attempts: number;
  hintsUsed: number;
}
