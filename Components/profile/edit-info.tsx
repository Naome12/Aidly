import { View, Text, TouchableOpacity } from "react-native";
import InputField from "./InputField";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have @expo/vector-icons installed

type EditInfoProps = {
  setScreen: (screen: "preference" | "edit-info" | "invite" | "index") => void;
};

export default function EditInfo({ setScreen }: EditInfoProps) {
  return (
    <View className="flex-1 bg-black px-6 pt-12">
      {/* Back Button */}
      <TouchableOpacity onPress={() => setScreen("preference")} className="mb-4">
        <Ionicons name="chevron-back-outline" size={28} color="white" />
      </TouchableOpacity>

      {/* Header */}
      <Text className="text-white text-2xl font-bold mb-6">Edit Information</Text>

      {/* Input Fields */}
      <View className="space-y-4">
        <InputField
          label="Full Name"
          placeholder="Enter name"
          leftIcon={<Ionicons name="person-outline" size={20} color="white" />}
          rightIcon={<Ionicons name="create-outline" size={20} color="white" />}
        />
        <InputField
          label="Email"
          placeholder="Enter email"
          leftIcon={<Ionicons name="mail-outline" size={20} color="white" />}
          rightIcon={<Ionicons name="create-outline" size={20} color="white" />}
        />
        <InputField
          label="Password"
          placeholder="Enter password"
          secure
          leftIcon={<Ionicons name="lock-closed-outline" size={20} color="white" />}
          rightIcon={<Ionicons name="create-outline" size={20} color="white" />}
        />
      </View>

      {/* Save Changes Button */}
      <TouchableOpacity className="bg-red-600 p-4 rounded-lg mt-6" onPress={() => setScreen("preference")}>
        <Text className="text-white text-center text-lg">Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}
