import { useGlobalContext } from "@/lib/globalProvider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function AppLayout(){
    const {loading,isLogged} = useGlobalContext();
    if(loading) return (
        <SafeAreaView className="bg-white h-full flex justify-center items-center">
            <ActivityIndicator size="large"  />
        </SafeAreaView>
    )
    if(!isLogged) return <Redirect href="/sign-up" />
    return <Slot/>
}