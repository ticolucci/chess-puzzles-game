export const theme = {
  colors: {
    primary: '#4A90D9',
    secondary: '#FFD700',
    success: '#4CAF50',
    error: '#F44336',
    white: '#FFFFFF',
    black: '#333333',
    lightSquare: '#F0D9B5',
    darkSquare: '#B58863',
    highlight: '#FFFF00',
    background: '#E8F4FD',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  fontSize: {
    small: 14,
    medium: 18,
    large: 24,
    xlarge: 32,
  },
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
  },
};

export type Theme = typeof theme;
