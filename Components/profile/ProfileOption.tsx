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
    <TouchableOpacity className="flex-row justify-between items-center p-3  rounded-lg" onPress={onPress}>
      <View className="flex-row flex-start items-center">
        <FontAwesome name={icon} size={22} color='red'  className=""/>
        <View className="ml-4 px-4">
          <Text className="text-red-100 font-nunitosans text-2xl font-bold">{label}</Text>
          {extra && <Text className="text-primary-100 text-xl" numberOfLines={2}>{extra}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
}
