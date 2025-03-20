// chat.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  Chat: undefined;
  // Add other screens here if needed
};

type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Chat">;

type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
};

const ChatScreen: React.FC = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");

  const handleSend = () => {
    if (inputText.trim() === "") return;

    const userMessage: Message = { id: messages.length + 1, text: inputText, sender: "user" };
    setMessages([...messages, userMessage]);
    setInputText("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = { id: messages.length + 2, text: getAIResponse(inputText), sender: "ai" };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    }, 1000);
  };

  const getAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes("headache")) {
      return "I’m sorry to hear you’re dealing with a headache. To help you better, could you tell me what kind of headache you’re experiencing? For example, is it a tension headache, a migraine, or something else?";
    } else if (lowerInput.includes("tension headache") || lowerInput.includes("neck feels tight")) {
      return "For a tension headache, try to relax your neck and shoulders. Gentle stretching, a warm compress, or a massage might help. Staying hydrated and taking breaks from screens can also be beneficial.";
    } else {
      return "I’m here to assist with health-related questions. Please ask me something related to health.";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 p-4">
          {messages.map((message) => (
            <View
              key={message.id}
              className={`mb-4 ${
                message.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <View
                className={`p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-500"
                    : "bg-gray-300"
                }`}
              >
                <Text
                  className={`text-sm ${
                    message.sender === "user" ? "text-white" : "text-black"
                  }`}
                >
                  {message.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View className="flex-row p-4 border-t border-gray-300 bg-white">
          <TextInput
            className="flex-1 p-2 border border-gray-300 rounded-lg mr-2"
            placeholder="Type your message..."
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity
            className="p-3 bg-blue-500 rounded-lg"
            onPress={handleSend}
          >
            <Text className="text-white">Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;