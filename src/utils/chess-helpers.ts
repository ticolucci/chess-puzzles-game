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

const fenPieceMap: Record<string, Piece> = {
  k: { type: 'king', color: 'black' },
  q: { type: 'queen', color: 'black' },
  r: { type: 'rook', color: 'black' },
  b: { type: 'bishop', color: 'black' },
  n: { type: 'knight', color: 'black' },
  p: { type: 'pawn', color: 'black' },
  K: { type: 'king', color: 'white' },
  Q: { type: 'queen', color: 'white' },
  R: { type: 'rook', color: 'white' },
  B: { type: 'bishop', color: 'white' },
  N: { type: 'knight', color: 'white' },
  P: { type: 'pawn', color: 'white' },
};

export function parseFen(fen: string): {
  board: (Piece | null)[][];
  activeColor: 'white' | 'black';
} {
  const parts = fen.split(' ');
  const boardPart = parts[0];
  const activeColorPart = parts[1] || 'w';

  const board: (Piece | null)[][] = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  const ranks = boardPart.split('/');
  for (let row = 0; row < 8; row++) {
    let col = 0;
    const rank = ranks[row];
    for (const char of rank) {
      if (/\d/.test(char)) {
        col += parseInt(char, 10);
      } else {
        const piece = fenPieceMap[char];
        if (piece) {
          board[row][col] = { ...piece };
        }
        col++;
      }
    }
  }

  return {
    board,
    activeColor: activeColorPart === 'w' ? 'white' : 'black',
  };
}

export function parseUciMove(uci: string): Move {
  const from = notationToSquare(uci.slice(0, 2));
  const to = notationToSquare(uci.slice(2, 4));
  return { from, to };
}
