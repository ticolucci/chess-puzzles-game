import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

interface FeedbackMessageProps {
  type: 'success' | 'error' | 'hint';
  message: string;
}

export function FeedbackMessage({ type, message }: FeedbackMessageProps) {
  const backgroundColor = {
    success: theme.colors.success,
    error: theme.colors.error,
    hint: theme.colors.secondary,
  }[type];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    marginVertical: theme.spacing.sm,
    alignItems: 'center',
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSize.medium,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
