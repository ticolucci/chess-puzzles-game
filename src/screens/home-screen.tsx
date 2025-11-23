import { View, Text, StyleSheet, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BigButton } from '../components/big-button';
import { theme } from '../styles/theme';
import { RootStackParamList } from '../../App';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Chess Puzzles</Text>
        <Text style={styles.subtitle}>Learn and have fun!</Text>

        <View style={styles.iconContainer}>
          <Text style={styles.chessIcon}>{'\u265E'}</Text>
        </View>

        <View style={styles.buttons}>
          <BigButton
            title="Play!"
            onPress={() => navigation.navigate('Puzzle', {})}
            color={theme.colors.success}
          />
          <BigButton
            title="Choose Puzzle"
            onPress={() => navigation.navigate('PuzzleSelect')}
            color={theme.colors.primary}
          />
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.large,
    color: theme.colors.black,
    marginBottom: theme.spacing.xl,
  },
  iconContainer: {
    marginBottom: theme.spacing.xl,
  },
  chessIcon: {
    fontSize: 100,
    color: theme.colors.primary,
  },
  buttons: {
    alignItems: 'center',
  },
});
