import images from "@/constants/images";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type InviteFriendProps = {
    setScreen: (screen: "preference" | "edit-info" | "invite" | "index") => void;
  };
  

export default function InviteFriend({ setScreen }:InviteFriendProps) {
  return (
    <View className="flex-1 justify-between items-center">
        <TouchableOpacity onPress={() => setScreen("preference")} className="mb-4">
        <Ionicons name="chevron-back-outline" size={28} color="white" />
      </TouchableOpacity>
        <View>
            <Text className="text-red-100 font-nunitosans font-bold">Invite Friends</Text>
            <Image source={images.friends}/>
        </View>

        <View>
      <Text className="text-red-100 text-2xl font-bold">Refer A Friend</Text>
      <Text className="text-primary-100 text-center mt-2">Share Your Promo Code & Get $3 for Each Friend</Text>
        </View>

      <TouchableOpacity className="px-6 py-4 rounded-lg mt-6 border border-red-100">
        <Text className="text-red-100 text-lg">BrainAiPartnerMR</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-red-500 p-4 rounded-lg mt-6" onPress={() => setScreen("preference")}>
        <Text className="text-white text-lg">Back</Text>
      </TouchableOpacity>
    </View>
  );
}
