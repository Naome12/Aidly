import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import { login, signUp } from "@/lib/appwrite";
import { useRouter } from "expo-router";
import { useGlobalContext } from "@/lib/globalProvider";

const Login = () => {
  const router = useRouter();
  const { isLogged, loading: userLoading } = useGlobalContext();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);


  // Redirect logged-in users
  useEffect(() => {
    if (isLogged) {
      router.replace("/");
    }
  }, [isLogged]);


  const handleGoogleLogin = async () => {
    const result = await login(); // Assuming `login` handles Google login
    if (result) {
      alert("Logged in successfully with Google!");
      router.replace("/"); // Redirect to home page after login
    } else {
      alert("Google login failed. Please try again.");
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    const success = await signUp(email, password, username);
    setLoading(false);

    if (success) {
      alert("Account created successfully! Logging in...");
      await login();
      router.replace("/");
    } else {
      alert("Signup failed. Try again.");
    }
  };


  if (userLoading) return null; // Prevents flicker while checking login status

  return (
    <SafeAreaView className="flex-1 bg-black-100">
      <ScrollView contentContainerClassName="flex-grow py-5">
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-between p-6">
        <View className="mt-2.5 p-4 items-center">
        <Text 
        className="text-red-100 text-5xl font-amaranth-bold"
        style={{
          textShadowColor: 'rgba(254, 27, 27, 0.4)', // Color of the shadow (dark shadow)
          textShadowOffset: { width: 2, height: 2 }, // Position of the shadow
          textShadowRadius: 3, // Blur radius for the shadow
        }}
        >
          Welcome Back
        </Text>
        <Text className="text-primary-100 mb-4 text-3xl font-amaranth-italic">Login to your account</Text>
        </View>

        <View className="">
        <Text className="font-nunitosans font-bold text-white text-xl">Email</Text>
        <TextInput
          placeholder="e.g. johndoe@example.com"
          placeholderTextColor="#AEA1E9"
          className="bg-black text-primary-100 p-3 rounded-2xl my-2.5 font-extralight"
          value={email}
          onChangeText={setEmail}
          />

        <Text className="font-nunitosans font-bold text-white text-xl ">Password</Text>
        <TextInput
          placeholder="********"
          placeholderTextColor="#AEA1E9"
          secureTextEntry
          className="bg-black text-primary-100 p-3 rounded-2xl my-2.5  font-extralight"
          value={password}
          onChangeText={setPassword}
          />

        </View>

        <TouchableOpacity
          className="bg-red-500 p-4 rounded-3xl mt-4"
          onPress={() => router.replace('/selection')}
          disabled={loading}
        >
          <Text className="text-center text-white font-bold">
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          className="mt-4 flex flex-row justify-center items-center"
          onPress={() => router.replace("/sign-up")}
          >
          <Text className="text-primary-100">Drag left to</Text>
          <Text className="text-red-100 font-bold"> Sign up</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
          </ScrollView>   
    </SafeAreaView>
  );
};

export default Login;
