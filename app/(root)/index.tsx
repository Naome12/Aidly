import OnboardingScreen from "@/Components/onboarding/Onboarding";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return ( 
    <SafeAreaView className="flex-1 h-screen bg-black-100 ">
      <OnboardingScreen />
    </SafeAreaView>
  );
}
