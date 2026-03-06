import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { restyleTheme } from '@/constants/restyle-theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RestyleThemeProvider theme={restyleTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>

        <StatusBar style="auto" />
      </RestyleThemeProvider>
    </NavigationThemeProvider>
  );
}