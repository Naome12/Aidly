import {
  View,
  Text,
  useWindowDimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router } from "expo-router";

const OnboardingItem = ({
  item,
  index,
  totalSlides,
  onNext,
}: {
  item: any;
  index: number;
  totalSlides: number;
  onNext: () => void;
}) => {
  const { width } = useWindowDimensions();

  return (
    <ImageBackground source={item.image} className="flex-1">
      <View className="flex-1">
        {/* Header Section */}
        <View className="flex-row justify-between p-3">
          <Text className="text-white">{`${index + 1}/${totalSlides}`}</Text>
          <TouchableOpacity
            onPress={() => router.replace("/(root)/(tabs)/voice")}
          >
            <Text className="font-nunitosans text-red-100 font-bold">Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content Section */}
        <View
          style={{ marginTop: 140, width }}
          className="flex-1 justify-center items-center"
        >
          <Text className="text-red-100 font-bold font-nunitosans text-xl text-center pt-10">
            {item.title}
          </Text>
          <Text className="text-white font-nunitosans text-sm text-center">
            {item.description}
          </Text>
        </View>

        {/* Bottom Section */}
        <View className="justify-end items-center pb-10">
          <TouchableOpacity
            onPress={() => {
              if (index === totalSlides - 1) {
                router.replace("/voice");
              } else {
                onNext();
              }
            }}
          >
            <Text className="text-red-100 font-bold text-lg">
              {index === totalSlides - 1 ? "Done" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default OnboardingItem;
