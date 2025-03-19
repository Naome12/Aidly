import { TouchableOpacity, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type ProfileOptionProps = {
    label: string;
    icon: any;
    extra?: string;
    isLogout?: boolean;
    onPress?: () => void;
  };


export default function ProfileOption({ label, icon, extra, isLogout, onPress }: ProfileOptionProps) {
  return (
    <TouchableOpacity className="flex-row justify-between items-center p-3 bg-gray-900 rounded-lg" onPress={onPress}>
      <View className="flex-row items-center space-x-4">
        <FontAwesome name={icon} size={22} className="text-red-100" />
        <Text className="text-red-100">{label}</Text>
      </View>
      {extra && <Text className="text-red-500">{extra}</Text>}
    </TouchableOpacity>
  );
}
