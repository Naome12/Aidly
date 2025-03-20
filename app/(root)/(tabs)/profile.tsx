import { useState } from "react";
import { ImageBackground, View } from "react-native";
import Preferences from "../../../Components/profile/preference";
import EditInfo from "../../../Components/profile/edit-info";
import InviteFriend from "../../../Components/profile/invite";
import ProfileDetails from "../../../Components/profile/index";
import images from "@/constants/images";

export default function ProfileTab() {
  const [screen, setScreen] = useState("edit-info");

  return (
    <ImageBackground source={images.profile} className="flex-1">
    <View className="flex-1">
      {screen === "preference" && <Preferences setScreen={setScreen} />}
      {screen === "edit-info" && <EditInfo setScreen={setScreen} />}
      {screen === "invite" && <InviteFriend setScreen={setScreen} />}
      {screen === "index" && <ProfileDetails setScreen={setScreen} />}
    </View>
    </ImageBackground>
  );
}
