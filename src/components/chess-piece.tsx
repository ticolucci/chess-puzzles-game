import { View, StyleSheet } from 'react-native';
import { Piece } from '../utils/chess-helpers';
import { SQUARE_SIZE } from '../constants/layout';
import {
  WhiteKing,
  BlackKing,
  WhiteQueen,
  BlackQueen,
  WhiteRook,
  BlackRook,
  WhiteBishop,
  BlackBishop,
  WhiteKnight,
  BlackKnight,
  WhitePawn,
  BlackPawn,
} from './piece-svgs';

interface ChessPieceProps {
  piece: Piece;
}

type PieceComponent = React.FC<{ size: number }>;

const PIECE_COMPONENTS: Record<string, PieceComponent> = {
  'white-king': WhiteKing,
  'white-queen': WhiteQueen,
  'white-rook': WhiteRook,
  'white-bishop': WhiteBishop,
  'white-knight': WhiteKnight,
  'white-pawn': WhitePawn,
  'black-king': BlackKing,
  'black-queen': BlackQueen,
  'black-rook': BlackRook,
  'black-bishop': BlackBishop,
  'black-knight': BlackKnight,
  'black-pawn': BlackPawn,
};

export function ChessPiece({ piece }: ChessPieceProps) {
  const PieceComponent = PIECE_COMPONENTS[`${piece.color}-${piece.type}`];
  const pieceSize = SQUARE_SIZE * 0.9;

  if (!PieceComponent) {
    return null;
  }

  return (
    <View style={styles.container}>
      <PieceComponent size={pieceSize} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
