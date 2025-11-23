import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../styles/theme';
import { RootStackParamList } from '../../App';
import { SAMPLE_PUZZLES } from '../data/sample-puzzles';

type PuzzleSelectScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PuzzleSelect'>;
};

function getDifficultyColor(difficulty: 'easy' | 'medium' | 'hard'): string {
  switch (difficulty) {
    case 'easy':
      return theme.colors.success;
    case 'medium':
      return theme.colors.secondary;
    case 'hard':
      return theme.colors.error;
    default:
      return theme.colors.primary;
  }
}

function getDifficultyLabel(difficulty: 'easy' | 'medium' | 'hard'): string {
  switch (difficulty) {
    case 'easy':
      return 'Easy';
    case 'medium':
      return 'Medium';
    case 'hard':
      return 'Hard';
    default:
      return '';
  }
}

export function PuzzleSelectScreen({ navigation }: PuzzleSelectScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Pick a Puzzle!</Text>
        {SAMPLE_PUZZLES.map((puzzle, index) => (
          <TouchableOpacity
            key={puzzle.id}
            style={[
              styles.puzzleCard,
              { borderLeftColor: getDifficultyColor(puzzle.difficulty) },
            ]}
            onPress={() => navigation.navigate('Puzzle', { puzzleId: puzzle.id })}
          >
            <View style={styles.puzzleInfo}>
              <Text style={styles.puzzleNumber}>#{index + 1}</Text>
              <View style={styles.puzzleDetails}>
                <Text style={styles.puzzleTitle}>{puzzle.title}</Text>
                <View
                  style={[
                    styles.difficultyBadge,
                    { backgroundColor: getDifficultyColor(puzzle.difficulty) },
                  ]}
                >
                  <Text style={styles.difficultyText}>
                    {getDifficultyLabel(puzzle.difficulty)}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.md,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  puzzleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  puzzleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  puzzleNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginRight: theme.spacing.md,
    minWidth: 40,
  },
  puzzleDetails: {
    flex: 1,
  },
  puzzleTitle: {
    fontSize: theme.fontSize.large,
    fontWeight: '600',
    color: theme.colors.black,
    marginBottom: 4,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  difficultyText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.small,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 28,
    color: theme.colors.primary,
    marginLeft: theme.spacing.sm,
  },
});
