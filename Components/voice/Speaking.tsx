import images from "@/constants/images";
import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const VoiceScreen = () => {
  const [status, setStatus] = useState<"idle" | "speaking" | "aiSpeaking">("idle");
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  // Reset status to "idle" when returning to this screen
  useFocusEffect(
    React.useCallback(() => {
      setStatus("idle");
    }, [])
  );

  const handlePressIn = () => {
    // Start a timer when the button is pressed
    pressTimer.current = setTimeout(() => {
      setStatus("speaking"); // Simulating user speaking after 2 seconds
    }, 500);
  };

  const handlePressOut = () => {
    // Clear the timer if the button is released before 2 seconds
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }

    if (status === "speaking") {
      setStatus("aiSpeaking"); // Simulating AI response
    } else {
      setStatus("idle"); // If the press was less than 2 seconds, reset to idle
    }
  };

  const handleInterrupt = () => {
    if (status === "aiSpeaking") {
      setStatus("idle"); // Interrupt AI and return to mic state
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black-100 px-6">
      {/* Status Text */}
      <View className="mt-10 mb-8">
        <Text className="text-white text-lg text-center">
          {status === "speaking"
            ? "You are Speaking"
            : status === "aiSpeaking"
            ? "Aidly AI is speaking..."
            : "Tap to Speak"}
        </Text>
      </View>

      {/* Voice Interaction Button */}
      <View className="items-center">
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleInterrupt}
          className="w-24 h-24 rounded-full  "
        >
          <Image
            source={
              status === "aiSpeaking"
                ? images.aiSpeaking
                : images.mic
            }
            className="w-16 h-16"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VoiceScreen;