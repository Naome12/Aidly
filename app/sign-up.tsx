import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import { login, signUp } from "@/lib/appwrite";
import { useRouter } from "expo-router";
import { useGlobalContext } from "@/lib/globalProvider";

const Signup = () => {
  const router = useRouter();
  const { refetch,isLogged, loading: userLoading } = useGlobalContext();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);


  // Redirect logged-in users
  useEffect(() => {
    if (isLogged) {
      router.replace("/selection");
    }
  }, [isLogged]);


  const handleGoogleLogin = async () => {
    const result = await login(); // Assuming `login` handles Google login
    if (result) {
      alert("Logged in successfully with Google!");
      refetch() // Redirect to home page after login
    } else {
      alert("Google login failed. Please try again.");
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!acceptedTerms) {
      alert("You must accept the terms & policies.");
      return;
    }
    setLoading(true);
    // const success = await signUp(email, password, username);
    // setLoading(false);

    // if (success) {
      alert("Account created successfully! Logging in...");
    //   await login();
      router.replace("/login");
    // } else {
    //   alert("Signup failed. Try again.");
    // }
  };


  if (userLoading) return null; // Prevents flicker while checking login status

  return (
    <SafeAreaView className="flex-1 bg-black-100">
      <ScrollView contentContainerClassName="flex-grow py-3">
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-between p-6">
        <View className="mt-2.5 p-4">
        <Text 
        className="text-red-100 text-4xl font-amaranth-bold shadow-rose-300"
        >
          AI Meets Healthcare
        </Text>
        <Text className="text-primary-100 mb-4 text-2xl font-amaranth-italic">Create your account</Text>
        </View>

        <View>
        <Text className="font-nunitosans font-bold text-white text-xl">Email</Text>
        <TextInput
          placeholder="e.g. johndoe@example.com"
          placeholderTextColor="#AEA1E9"
          className="bg-black text-primary-100 p-3 rounded-2xl my-2.5 font-extralight"
          value={email}
          onChangeText={setEmail}
          />

        <Text className="font-nunitosans font-bold text-white text-xl">Username</Text>
        <TextInput
          placeholder="e.g. John Doe"
          placeholderTextColor="#AEA1E9"
          className="bg-black text-primary-100 p-3 rounded-2xl my-2.5 font-extralight"
          value={username}
          onChangeText={setUsername}
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

        <Text className="font-nunitosans font-bold text-white text-xl">Confirm Password</Text>
        <TextInput
          placeholder="********"
          placeholderTextColor="#AEA1E9"
          secureTextEntry
          className="bg-black text-primary-100 p-3 rounded-2xl  my-2.5 font-extralight"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          />


        <CheckBox
          title="I accept the terms & policies"
          checked={acceptedTerms}
          onPress={() => setAcceptedTerms(!acceptedTerms)}
          containerStyle={{ backgroundColor: "black", borderWidth: 0 }}
          textStyle={{ color: "white" }}
          />
          
        </View>
        <View>

        <TouchableOpacity
          className="bg-red-500 p-4 rounded-3xl mt-4"
          onPress={handleSignup}
          disabled={loading}
          >
          <Text className="text-center text-white font-bold">
            {loading ? "Signing Up..." : "Sign Up"}
          </Text>
        </TouchableOpacity>
        <Text className="text-white text-center font-bold">OR</Text>

        <TouchableOpacity
          className="p-4 mt-2 flex flex-row items-center bg-white rounded-3xl"
          onPress={handleGoogleLogin}
          >
          <Text className="text-white">Or Sign Up with </Text>
          <Text className="text-blue-400 font-bold">Continue with Google</Text>
        </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="mt-4 flex flex-row justify-center items-center"
          onPress={() => router.replace("/login")}
          >
          <Text className="text-primary-100">Drag right to</Text>
          <Text className="text-red-100 font-bold"> Log In</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
          </ScrollView>   
    </SafeAreaView>
  );
};

export default Signup;