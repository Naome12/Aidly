import React, { useState, useEffect } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import * as Speech from "expo-speech";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showStopIcon, setShowStopIcon] = useState(false);

  const API_KEY = "AIzaSyCjAP08KIqM-bEEthOa2HvCaGsL_ok7uOs";

  useEffect(() => {
    const startChat = async () => {
      try {
        const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = "hello! ";
        const result = await model.generateContent(prompt);

        console.log("API Response:", result);
        const text = result.response ? result.response.text() : "Error fetching response";
        showMessage({
          message: "Welcome to Gemini Chat 🤖",
          description: text,
          type: "info",
          icon: "info",
          duration: 2000,
        });

        setMessages([{ text, user: false }]);
      } catch (error) {
        console.log("Error fetching from API:", error);
      }
    };
    startChat();
  }, []);

  const sendMessage = async () => {
    setLoading(true);
    const userMessage = { text: userInput, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = userMessage.text;
      const result = await model.generateContent(prompt);
      const text = result.response ? result.response.text() : "Error fetching response";

      setMessages((prevMessages) => [...prevMessages, { text, user: false }]);
      setLoading(false);
      setUserInput("");

      if (text && !isSpeaking) {
        Speech.speak(text);
        setIsSpeaking(true);
        setShowStopIcon(true);
      }
    } catch (error) {
      console.log("Error sending message:", error);
      setLoading(false);
    }
  };

  const toggleSpeech = () => {
    console.log("isSpeaking", isSpeaking);
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      Speech.speak(messages[messages.length - 1].text);
      setIsSpeaking(true);
    }
  };

  const ClearMessage = () => {
    setMessages([]);
    setIsSpeaking(false);
  };

  const renderMessage = ({ item }) => (
    <View style={{ padding: 12, marginVertical: 8 }}>
      {item.text ? (
        <Text style={{ fontSize: 18, color: item.user ? "#3b82f6" : "#000000" }}>
          {item.text}
        </Text>
      ) : (
        <Text style={{ color: "#ef4444" }}>Error: No text</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#ffffff", marginTop: 48 }}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          inverted
          extraData={messages}
        />
        <View style={{ flexDirection: "row", alignItems: "center", padding: 12 }}>
          <TouchableOpacity
            style={{
              padding: 12,
              backgroundColor: "#1f2937",
              borderRadius: 9999,
              height: 48,
              width: 48,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 8,
            }}
            onPress={toggleSpeech}
          >
            {isSpeaking ? (
              <FontAwesome
                name="microphone-slash"
                size={24}
                color="white"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            ) : (
              <FontAwesome
                name="microphone"
                size={24}
                color="white"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            )}
          </TouchableOpacity>
          <TextInput
            placeholder="Type a message"
            onChangeText={setUserInput}
            value={userInput}
            onSubmitEditing={sendMessage}
            style={{
              flex: 1,
              padding: 12,
              backgroundColor: "#1f2937",
              color: "#ffffff",
              borderRadius: 8,
              height: 48,
            }}
            placeholderTextColor="#ffffff"
          />
          {showStopIcon && (
            <TouchableOpacity
              style={{
                padding: 12,
                backgroundColor: "#1f2937",
                borderRadius: 9999,
                height: 48,
                width: 48,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 8,
              }}
              onPress={ClearMessage}
            >
              <Entypo name="controller-stop" size={24} color="white" />
            </TouchableOpacity>
          )}
          {loading && <ActivityIndicator size="large" color="black" />}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GeminiChat;