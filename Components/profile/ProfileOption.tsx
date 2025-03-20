import { TouchableOpacity, Text, View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

type ProfileOptionProps = {
    label: string;
    icon?: any;
    extra?: string;
    isLogout?: boolean;
    onPress?: () => void;
  };


export default function ProfileOption({ label, icon, extra, isLogout, onPress }: ProfileOptionProps) {
  return (
    <TouchableOpacity className="flex-1 justify-between p-3 bg-gray-900 rounded-lg" onPress={onPress}>
      <View className="flex-row">
        <FontAwesome name={icon} size={22} color='red' />
        <View>
        <Text className="text-red-100 font-nunitosans text-2xl font-bold px-4">{label}</Text>
        <Text className="text-primary-100 text-xl px-4" numberOfLines={2}>{extra}</Text>
        </View>
      </View>
      
    </TouchableOpacity>
  );
}
