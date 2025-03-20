import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as GoogleGenerativeAI from "@google/generative-ai";
import * as Speech from "expo-speech";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";
import { StatusBar } from "expo-status-bar";
import images from "@/constants/images";

// Define message interface
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// API Key - In production, this should be stored securely
const API_KEY = "AIzaSyCjAP08KIqM-bEEthOa2HvCaGsL_ok7uOs";

const AidlyChatbot = () => {
  // State management
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Refs
  const flatListRef = useRef<FlatList>(null);
  const genAI = useRef<GoogleGenerativeAI.GoogleGenerativeAI | null>(null);
  const model = useRef<any>(null);

  // Initialize Gemini AI
  useEffect(() => {
    genAI.current = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    model.current = genAI.current.getGenerativeModel({ model: "gemini-pro" });
    
    // Send initial greeting
    sendInitialGreeting();
  }, []);

  // Send initial greeting
  const sendInitialGreeting = async () => {
    try {
      setIsLoading(true);
      const result = await model.current.generateContent("Introduce yourself as Aidly AI, a helpful assistant. Keep it brief.");
      const text = result.response ? result.response.text() : "Hello! I'm Aidly AI, your helpful assistant. How can I help you today?";
      
      const initialMessage: Message = {
        id: Date.now().toString(),
        text,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages([initialMessage]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending initial greeting:", error);
      setIsLoading(false);
      
      // Fallback message in case of error
      const fallbackMessage: Message = {
        id: Date.now().toString(),
        text: "Hello! I'm Aidly AI, your helpful assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages([fallbackMessage]);
    }
  };

  // Send user message and get AI response
  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText("");
    setIsLoading(true);
    
    try {
      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
      
      // Get AI response
      const result = await model.current.generateContent(userMessage.text);
      const responseText = result.response ? result.response.text() : "I'm sorry, I couldn't process that request.";
      
      // Add AI response to chat
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setIsLoading(false);
      
      // Speak the response
      speakText(responseText);
      
      // Scroll to bottom again after response
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setIsLoading(false);
      
      // Add error message to chat
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "I'm sorry, I encountered an error processing your request. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  // Speak text using text-to-speech
  const speakText = (text: string) => {
    if (isSpeaking) {
      Speech.stop();
    }
    
    Speech.speak(text, {
      language: 'en',
      pitch: 1.0,
      rate: 0.9,
      onStart: () => setIsSpeaking(true),
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  // Toggle speech
  const toggleSpeech = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      // Find the last AI message
      const lastAiMessage = [...messages].reverse().find(msg => !msg.isUser);
      if (lastAiMessage) {
        speakText(lastAiMessage.text);
      }
    }
  };

  // Clear chat history
  const clearChat = () => {
    Speech.stop();
    setIsSpeaking(false);
    setMessages([]);
    sendInitialGreeting();
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  // Render message item
  const renderMessageItem = ({ item }: { item: Message }) => {
    if (item.isUser) {
      // User message
      return (
        <View style={styles.userMessageContainer}>
          <View style={styles.userMessage}>
            <View style={styles.messageHeader}>
              <View style={styles.userInfo}>
                <Image source={images.profile} style={styles.avatar} />
                <Text style={styles.userName}>You</Text>
              </View>
              <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
            </View>
            <Text style={styles.userMessageText}>{item.text}</Text>
          </View>
        </View>
      );
    } else {
      // AI message
      return (
        <View style={styles.aiMessageContainer}>
          <View style={styles.aiMessage}>
            <View style={styles.messageHeader}>
              <View style={styles.userInfo}>
                <Image source={images.aidlyLogo} style={styles.avatar} />
                <Text style={styles.aiName}>Aidly AI</Text>
              </View>
              <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
            </View>
            <Markdown
              style={{
                body: { color: '#ffffff' },
                heading1: { color: '#ff3333', fontWeight: 'bold' },
                heading2: { color: '#ff3333', fontWeight: 'bold' },
                heading3: { color: '#ff3333', fontWeight: 'bold' },
                heading4: { color: '#ff3333', fontWeight: 'bold' },
                heading5: { color: '#ff3333', fontWeight: 'bold' },
                heading6: { color: '#ff3333', fontWeight: 'bold' },
                link: { color: '#ff9999', textDecorationLine: 'underline' },
                blockquote: { backgroundColor: '#333333', borderColor: '#ff3333', borderLeftWidth: 4, paddingLeft: 8 },
                code_block: { backgroundColor: '#333333', color: '#ffffff', padding: 8, borderRadius: 4 },
                code_inline: { backgroundColor: '#333333', color: '#ffffff', padding: 4, borderRadius: 4 },
                bullet_list: { color: '#ffffff' },
                ordered_list: { color: '#ffffff' },
                list_item: { color: '#ffffff' },
                hr: { backgroundColor: '#ff3333', height: 1 },
                table: { borderColor: '#ff3333' },
                tr: { borderBottomColor: '#333333' },
                th: { color: '#ff3333' },
                td: { color: '#ffffff' },
              }}
            >
              {item.text}
            </Markdown>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        
        <Image source={images.aidlyLogo} style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Aidly AI</Text>
        <TouchableOpacity style={styles.clearButton} onPress={clearChat}>
          <FontAwesome name="trash" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>
      
      {/* Chat Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      
      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#ff3333" />
          <Text style={styles.loadingText}>Aidly is thinking...</Text>
        </View>
      )}
      
      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity 
            style={[styles.iconButton, isSpeaking && styles.activeIconButton]} 
            onPress={toggleSpeech}
          >
            <FontAwesome
              name={isSpeaking ? "volume-up" : "volume-off"}
              size={20}
              color="#ffffff"
            />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask Aidly AI..."
            placeholderTextColor="#888888"
            returnKeyType="send"
            onSubmitEditing={sendMessage}
            multiline={false}
            blurOnSubmit={false}
          />
          
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={sendMessage}
            disabled={isLoading || !inputText.trim()}
          >
            <FontAwesome name="send" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#1a1a1a",
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  headerIcon: {
    width: 28,
    height: 28,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff3333",
    flex: 1,
    marginLeft: 12,
  },
  clearButton: {
    padding: 8,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  userMessageContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  userMessage: {
    backgroundColor: "#333333",
    borderRadius: 16,
    borderTopRightRadius: 4,
    padding: 12,
    maxWidth: "80%",
    borderWidth: 1,
    borderColor: "#ff3333",
  },
  aiMessageContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 16,
  },
  aiMessage: {
    backgroundColor: "#1e1e1e",
    borderRadius: 16,
    borderTopLeftRadius: 4,
    padding: 12,
    maxWidth: "80%",
    shadowColor: "#ff3333",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  userName: {
    color: "#ffffff",
    fontWeight: "500",
  },
  aiName: {
    color: "#ff3333",
    fontWeight: "600",
  },
  timestamp: {
    color: "#ff9999",
    fontSize: 10,
    fontWeight: "500",
  },
  userMessageText: {
    color: "#ffffff",
    fontSize: 15,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "rgba(30, 30, 30, 0.7)",
    borderRadius: 16,
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
  },
  loadingText: {
    color: "#ffffff",
    marginLeft: 8,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#1a1a1a",
    borderTopWidth: 1,
    borderTopColor: "#333333",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ff3333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  activeIconButton: {
    backgroundColor: "#cc0000",
  },
  input: {
    flex: 1,
    backgroundColor: "#333333",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: "#ffffff",
    fontSize: 16,
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ff3333",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AidlyChatbot;
