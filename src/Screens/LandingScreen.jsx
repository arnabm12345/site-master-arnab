import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import logo from "../../assets/logo_two_color.png";
import * as SecureStore from "expo-secure-store";

const LandingScreen = ({ navigation }) => {
  useEffect(() => {
    SecureStore.getItemAsync("access")
      .then((item) => {
        console.log("item", item);
        if (item !== null) {
          navigation.navigate("MainStack");
        }
      })
      .catch(() => {});
  }, []);

  return (
    <View className=" bg-white flex-1 items-center justify-around py-10">
      <View className="flex-1 items-center justify-center">
        <Image
          source={logo}
          style={{ width: 305, height: 120, objectFit: "contain" }}
        />
        <Text className="text-black text-xl">Build Better with SiteMaster</Text>
      </View>
      <View className="mx-10 w-full px-10">
        {/* AddMorePersonalDetails */}

        {/* <TouchableOpacity
          onPress={() =>
            navigation.navigate("AuthStack", {
              screen: "AddMorePersonalDetails",
            })
          }
          className="bg-purple-800 items-center py-3 rounded-lg"
        >
          <Text className="text-white text-lg font-semibold">
            AddMorePersonalDetails
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation.navigate("LanguageSelectionScreen")}
          className="bg-purple-800 items-center py-3 rounded-lg"
        >
          <Text className="text-white text-lg font-semibold">Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MainStack", { screen: "SingleSiteStack" })}
          className="bg-purple-800 items-center py-3 rounded-lg"
        >
          <Text className="text-white text-lg font-semibold">After Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingScreen;
