import { TouchableOpacity, StyleSheet } from 'react-native';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import { isLightSquare, squareToNotation, Piece } from '../utils/chess-helpers';
import { SQUARE_SIZE } from '../constants/layout';

// Get piece name for accessibility
function getPieceName(piece: Piece | null): string {
  if (!piece) return 'empty';
  return `${piece.color} ${piece.type}`;
}

interface ChessSquareProps {
  row: number;
  col: number;
  piece?: Piece | null;
  isHighlighted?: boolean;
  isSelected?: boolean;
  isValidMove?: boolean;
  onPress: () => void;
  children?: React.ReactNode;
}

export function ChessSquare({
  row,
  col,
  piece = null,
  isHighlighted = false,
  isSelected = false,
  isValidMove = false,
  onPress,
  children,
}: ChessSquareProps) {
  const isLight = isLightSquare(row, col);
  const squareName = squareToNotation({ row, col });
  const pieceName = getPieceName(piece);

  // Build accessibility label
  let accessibilityLabel = `${squareName}, ${pieceName}`;
  if (isSelected) accessibilityLabel += ', selected';
  if (isHighlighted) accessibilityLabel += ', highlighted';

  return (
    <TouchableOpacity
      style={[
        styles.square,
        isLight ? styles.lightSquare : styles.darkSquare,
        isValidMove && styles.validMove,
        isHighlighted && styles.highlighted,
        isSelected && styles.selected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityHint={piece ? `Tap to ${isSelected ? 'deselect' : 'select'} ${pieceName}` : 'Tap to move here'}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightSquare: {
    backgroundColor: theme.colors.lightSquare,
  },
  darkSquare: {
    backgroundColor: theme.colors.darkSquare,
  },
  highlighted: {
    backgroundColor: theme.colors.highlight,
    opacity: 0.8,
  },
  validMove: {
    backgroundColor: theme.colors.validMove,
  },
  selected: {
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
});
