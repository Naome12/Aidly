// import { TouchableOpacity, Text, View } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";

// type ProfileOptionProps = {
//   label: string;
//   icon: any; // Ensure icon is a string
//   extra?: string;
//   isLogout?: boolean;
//   onPress?: () => void;
// };

// export default function ProfileOption({ label, icon, extra, isLogout, onPress }: ProfileOptionProps) {
//   return (
//     <TouchableOpacity className="flex-row justify-between items-center p-3 bg-gray-900 rounded-lg" onPress={onPress}>
//       <View className="flex-row items-center">
//         <FontAwesome name={icon} size={22} color='red' />
//         <View className="ml-4">
//           <Text className="text-red-100 font-nunitosans text-2xl font-bold">{label}</Text>
//           {extra && <Text className="text-primary-100 text-xl" numberOfLines={2}>{extra}</Text>}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// }


// export default function ProfileOption({ label, icon, extra, isLogout, onPress }: ProfileOptionProps) {
//   return (
//     <TouchableOpacity className="flex-row justify-between items-center p-3 bg-gray-900 rounded-lg" onPress={onPress}>
//       <View className="flex-row items-center space-x-4">
//         <FontAwesome name={icon} size={22} color={isLogout ? "red" : "white"} />
//         <Text className="text-lg text-red-100">{label}</Text>
//       </View>
//       {extra && <Text className="text-primary-100">{extra}</Text>}
//     </TouchableOpacity>
//   );
// }

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
      <View className="flex-row items-center">
        <FontAwesome name={icon} size={22} color='red' />
        <View className="ml-4 px-4">
          <Text className="text-red-100 font-nunitosans text-2xl font-bold">{label}</Text>
          {extra && <Text className="text-primary-100 text-xl" numberOfLines={2}>{extra}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
}
