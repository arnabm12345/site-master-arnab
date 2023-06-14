import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import CustomSafeAreaView from "../utils/CustomSafeAreaView";
import Crane from "../../assets/crane.png";
import * as SecureStore from "expo-secure-store";
const WelcomeScreen = ({ navigation }) => {
  return (
    <CustomSafeAreaView>
      <View className="bg-white px-5 pt-20 items-center w-full h-full">
        <Image
          style={{
            width: 300,
            height: 300,
            objectFit: "contain",
          }}
          //   className=" w-full object-contain"
          source={Crane}
        />
        <Text className="text-3xl pt-5 font-bold">Welcome, User</Text>

        <Text className="px-10 pt-5">
          Your are all set now, let’s create your first site and manage your
          construction with the advance features of SiteMaster.
        </Text>
        <View className="absolute bottom-10 mx-10 w-full px-10">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MainStack");
            }}
            className="bg-purple-800 items-center py-3 rounded-lg"
          >
            <Text className="text-white text-lg font-semibold">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomSafeAreaView>
  );
};

export default WelcomeScreen;
