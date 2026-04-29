import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AuthContext } from "@/store/auth-context";
import useAuth from "@/hooks/auth-hook";
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
	const {
        id,
        name,
        location,
        tag,
        data,
        userData

      } = useAuth();
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
     <AuthContext.Provider
            value={{
              data: data,
              userData: userData
            }}
          >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
       </AuthContext.Provider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
