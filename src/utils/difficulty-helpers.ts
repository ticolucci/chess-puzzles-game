import { theme } from '../styles/theme';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  label: string;
  color: string;
}

const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  easy: {
    label: 'Easy',
    color: theme.colors.success,
  },
  medium: {
    label: 'Medium',
    color: theme.colors.secondary,
  },
  hard: {
    label: 'Hard',
    color: theme.colors.error,
  },
};

export function getDifficultyConfig(difficulty: Difficulty): DifficultyConfig {
  return DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.easy;
}

export function getDifficultyColor(difficulty: Difficulty): string {
  return getDifficultyConfig(difficulty).color;
}

export function getDifficultyLabel(difficulty: Difficulty): string {
  return getDifficultyConfig(difficulty).label;
}
