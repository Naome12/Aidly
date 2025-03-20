import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import ProfileOption from "./ProfileOption";
import { useGlobalContext } from "@/lib/globalProvider";
import { logout } from "@/lib/appwrite";
import { Ionicons } from "@expo/vector-icons";

type ProfileDetailsProps = {
  setScreen: (screen: "preference" | "edit-info" | "invite" | "index") => void;
};

export default function ProfileDetails({ setScreen }: ProfileDetailsProps) {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert("Success", "You have been logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "An error occurred");
    }
    console.log("logout");
  };

  return (
    <View className="flex-1 bg-black px-6 pt-12">
      <TouchableOpacity
        onPress={() => setScreen("preference")}
        className="mb-4 flex-row items-center"
      >
        <Ionicons name="chevron-back-outline" size={28} color="white" />
        <Text className="font-nunitosans font-bold text-3xl text-red-100 px-6">
          Profile
        </Text>
      </TouchableOpacity>

      <View className="items-center">
        <Image
          source={{ uri: user?.avatar }}
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            borderWidth: 3,
            borderColor: "#AEA1E9",
          }}
          resizeMode="cover"
        />
        <Text className="text-red-100 text-2xl font-bold mt-2 capitalize">
        {user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}
        </Text>
        <Text className="text-gray-400 text-sm">{user?.email}</Text>
      </View>

      <View className="mt-8 space-y-6">
        <ProfileOption
          label="Preferences"
          icon="cog"
          onPress={() => setScreen("preference")}
        />
        <ProfileOption label="Account Security" icon="lock" extra="Excellent" />
        <ProfileOption label="Customer Support" icon="lock" />
        <ProfileOption label="Logout" icon="lock" onPress={handleLogout} />
      </View>
    </View>
  );
}
