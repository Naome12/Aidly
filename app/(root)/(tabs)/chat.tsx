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
import { StatusBar } from "expo-status-bar";
import images from "@/constants/images";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// 🔴 Replace with your actual API key
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const AidlyChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
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
      model.current = genAI.current.getGenerativeModel({ model: "gemini-2.0-flash" });

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

      const text = result?.response.text() || "Hello! I'm Aidly AI, your health assistant. How can I help you today?";

      setMessages([{ id: Date.now().toString(), text, isUser: false }]);
    } catch (error) {
      console.error("🚨 Error generating initial greeting:", error);
      setMessages([
        {
          id: Date.now().toString(),
          text: "Hello! I'm Aidly AI, your health assistant. How can I help you today?",
          isUser: false,
        },
      ]);
    }
    setIsLoading(false);
  };

  // ✅ Sending Messages
  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = { id: Date.now().toString(), text: inputText, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      if (!model.current) {
        throw new Error("Model not initialized correctly.");
      }

      // Health-related filter in prompt
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

      const responseText = result?.response.text() || "Sorry, I couldn't process that request.";

      const aiMessage = { id: Date.now().toString(), text: responseText, isUser: false };
      setMessages((prev) => [...prev, aiMessage]);
      speakText(responseText);
    } catch (error) {
      console.error("🚨 API Error:", error.message);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Error processing your request. Please try again later.",
          isUser: false,
        },
      ]);
    }

    setIsLoading(false);
  };

  // ✅ Text-to-Speech
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
    <SafeAreaView className="h-[90%] bg-gray-900">
      <StatusBar style="light" />
      <View className="flex-row items-center justify-between pt-8 pb-4 bg-gray-800 border-b border-gray-700">
        <View className="flex-row px-4">
          <Image source={images.aidlyLogo} className="size-12" />
          <View className="px-2">
            <Text className="text-xl font-bold text-red-500">Aidly AI</Text>
            <Text className="text-primary-100">Online</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setMessages([])}>
          <FontAwesome name="trash" size={18} color="#FE1B1B" />
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <View
            className={`p-3 rounded-lg max-w-80 ${
              item.isUser ? "bg-gray-700 self-end" : "bg-gray-800 self-start"
            }`}
          >
            <Text className="text-white">{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        className="flex-1 px-3"
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      />

      {isLoading && (
        <View className="flex-row items-center justify-center p-2 bg-gray-800">
          <ActivityIndicator size="small" color="#ff3333" />
          <Text className="text-white ml-2">Aidly is thinking...</Text>
        </View>
      )}

      {/* Input Box */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? insets.bottom + 40 : 0}
      >
        <View
          className="flex-row items-center p-3 bg-gray-500 border-t border-gray-700"
          style={{ paddingBottom: insets.bottom }}
        >
          <TextInput
            className="flex-1 p-2 text-white bg-gray-700 rounded-lg"
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask Aidly AI..."
            placeholderTextColor="#888888"
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            className="p-3 ml-2 bg-red-500 rounded-full"
            onPress={sendMessage}
          >
            <FontAwesome name="send" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AidlyChatbot;
