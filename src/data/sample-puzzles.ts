import { Puzzle } from '../types/puzzle';
import { parseFen, parseUciMove } from '../utils/chess-helpers';
import puzzlesData from '../../data/puzzles.json';

interface JsonPuzzle {
  id: string;
  category: string;
  theme: string;
  difficulty: number;
  fen: string;
  solution: string[];
  explanation: string;
  hint: string;
}

function mapDifficulty(level: number): 'easy' | 'medium' | 'hard' {
  if (level <= 2) return 'easy';
  if (level <= 3) return 'medium';
  return 'hard';
}

function convertJsonPuzzle(json: JsonPuzzle): Puzzle {
  const { board, activeColor } = parseFen(json.fen);
  const solution = json.solution.map(parseUciMove);

  return {
    id: json.id,
    title: json.theme,
    difficulty: mapDifficulty(json.difficulty),
    fen: json.fen,
    board,
    playerColor: activeColor,
    solution,
    hint: json.hint,
  };
}

export const SAMPLE_PUZZLES: Puzzle[] = (
  puzzlesData.puzzles as JsonPuzzle[]
).map(convertJsonPuzzle);
