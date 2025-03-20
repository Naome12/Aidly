import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import ProfileOption from "./ProfileOption";
import { useGlobalContext } from "@/lib/globalProvider";
import { logout } from "@/lib/appwrite";
import { Ionicons } from "@expo/vector-icons";

type ProfileDetailsProps = {
    setScreen: (screen: "preference" | "edit-info" | "invite" | "index") => void;
  };

export default function ProfileDetails({ setScreen }:ProfileDetailsProps) {
    const {user, refetch} = useGlobalContext();
    const handleLogout = async() => {
      const result = await logout();
  
      if(result) {
        Alert.alert('Success', 'You have been logged out successfully')
        refetch();
      } else {
        Alert.alert('Error', 'An error occured')
      }
      console.log('logout')
    }
  return (
    <View className="flex-1 bg-black px-6 pt-12">

<TouchableOpacity onPress={() => setScreen("preference")} className="mb-4">
        <Ionicons name="chevron-back-outline" size={28} color="white" />
      </TouchableOpacity>
        
      <View className="items-center">
      <Image source={{uri: user?.avatar}} className="size-12 rounded-full"  />
        <Text className="text-white text-xl font-bold mt-2">{user?.name}</Text>
        <Text className="text-gray-400 text-sm">{user?.email}</Text>
      </View>

      <View className="mt-8 space-y-6">
        <ProfileOption label="Preferences" icon="cog" onPress={() => setScreen("preference")} />
        <ProfileOption label="Account Security" icon="lock" extra="Excellent" />
        <ProfileOption label="Customer Support" icon="help-circle-outline" />
        <ProfileOption label="Logout" icon="log-out-outline" onPress={handleLogout}/>
      </View>
    </View>
  );
}
