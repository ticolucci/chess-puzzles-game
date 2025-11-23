import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../styles/theme';
import { isLightSquare } from '../utils/chess-helpers';

const BOARD_SIZE = Math.min(Dimensions.get('window').width - 32, 400);
const SQUARE_SIZE = BOARD_SIZE / 8;

interface ChessSquareProps {
  row: number;
  col: number;
  isHighlighted?: boolean;
  isSelected?: boolean;
  isValidMove?: boolean;
  onPress: () => void;
  children?: React.ReactNode;
}

export function ChessSquare({
  row,
  col,
  isHighlighted = false,
  isSelected = false,
  isValidMove = false,
  onPress,
  children,
}: ChessSquareProps) {
  const isLight = isLightSquare(row, col);

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
