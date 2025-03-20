import { SplashScreen, Stack } from "expo-router";
import { SafeAreaView } from "react-native"; // Import SafeAreaView
import './globals.css';
import { useEffect } from "react";
import { useFonts } from "expo-font";
import GlobalProvider from "@/lib/globalProvider";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Amaranth-Bold": require('../assets/fonts/Amaranth-Bold.ttf'),
    "Amaranth-BoldItalic": require('../assets/fonts/Amaranth-BoldItalic.ttf'),
    "Amaranth-Italic": require('../assets/fonts/Amaranth-Italic.ttf'),
    "Amaranth-Regular": require('../assets/fonts/Amaranth-Regular.ttf'),
    "NunitoSans-Italic": require('../assets/fonts/NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf'),
    "NunitoSans-Regular": require('../assets/fonts/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <SafeAreaView style={{ flex: 1 }}> {/* Wrap Stack with SafeAreaView */}
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </GlobalProvider>
  );
}