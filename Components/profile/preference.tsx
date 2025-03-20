import { View, Text,TouchableOpacity } from "react-native";
import ProfileOption from "./ProfileOption";
import { Ionicons } from "@expo/vector-icons";




type PreferencesProps = {
  setScreen: (screen: "preference" | "edit-info" | "invite" | "index") => void;
};

export default function Preferences({ setScreen }: PreferencesProps) {
  return (
    <View className="flex-1 bg-black px-6 pt-12">
      <View className="flex-row ">

      <TouchableOpacity onPress={() => setScreen("preference")} className="mb-4">
        <Ionicons name="chevron-back-outline" size={28} color="white" />
      </TouchableOpacity>
      
      <Text className="text-red-100 text-2xl font-bold mb-6 px-6">Preferences</Text>

      </View>

      <View className="mt-6 space-y-6">
        <ProfileOption label="Account Information" icon="user" onPress={() => setScreen("index")} extra="Change your account information" />
        <ProfileOption label="Password" icon="lock" onPress={() => setScreen("edit-info")} extra="Change your password" />
        <ProfileOption label="Payment Methods" icon="credit-card" extra="Add your credit/ Credit Cards" />
        <ProfileOption label="Invite Your Friends" icon="users" onPress={() => setScreen("invite")} extra="Get $3 for each invitation" />
      </View>
    </View>
  );
}