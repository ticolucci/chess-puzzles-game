import { View, StyleSheet, Dimensions } from 'react-native';
import { ChessSquare } from './chess-square';
import { ChessPiece } from './chess-piece';
import { Piece, Square } from '../utils/chess-helpers';
import { theme } from '../styles/theme';

const BOARD_SIZE = Math.min(Dimensions.get('window').width - 32, 400);

interface ChessBoardProps {
  board: (Piece | null)[][];
  selectedSquare: Square | null;
  highlightedSquares: Square[];
  onSquarePress: (square: Square) => void;
}

export function ChessBoard({
  board,
  selectedSquare,
  highlightedSquares,
  onSquarePress,
}: ChessBoardProps) {
  const isHighlighted = (row: number, col: number) =>
    highlightedSquares.some((s) => s.row === row && s.col === col);

  const isSelected = (row: number, col: number) =>
    selectedSquare?.row === row && selectedSquare?.col === col;

  return (
    <View style={styles.board}>
      {board.map((rowPieces, row) => (
        <View key={row} style={styles.row}>
          {rowPieces.map((piece, col) => (
            <ChessSquare
              key={`${row}-${col}`}
              row={row}
              col={col}
              isHighlighted={isHighlighted(row, col)}
              isSelected={isSelected(row, col)}
              onPress={() => onSquarePress({ row, col })}
            >
              {piece && <ChessPiece piece={piece} />}
            </ChessSquare>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    borderWidth: 4,
    borderColor: theme.colors.black,
    borderRadius: theme.borderRadius.small,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
});
