import { View, Text,TouchableOpacity } from "react-native";
import ProfileOption from "./ProfileOption";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";




type PreferencesProps = {
  setScreen: (screen: "preference" | "edit-info" | "invite" | "index") => void;
};

export default function Preferences({ setScreen }: PreferencesProps) {
  return (
    <SafeAreaView className="flex-1 px-6">
      <View className="flex-row ">

      <TouchableOpacity onPress={() => setScreen("preference")} className="mb-4">
        <Ionicons name="chevron-back-outline" size={28} color="#757474" />
      </TouchableOpacity>
      
      <Text className="text-red-100 text-2xl font-bold mb-6 px-6">Preferences</Text>

      </View>

      <View className="mt-6 space-y-6">
        <ProfileOption label="Account Information" icon="user" onPress={() => setScreen("index")} extra="Change your account information" />
        <ProfileOption label="Password" icon="lock" onPress={() => setScreen("edit-info")} extra="Change your password" />
        <ProfileOption label="Payment Methods" icon="credit-card" extra="Add your credit/ Credit Cards" />
      </View>
    </SafeAreaView>
  );
}