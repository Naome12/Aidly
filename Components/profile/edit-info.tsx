import { View, Text, TouchableOpacity } from "react-native";
import InputField from "./InputField";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have @expo/vector-icons installed
import { SafeAreaView } from "react-native-safe-area-context";

type EditInfoProps = {
  setScreen: (screen: "preference" | "edit-info" | "invite" | "index") => void;
};

export default function EditInfo({ setScreen }: EditInfoProps) {
  return (
    <SafeAreaView className="flex-1 px-6">
      {/* Back Button */}
      <View className="flex-row ">
        <TouchableOpacity
          onPress={() => setScreen("preference")}
          className="mb-4"
        >
          <Ionicons name="chevron-back-outline" size={28} color="#757474" />
        </TouchableOpacity>

        <Text className="text-red-100 text-2xl font-bold mb-6 px-6">
          Edit Information
        </Text>
      </View>

      {/* Header */}
      {/* Input Fields */}
      <View className="space-y-4">
        <InputField
          placeholder="Enter name"
          leftIcon={<Ionicons name="person-outline" size={20} color="#AEA1E9" />}
          rightIcon={<Ionicons name="create-outline" size={20} color="#AEA1E9" />}
        />
        <InputField
          placeholder="Enter email"
          leftIcon={<Ionicons name="mail-outline" size={20} color="#AEA1E9" />}
          rightIcon={<Ionicons name="create-outline" size={20} color="#AEA1E9" />}
          
        />
        <InputField
          placeholder="Enter password"
          secure
          leftIcon={
            <Ionicons name="lock-closed-outline" size={20} color="#AEA1E9" />
          }
          rightIcon={<Ionicons name="create-outline" size={20} color="#AEA1E9" />}
        />
      </View>

      {/* Save Changes Button */}
      <TouchableOpacity
        style={{
          paddingVertical: 16, // Keeps vertical padding the same
          paddingHorizontal: 4, // Reduces horizontal padding
          // borderRadius: 8,
          marginTop: 24,
          // borderWidth: 0.4,
          // borderColor: "#AEA1E9",
        }}
        onPress={() => setScreen("preference")}
        className="bg-black"
      >
        <Text style={{ color: "red", textAlign: "center", fontSize: 18 }}>
          Save Changes
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
