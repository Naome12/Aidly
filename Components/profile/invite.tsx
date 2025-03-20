import images from "@/constants/images";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type InviteFriendProps = {
    setScreen: (screen: "preference" | "edit-info" | "invite" | "index") => void;
  };
  

export default function InviteFriend({ setScreen }:InviteFriendProps) {
  return (
    <SafeAreaView className="flex-1">
        <TouchableOpacity onPress={() => setScreen("preference")} className="mb-4">
          <View className="bg-black-300 size-6 ">
        <Ionicons name="chevron-back-outline" size={28} color="#757474" />
          </View>
      </TouchableOpacity>
      <ScrollView >
        <View className="flex-1 justify-between items-center">

        <View className="mb-6">
            <Text className="text-red-100 font-nunitosans font-bold">Invite Friends</Text>
        </View>
            <Image source={images.friends}/>

        <View className="items-center">
      <Text className="text-red-100 text-2xl font-bold">Refer A Friend</Text>
      <Text className="text-primary-100 text-center mt-2">Share Your Promo Code & Get $3 for Each Friend</Text>
        </View>

      <TouchableOpacity className="px-6 py-4 rounded-lg mt-6 border border-red-100">
        <Text className="text-red-100 text-lg">BrainAiPartnerMR</Text>
      </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
