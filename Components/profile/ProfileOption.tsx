import { TouchableOpacity, Text, View, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type ProfileOptionProps = {
  label: string;
  icon: any;
  extra?: string;
  isLogout?: boolean;
  onPress?: () => void;
  isProfileScreen?: boolean; // Add this prop to check if it's the Profile screen
};

export default function ProfileOption({
  label,
  icon,
  extra,
  isLogout,
  onPress,
  isProfileScreen, // Destructure the new prop
}: ProfileOptionProps) {
  return (
    <TouchableOpacity className="flex-row justify-between items-center p-4" onPress={onPress}>
      <View className="flex-row flex-start items-center">
        <Image source={icon} style={{ width: 24, height: 24 }} />
        <View className="ml-4 px-4">
          <Text className="text-red-100 font-nunitosans text-2xl font-bold">{label}</Text>
          {extra && <Text className="text-primary-100 text-xl" numberOfLines={2}>{extra}</Text>}
        </View>
      </View>
      {isProfileScreen && !isLogout && (
        <FontAwesome name="chevron-right" size={14} color="#888" />
      )}
    </TouchableOpacity>
  );
}
