import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const SelectionScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("Young");
  const [selectedGender, setSelectedGender] = useState("Female");

  const languages = [
    { name: "English", flag: "🇺🇸" },
    { name: "Mandarin Chinese", flag: "🇨🇳" },
    { name: "Hindi", flag: "🇮🇳" },
    { name: "Arabic", flag: "🇸🇦" },
    { name: "Spanish", flag: "🇪🇸" },
    { name: "Russian", flag: "🇷🇺" },
    { name: "Portuguese", flag: "🇵🇹" },
    { name: "French", flag: "🇫🇷" },
    { name: "Urdu", flag: "🇵🇰" },
    { name: "Bengali", flag: "🇧🇩" },
    { name: "German", flag: "🇩🇪" },
    { name: "Japanese", flag: "🇯🇵" },
    { name: "Korean", flag: "🇰🇷" },
    { name: "Swahili", flag: "🇰🇪" },
    { name: "Indonesian", flag: "🇮🇩" },
  ];

  const ageGroups = ["All Age Groups", "Young", "Middle-Aged", "Kid", "Old"];
  const genders = [
    { label: "Male", emoji: "👦" },
    { label: "Female", emoji: "👩" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-black-100 px-4 pt-10">
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">Select Language</Text>
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerClassName="flex-grow py-5" className="mt-6">
        {/* Language Section */}
        <Text className="text-white text-lg font-bold mb-2">Language</Text>
        <View className="flex-wrap flex-row">
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.name}
              className={`px-4 py-2 rounded-lg m-1 ${
                selectedLanguage === lang.name ? "bg-red-100" : "bg-black-200"
              }`}
              onPress={() => setSelectedLanguage(lang.name)}
            >
              <Text
                className={`text-white ${
                  selectedLanguage === lang.name ? "font-bold" : ""
                }`}
              >
                {lang.name} {lang.flag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Age Group Section */}
        <Text className="text-white text-lg font-bold mt-6 mb-2">
          Age Groups
        </Text>
        <View className="flex-wrap flex-row">
          {ageGroups.map((group) => (
            <TouchableOpacity
              key={group}
              className={`px-4 py-2 rounded-lg m-1 ${
                selectedAgeGroup === group ? "bg-red-100" : "bg-black-200"
              }`}
              onPress={() => setSelectedAgeGroup(group)}
            >
              <Text
                className={`text-white ${
                  selectedAgeGroup === group ? "font-bold" : ""
                }`}
              >
                {group}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Gender Section */}
        <Text className="text-white text-lg font-bold mt-6 mb-2">Gender</Text>
        <View className="flex-row space-x-3">
          {genders.map((gender) => (
            <TouchableOpacity
              key={gender.label}
              className={`px-6 py-2 rounded-lg ${
                selectedGender === gender.label ? "bg-red-100" : "bg-black-200"
              }`}
              onPress={() => setSelectedGender(gender.label)}
            >
              <Text
                className={`text-white ${
                  selectedGender === gender.label ? "font-bold" : ""
                }`}
              >
                {gender.label} {gender.emoji}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Buttons */}
        <View className="flex-row justify-between mt-8">
          <TouchableOpacity className="bg-black-200 px-6 py-3 rounded-lg">
            <Text className="text-white font-bold">Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-100 px-6 py-3 rounded-lg"
            onPress={() => router.replace("/")}
          >
            <Text className="text-white font-bold">Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectionScreen;
