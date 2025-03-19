import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface TabProps {
  focused: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
}

const TabIcon = ({ focused, icon, title }: TabProps) => {
  return (
    <View className="flex-1 mt-3 flex flex-col items-center">
      <Ionicons name={icon} size={24} color={focused ? "#ff7417" : "#666876"} />
      <Text
        className={`${
          focused ? "text-orange-500 font-bold" : "text-gray-400 font-medium"
        } text-xs w-full text-center mt-1`}
      >
        {title}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#111",
          position: "absolute",
          borderTopColor: "#ff7417",
          borderTopWidth: 2,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="voice"
        options={{
          title: "Voice",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="mic-outline" focused={focused} title="Voice" />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="chatbubble-ellipses-outline" focused={focused} title="Chat" />
          ),
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: "Symp-Analysis",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="pulse-outline" focused={focused} title="Analysis" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="person-outline" focused={focused} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
