import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="(root)/index" options={{ headerShown: false }} />
      <Stack.Screen name="splash/index" options={{ headerShown: false }} />
    </Stack>
  );
}