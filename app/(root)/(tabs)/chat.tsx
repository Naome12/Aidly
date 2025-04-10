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
  ImageBackground,
} from "react-native";
import * as GoogleGenerativeAI from "@google/generative-ai";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from "expo-status-bar";
import images from "@/constants/images";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const AidlyChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);
  const genAI = useRef(null);
  const model = useRef(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    initializeModel();
    sendInitialGreeting();
  }, []);

  // ✅ Correct API Initialization
  const initializeModel = async () => {
    try {
      genAI.current = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      model.current = genAI.current.getGenerativeModel({
        model: "gemini-2.0-flash",
      });

      console.log("✅ Google Generative AI model initialized successfully");
    } catch (error) {
      console.error("🚨 Failed to initialize AI model:", error);
    }
  };

  // ✅ Initial Greeting Message
  const sendInitialGreeting = async () => {
    setIsLoading(true);
    try {
      if (!model.current) {
        throw new Error("Model not initialized yet.");
      }

      const result = await model.current.generateContent(
        "Introduce yourself as Aidly AI, a health assistant. Only answer health-related questions."
      );

      const text =
        result?.response.text() ||
        "Hello! I'm Aidly AI, your health assistant. How can I help you today?";

      const timestamp = new Date().toLocaleTimeString(); // Timestamp for greeting
      setMessages([{ id: Date.now().toString(), text, isUser: false, timestamp }]);
    } catch (error) {
      console.error("🚨 Error generating initial greeting:", error);
      setMessages([{
        id: Date.now().toString(),
        text: "Hello! I'm Aidly AI, your health assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      }]);
    }
    setIsLoading(false);
  };

  // ✅ Sending Messages
  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const timestamp = new Date().toLocaleTimeString(); // Timestamp for user message
    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      if (!model.current) {
        throw new Error("Model not initialized correctly.");
      }

      const prompt = `
        You are Aidly AI, a smart, friendly, and engaging health assistant. Your job is to provide **accurate, clear, and interesting** answers to health-related questions in a cool, conversational tone. 

🩺 **Health Focus**: You only answer health-related questions, including fitness, nutrition, mental well-being, medical advice (but no diagnoses), and general wellness tips.

🚫 **Off-Topic Handling**: If asked about non-health topics, respond playfully while steering the conversation back.  
   - Example: *"I'm all about health, but I can’t prescribe stocks or decode alien messages! Got any fitness or wellness questions?"*

😎 **Cool & Engaging Tone**: Your responses should be fun, slightly playful, and engaging—like a friendly doctor who loves a good chat.  
   - Example: Instead of *"Exercise helps with weight loss,"* say *"Think of exercise as your body’s way of high-fiving you! It burns calories, boosts mood, and keeps you feeling awesome."*

🔬 **Science-Backed Answers**: Provide responses that are factual and easy to understand, avoiding overly complex medical jargon.

📢 **Encourage Conversations**: End responses with follow-up questions to keep the chat going.  
   - Example: *"Staying hydrated is key! Do you prefer plain water, or are you a flavored water kind of person?"*

🎤 **Voice-Ready**: Since your responses might be read aloud, make sure they sound natural and engaging.

--- 
🔥 **Example Q&A**
👤 **User:** "How do I boost my energy levels?"  
🤖 **Aidly:** "Great question! Your energy tank runs on three fuels: **sleep, food, and movement**. Skip one, and you’ll feel like a phone stuck at 10% battery!  
- **Sleep**: Aim for 7-9 hours to let your body recharge.  
- **Food**: Whole grains, proteins, and good fats keep energy steady—no sugar crashes!  
- **Exercise**: Even a quick stretch can wake up your system!  

What’s your go-to energy booster: coffee, naps, or something else?"  

Question: ${userMessage.text}
      `;

      const result = await model.current.generateContent(prompt);

      if (!result) {
        throw new Error("Empty response from API.");
      }

      const responseText =
        result?.response.text() || "Sorry, I couldn't process that request.";

      const aiMessage = {
        id: Date.now().toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(), // Timestamp for AI response
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("🚨 API Error:", error.message);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Error processing your request. Please try again later.",
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <ImageBackground source={images.profile} className="flex-1 p-6">
      <SafeAreaView className="h-[90%]">
        <StatusBar style="light" />
        <View className="flex-row items-center justify-between pt-8 pb-4 border-b border-gray-700">
          <View className="flex-row px-4">
            <Image source={images.aidlyLogo} className="size-12" />
            <View className="px-2">
              <Text className="text-xl font-bold text-red-100">Aidly AI</Text>
              <Text className="text-primary-100">Online</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setMessages([])} className="flex-row">
            <Ionicons name="call" size={25} color="white" className="p-3 bg-[#33333350] rounded-full" />
            <Ionicons name="videocam-sharp" size={24} color="white" className="p-3 bg-[#33333350] rounded-full ml-3" />
          </TouchableOpacity>
        </View>

        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => (
            <View
              className={`p-3 rounded-lg max-w-60 m-2 font-nunitosans ${
                item.isUser ? "bg-red-100 self-end" : "bg-[#34343480] self-start"
              }`}
            >
              <Text className="text-white-100">{item.text}</Text>
              <Text className="text-white-50 text-xs mt-1">{item.timestamp}</Text> {/* Timestamp */}
            </View>
          )}
          keyExtractor={(item) => item.id}
          className="flex-1 px-3"
          contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        />

        {isLoading && (
          <View className="flex-row items-center justify-center p-2">
            <ActivityIndicator size="small" color="#ff3333" />
            <Text className="text-white-100 ml-2">Aidly is thinking...</Text>
          </View>
        )}

        {/* Input Box */}
        <KeyboardAvoidingView>
          <View className="flex-row items-center p-3">
            <TextInput
              className="flex-1 p-5 text-white bg-[#33333380] rounded-lg"
              value={inputText}
              onChangeText={setInputText}
              placeholder="Write now..."
              placeholderTextColor="#888888"
              returnKeyType="send"
              onSubmitEditing={sendMessage}
              style={{ marginBottom: 0 }}
            />
            <TouchableOpacity className="p-3 ml-2 bg-red-100 rounded-full" onPress={sendMessage}>
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AidlyChatbot;
