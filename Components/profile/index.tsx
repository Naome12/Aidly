import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import ProfileOption from "./ProfileOption";
import { useGlobalContext } from "@/lib/globalProvider";
import { logout } from "@/lib/appwrite";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";

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
    <SafeAreaView className="flex-1 px-4">
      <ScrollView className="flex-grow py-20">
        <TouchableOpacity
          onPress={() => setScreen("preference")}
          className="mb-4 flex-row  justify-between"
        >
          <Ionicons name="chevron-back-outline" size={28} color="#757474" />
          <Text className="font-nunitosans font-bold text-2xl text-red-100 px-6 pb-4 flex-1 text-center">
            Profile
          </Text>
        </TouchableOpacity>

        <View className="items-center mb-4 mt-4">
          <Image
            source={{ uri: user?.avatar }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 48,
              borderWidth: 1,
              borderColor: "red",
            }}
            resizeMode="cover"
          />
          <Text className="text-red-100 text-3xl font-bold mt-2 capitalize">
            {user?.name}
          </Text>
          <Text className="text-primary-100 font-extralight text-sm">
            {user?.email}
          </Text>
        </View>

        <View className="mt-4 space-y-4 ">
          <ProfileOption
            label="Preferences"
            icon={icons.settings}
            onPress={() => setScreen("preference")}
            isProfileScreen
          />
          <ProfileOption
            label="Account Security"
            icon={icons.lock}
            extra="Excellent"
            isProfileScreen
          />
          <ProfileOption label="Customer Support" icon={icons.help} isProfileScreen />
          <ProfileOption
            label="Logout"
            icon={icons.logout}
            onPress={handleLogout}
            isLogout
            isProfileScreen
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
