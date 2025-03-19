import { View, Text, TextInput } from "react-native";


type InputFieldProps = {
    label: string;
    placeholder: string;
    secure?: boolean;
  };


export default function InputField({ label, placeholder, secure } :InputFieldProps) {
  return (
    <View>
      <Text className="text-gray-400">{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="gray"
        secureTextEntry={secure}
        className="bg-gray-900 p-3 rounded-lg text-white mt-1"
      />
    </View>
  );
}
