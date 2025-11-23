import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { HomeScreen } from './src/screens/home-screen';
import { PuzzleScreen } from './src/screens/puzzle-screen';
import { PuzzleSelectScreen } from './src/screens/puzzle-select-screen';
import { theme } from './src/styles/theme';

export type RootStackParamList = {
  Home: undefined;
  PuzzleSelect: undefined;
  Puzzle: { puzzleId?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: theme.colors.primary },
            headerTintColor: theme.colors.white,
            headerTitleStyle: { fontWeight: 'bold', fontSize: 24 },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Chess Puzzles' }}
          />
          <Stack.Screen
            name="PuzzleSelect"
            component={PuzzleSelectScreen}
            options={{ title: 'Choose Puzzle' }}
          />
          <Stack.Screen
            name="Puzzle"
            component={PuzzleScreen}
            options={{ title: 'Solve it!' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
