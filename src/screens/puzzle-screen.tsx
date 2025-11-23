import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChessBoard } from '../components/chess-board';
import { BigButton } from '../components/big-button';
import { FeedbackMessage } from '../components/feedback-message';
import { usePuzzle } from '../hooks/use-puzzle';
import { theme } from '../styles/theme';
import { SAMPLE_PUZZLES } from '../data/sample-puzzles';
import { RootStackParamList } from '../../App';

type PuzzleScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Puzzle'>;
  route: RouteProp<RootStackParamList, 'Puzzle'>;
};

export function PuzzleScreen({ navigation, route }: PuzzleScreenProps) {
  const puzzleId = route.params?.puzzleId || 'easy-1';
  const puzzle = SAMPLE_PUZZLES.find((p) => p.id === puzzleId) || SAMPLE_PUZZLES[0];

  const {
    board,
    selectedSquare,
    highlightedSquares,
    selectSquare,
    isComplete,
    isWrong,
    feedback,
    reset,
    getHint,
    showNextStep,
    showSolution,
  } = usePuzzle(puzzle);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{puzzle.title}</Text>

        {feedback && (
          <FeedbackMessage
            type={isComplete ? 'success' : isWrong ? 'error' : 'hint'}
            message={feedback}
          />
        )}

        <ChessBoard
          board={board}
          selectedSquare={selectedSquare}
          highlightedSquares={highlightedSquares}
          onSquarePress={selectSquare}
        />

        <Text style={styles.instruction}>
          {isComplete
            ? 'You did it!'
            : `Your turn: ${puzzle.playerColor === 'white' ? 'White' : 'Black'}`}
        </Text>

        <View style={styles.buttons}>
          {isComplete ? (
            <>
              <BigButton
                title="Next Puzzle"
                onPress={() => navigation.goBack()}
                color={theme.colors.success}
              />
              <BigButton
                title="Start Over"
                onPress={reset}
                color={theme.colors.error}
              />
            </>
          ) : (
            <>
              <BigButton
                title="Hint"
                onPress={getHint}
                color={theme.colors.secondary}
              />
              <BigButton
                title="Next Step"
                onPress={showNextStep}
                color={theme.colors.primary}
              />
              <BigButton
                title="Show All"
                onPress={showSolution}
                color="#9C27B0"
              />
              <BigButton
                title="Start Over"
                onPress={reset}
                color={theme.colors.error}
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: theme.spacing.md,
  },
  instruction: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.black,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
});
