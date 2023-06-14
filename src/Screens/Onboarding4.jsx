import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import logo from "../../assets/logo_two_color.png";
import andMore from "../../assets/andMore.png";
import {
  MaterialCommunityIcons,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  OnboardingOutlinedBtn,
  OnboardingFilledBtn,
} from "../utils/TailwindStyles";

const Onboarding1 = ({ navigation }) => {
  return (
    <View className=" bg-white flex-1 items-center justify-around">
      <View className="flex-1  ">
        <View className="h-2/5 rounded-b-full w-screen bg-purple-300">
          {/* <Text>Resources Management</Text> */}
          <Image className="absolute -bottom-10 left-20" source={andMore} />
        </View>
        <View className="h-3/5 px-16 py-16">
          <Text className="text-2xl font-semibold pb-5">and More...</Text>
          <View className="gap-2">
            <View className="flex-row gap-2 items-center">
              <View className="bg-purple-300 p-2 rounded">
                <MaterialCommunityIcons
                  name="chart-timeline-variant-shimmer"
                  size={24}
                  color="black"
                />
              </View>
              <Text>Get project stats & insights</Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <View className="bg-purple-300 p-2 rounded">
                <MaterialCommunityIcons
                  name="view-split-horizontal"
                  size={24}
                  color="black"
                />
              </View>

              <Text>Generate detailed project report</Text>
            </View>

            <View className="flex-row gap-2 items-center">
              <View className="bg-purple-300 p-2 rounded">
                <MaterialIcons name="groups" size={24} color="black" />
              </View>
              <Text>Work with your team</Text>
            </View>

            <View className="flex-row gap-2 items-center">
              <View className="bg-purple-300 p-2 rounded">
                <MaterialCommunityIcons
                  name="shield-account-variant-outline"
                  size={24}
                  color="black"
                />
              </View>
              <Text>Share and collaborate securely</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="mx-10 w-full px-16 justify-between pb-10">
        <TouchableOpacity
          onPress={() => navigation.navigate("AuthStack")}
          className="bg-purple-800 items-center py-3 px-8 rounded-lg w-full"
        >
          <Text className="text-white text-lg font-semibold">Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AuthStack", { screen: "LoginScreen" })
          }
        >
          <Text className="py-2 text-center">
            You already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding1;
