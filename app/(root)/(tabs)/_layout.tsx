import { View, ImageBackground, Keyboard, Platform, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import images from "@/constants/images";
import icons from "@/constants/icons";

interface TabProps {
  focused: boolean;
  icon: any
}

const TabIcon = ({ focused, icon}: TabProps) => {
  return (
    <View className="items-center justify-center mx-2 py-2 ">
      {focused ? (
        <ImageBackground
          source={images.glow}
          className="w-28 h-28 justify-center items-center rounded-full"
          imageStyle={{ resizeMode: "contain", borderRadius: 999 }}
        >
          <Image source={icon}/>
        </ImageBackground>
      ) : (
        <View className="w-12 h-12 justify-center items-center">
          <Image source={icon} />
        </View>
      )}
    </View>
  );
};

const TabsLayout = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === "ios" ? 25 : 15,
          left: 20,
          right: 20,
          height: 80,
          backgroundColor: "#0d0d0d",
          borderRadius: 40,
          paddingTop: 20,
          paddingHorizontal: 10,
          marginHorizontal: 25,
          elevation: 5,
          borderTopWidth: 0,
          display: isKeyboardVisible ? "none" : "flex",
        },
      }}
      
    >
      <Tabs.Screen
        name="voice"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon icon={icons.mic} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.chat} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="symp-analysis"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.scan} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.profile} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
