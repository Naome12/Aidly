import { View, Text } from "react-native";
import ProfileOption from "./ProfileOption";


type PreferencesProps = {
    setScreen: (screen: "preference" | "edit-info" | "invite" | "index") => void;
  };

export default function Preferences({ setScreen }: PreferencesProps) {
  return (
    <View className="flex-1 bg-black px-6 pt-12">
      <Text className="text-white text-2xl font-bold">Preferences</Text>

      <View className="mt-6 space-y-6">
        <ProfileOption label="Account Information" icon="user" onPress={() => setScreen("index")} />
        <ProfileOption label="Password" icon="lock" onPress={() => setScreen("edit-info")} />
        <ProfileOption label="Payment Methods" icon="credit-card" />
        <ProfileOption label="Invite Your Friends" icon="users" onPress={() => setScreen("invite")} />
      </View>
    </View>
  );
}
