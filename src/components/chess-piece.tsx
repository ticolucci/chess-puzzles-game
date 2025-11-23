import { Text, StyleSheet } from 'react-native';
import { Piece } from '../utils/chess-helpers';
import { SQUARE_SIZE } from '../constants/layout';

interface ChessPieceProps {
  piece: Piece;
}

const PIECE_SYMBOLS: Record<string, string> = {
  'white-king': '\u2654',
  'white-queen': '\u2655',
  'white-rook': '\u2656',
  'white-bishop': '\u2657',
  'white-knight': '\u2658',
  'white-pawn': '\u2659',
  'black-king': '\u265A',
  'black-queen': '\u265B',
  'black-rook': '\u265C',
  'black-bishop': '\u265D',
  'black-knight': '\u265E',
  'black-pawn': '\u265F',
};

export function ChessPiece({ piece }: ChessPieceProps) {
  const symbol = PIECE_SYMBOLS[`${piece.color}-${piece.type}`];

  return <Text style={styles.piece}>{symbol}</Text>;
}

const styles = StyleSheet.create({
  piece: {
    fontSize: SQUARE_SIZE * 0.8,
    textAlign: 'center',
  },
});
