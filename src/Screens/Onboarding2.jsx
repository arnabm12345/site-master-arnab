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
import progress from "../../assets/progress.png";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import {
  OnboardingOutlinedBtn,
  OnboardingFilledBtn,
} from "../utils/TailwindStyles";

const Onboarding2 = ({ navigation }) => {
  return (
    <View className=" bg-white flex-1 items-center justify-around">
      <View className="flex-1  ">
        <View className="h-2/5 w-screen bg-purple-300 rounded-b-full">
          {/* <Text>Resources Management</Text> */}
          <Image className="absolute -bottom-10 left-20" source={progress} />
        </View>
        <View className="h-1/2 px-16 py-16">
          <Text className="text-2xl font-semibold pb-5">Progress Tracking</Text>
          <View className="gap-2">
            <View className="flex-row gap-2 items-center">
              <View className="bg-purple-300 p-2 rounded">
                <MaterialCommunityIcons
                  name="chart-areaspline"
                  size={24}
                  color="black"
                />
              </View>
              <Text>Track your construction progress</Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <View className="bg-purple-300 p-2 rounded">
                <Ionicons
                  name="md-chatbox-ellipses-outline"
                  size={24}
                  color="black"
                />
              </View>

              <Text>Inbuilt AI assistant for your help</Text>
            </View>

            <View className="flex-row gap-2 items-center">
              <View className="bg-purple-300 p-2 rounded">
                <MaterialCommunityIcons
                  name="robot-outline"
                  size={24}
                  color="black"
                />
              </View>
              <Text>Get AI error detection feature</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="mx-10 w-full px-16 flex-row justify-between pb-10">
        <TouchableOpacity
          onPress={() => navigation.navigate("Onboarding4")}
          className={OnboardingOutlinedBtn}
        >
          <Text className="text-black text-md font-semibold">Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Onboarding3")}
          className={OnboardingFilledBtn}
        >
          <Text className="text-white text-md font-semibold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding2;
