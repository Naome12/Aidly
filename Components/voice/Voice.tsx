import {
    Alert,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect, useRef, useState } from "react";
  import { LinearGradient } from "expo-linear-gradient";
  import { scale, verticalScale } from "react-native-size-matters";
  import AntDesign from "@expo/vector-icons/AntDesign";
  import FontAwesome from "@expo/vector-icons/FontAwesome";
  import { Audio } from "expo-av";
  import axios from "axios";
  import LottieView from "lottie-react-native";
  import * as Speech from "expo-speech";
  import Constants from "expo-constants";
  import Regenerate from "@/assets/svg/regenrate";
  import Reload from "@/assets/svg/reload";
import images from "@/constants/images";
  
  const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
  
  export default function HomeScreen() {
    const [text, setText] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [loading, setLoading] = useState(false);
    const [recording, setRecording] = useState(null);
    const [AIResponse, setAIResponse] = useState(false);
    const [AISpeaking, setAISpeaking] = useState(false);
    const lottieRef = useRef(null);
  
    const getMicrophonePermission = async () => {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert("Permission", "Please grant microphone access");
        return false;
      }
      return true;
    };
  
    const recordingOptions = {
      android: {
        extension: ".mp4",
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
      },
      ios: {
        extension: ".wav",
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
      },
    };
  
    const startRecording = async () => {
      if (!(await getMicrophonePermission())) return;
      try {
        await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
        setIsRecording(true);
        const { recording } = await Audio.Recording.createAsync(recordingOptions);
        setRecording(recording);
      } catch (error) {
        Alert.alert("Error", "Failed to start recording");
      }
    };
  
    const stopRecording = async () => {
      setIsRecording(false);
      setLoading(true);
      await recording?.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
  
      const uri = recording?.getURI();
      const transcript = await sendAudioToWhisper(uri);
      setText(transcript);
      await sendToGpt(transcript);
    };
  
    const sendAudioToWhisper = async (uri) => {
      try {
        const formData = new FormData();
        formData.append("file", { uri, type: "audio/mp4", name: "recording.mp4" });
        formData.append("model", "whisper-1");
  
        const response = await axios.post("https://api.openai.com/v1/audio/transcriptions", formData, {
          headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, "Content-Type": "multipart/form-data" },
        });
        return response.data.text;
      } catch (error) {
        Alert.alert("Error", "Failed to transcribe audio");
      }
    };
  
    const sendToGpt = async (text) => {
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are Artifonia, a helpful AI assistant." },
              { role: "user", content: text },
            ],
          },
          { headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" } }
        );
        setText(response.data.choices[0].message.content);
        setAIResponse(true);
        await speakText(response.data.choices[0].message.content);
      } catch (error) {
        Alert.alert("Error", "Failed to get response from GPT-3.5");
      }
      setLoading(false);
    };
  
    const speakText = async (text) => {
      setAISpeaking(true);
      Speech.speak(text, { language: "en-US", pitch: 1.0, rate: 1.0, onDone: () => setAISpeaking(false) });
    };
  
    useEffect(() => {
      if (AISpeaking) lottieRef.current?.play();
      else lottieRef.current?.reset();
    }, [AISpeaking]);
  
    return (
      <View  style={styles.container}>
        <StatusBar barStyle={"light-content"} />
        <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
          <Image source={isRecording ? images.mic : images.aiSpeaking  } className="h-3" />
        </TouchableOpacity>
        <Text style={styles.text}>{loading ? "Processing..." : text || "Press the mic to start recording!"}</Text>
        {AIResponse && (
          <TouchableOpacity onPress={() => sendToGpt(text)}>
            <Regenerate />
          </TouchableOpacity>
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: "#0D0D0D" ,height: 90 },
    text: { color: "#fff", fontSize: scale(16), textAlign: "center", marginTop: 20 },
  });
  