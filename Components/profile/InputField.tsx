import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { ReactNode } from "react";

type InputFieldProps = {
  label?: string;
  leftIcon: ReactNode;
  rightIcon: ReactNode;
  placeholder: string;
  secure?: boolean;
};

export default function InputField({ label, leftIcon, rightIcon, placeholder, secure }: InputFieldProps) {
  return (
    <View className="w-full">
      <Text className="text-primary-100 mb-1">{label}</Text>
      <View className="flex-row items-center bg-gray-900 p-3 rounded-lg">
        {/* Left Icon */}
        <View className="mr-3">{leftIcon}</View>
        
        {/* Text Input */}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#AEA1E9"
          secureTextEntry={secure}
          className="flex-1 text-white bg-black-300"
        />
        
        {/* Right Icon (Touchable for edit action) */}
        <TouchableOpacity>{rightIcon}</TouchableOpacity>
      </View>
    </View>
  );
}
