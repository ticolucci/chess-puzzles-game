export type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
export type PieceColor = 'white' | 'black';

export interface Piece {
  type: PieceType;
  color: PieceColor;
}

export interface Square {
  row: number;
  col: number;
}

export interface Move {
  from: Square;
  to: Square;
}

export function squareToNotation(square: Square): string {
  const file = String.fromCharCode(97 + square.col); // a-h
  const rank = 8 - square.row; // 1-8
  return `${file}${rank}`;
}

export function notationToSquare(notation: string): Square {
  const file = notation.charCodeAt(0) - 97; // a=0, b=1, etc.
  const rank = parseInt(notation[1], 10);
  return { row: 8 - rank, col: file };
}

export function isLightSquare(row: number, col: number): boolean {
  return (row + col) % 2 === 0;
}

export function getInitialBoard(): (Piece | null)[][] {
  const board: (Piece | null)[][] = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  // Set up pawns
  for (let col = 0; col < 8; col++) {
    board[1][col] = { type: 'pawn', color: 'black' };
    board[6][col] = { type: 'pawn', color: 'white' };
  }

  // Set up other pieces
  const backRow: PieceType[] = [
    'rook',
    'knight',
    'bishop',
    'queen',
    'king',
    'bishop',
    'knight',
    'rook',
  ];

  for (let col = 0; col < 8; col++) {
    board[0][col] = { type: backRow[col], color: 'black' };
    board[7][col] = { type: backRow[col], color: 'white' };
  }

  return board;
}
