import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as GoogleGenerativeAI from "@google/generative-ai";
import * as Speech from "expo-speech";
import { FontAwesome } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";
import { StatusBar } from "expo-status-bar";
import images from "@/constants/images";

const API_KEY = "YOUR_API_KEY_HERE";

const AidlyChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const flatListRef = useRef(null);
  const genAI = useRef(null);
  const model = useRef(null);

  useEffect(() => {
    genAI.current = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    model.current = genAI.current.getGenerativeModel({ model: "gemini-pro" });
    sendInitialGreeting();
  }, []);

  const sendInitialGreeting = async () => {
    setIsLoading(true);
    try {
      const result = await model.current.generateContent("Introduce yourself as Aidly AI, a helpful assistant.");
      const text = result.response ? result.response.text() : "Hello! I'm Aidly AI.";
      setMessages([{ id: Date.now().toString(), text, isUser: false }]);
    } catch {
      setMessages([{ id: Date.now().toString(), text: "Hello! I'm Aidly AI.", isUser: false }]);
    }
    setIsLoading(false);
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;
    const userMessage = { id: Date.now().toString(), text: inputText, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);
    try {
      const result = await model.current.generateContent(userMessage.text);
      const responseText = result.response ? result.response.text() : "I couldn't process that request.";
      const aiMessage = { id: Date.now().toString(), text: responseText, isUser: false };
      setMessages((prev) => [...prev, aiMessage]);
      speakText(responseText);
    } catch {
      setMessages((prev) => [...prev, { id: Date.now().toString(), text: "Error processing your request.", isUser: false }]);
    }
    setIsLoading(false);
  };

  const speakText = (text) => {
    Speech.speak(text, {
      language: "en",
      pitch: 1.0,
      rate: 0.9,
      onStart: () => setIsSpeaking(true),
      onDone: () => setIsSpeaking(false),
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      <View className="flex-row items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <Image source={images.aidlyLogo} className="w-8 h-8" />
        <Text className="text-xl font-bold text-red-500">Aidly AI</Text>
        <TouchableOpacity onPress={() => setMessages([])}>
          <FontAwesome name="trash" size={18} color="#FE1B1B" />
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <View className={`p-3 rounded-lg max-w-80 ${item.isUser ? "bg-gray-700 self-end" : "bg-gray-800 self-start"}`}>
            <Text className="text-white">{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        className="flex-1 px-3"
      />
      {isLoading && (
        <View className="flex-row items-center justify-center p-2 bg-gray-800">
          <ActivityIndicator size="small" color="#ff3333" />
          <Text className="text-white ml-2">Aidly is thinking...</Text>
        </View>
      )}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className="flex-row items-center p-3 bg-gray-800 border-t border-gray-700">
          <TextInput
            className="flex-1 p-2 text-white bg-gray-700 rounded-lg"
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask Aidly AI..."
            placeholderTextColor="#888888"
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity className="p-3 ml-2 bg-red-500 rounded-full" onPress={sendMessage}>
            <FontAwesome name="send" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AidlyChatbot;
