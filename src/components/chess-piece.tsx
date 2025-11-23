import { Text, StyleSheet, Dimensions } from 'react-native';
import { Piece } from '../utils/chess-helpers';

const BOARD_SIZE = Math.min(Dimensions.get('window').width - 32, 400);
const SQUARE_SIZE = BOARD_SIZE / 8;

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
