import { useGlobalContext } from "@/lib/globalProvider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function AppLayout(){
    // const {loading,isLogged} = useGlobalContext();
 
        <SafeAreaView className="bg-white h-full flex justify-center items-center">
            <ActivityIndicator size="large"  />
        </SafeAreaView>

    return <Slot/>
}