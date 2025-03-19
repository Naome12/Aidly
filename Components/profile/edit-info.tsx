import { View, Text, TouchableOpacity } from "react-native";
import InputField from "./InputField";

type EditInfoProps = {
    setScreen: (screen: "preference" | "edit-info" | "invite" | "index") => void;
  };

export default function EditInfo({ setScreen }: EditInfoProps) {
  return (
    <View className="flex-1 bg-black px-6 pt-12">
      <Text className="text-white text-2xl font-bold">Edit Information</Text>

      <View className="mt-6 space-y-4">
        <InputField label="Full Name" placeholder="Enter name" />
        <InputField label="Email" placeholder="Enter email" />
        <InputField label="Password" placeholder="Enter password" secure />
      </View>

      <TouchableOpacity className="bg-red-500 p-4 rounded-lg mt-6" onPress={() => setScreen("preference")}>
        <Text className="text-white text-center text-lg">Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}
