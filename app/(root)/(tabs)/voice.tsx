import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import images from "@/constants/images"; // Ensure this maps images.mic, images.aiSpeaking, images.Voice

const Voice = () => {
  const [status, setStatus] = useState<"idle" | "speaking" | "aiSpeaking">("idle");
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  // Reset status when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setStatus("idle");
    }, [])
  );

  const handlePressIn = () => {
    pressTimer.current = setTimeout(() => {
      setStatus("speaking");
    }, 500);
  };

  const handlePressOut = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }

    if (status === "speaking") {
      setStatus("aiSpeaking");
    } else {
      setStatus("idle");
    }
  };

  const handleInterrupt = () => {
    if (status === "aiSpeaking") {
      setStatus("idle");
    }
  };

  return (
    <ImageBackground source={images.profile} className="flex-1 justify-center items-center">
        {/* MIC Button */}
        <View className="justify-center items-center">
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleInterrupt}
            className="w-32 h-32 rounded-full justify-center items-center"
          >
            <Image
              source={status === "aiSpeaking" ? images.aiSpeaking : images.mic}
              className="w-100 h-100"
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>

        {/* Status Text */}
        <Text className="text-white text-2xl text-center mt-32">
          {status === "speaking"
            ? "You are Speaking"
            : status === "aiSpeaking"
            ? "Aidly AI is speaking..."
            : "Tap to Speak"}
        </Text>
   
    </ImageBackground>
  );
};

export default Voice;
