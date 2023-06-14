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
import resource from "../../assets/source.png";
import { Ionicons } from "@expo/vector-icons";
import {} from "@expo/vector-icons";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import {
  OnboardingOutlinedBtn,
  OnboardingFilledBtn,
} from "../utils/TailwindStyles";
const Onboarding1 = ({ navigation }) => {
  return (
    <View className=" bg-white  flex-1 items-center justify-around">
      <View className="flex-1  ">
        <View className="h-2/5 w-screen bg-purple-300 rounded-b-full">
          {/* <Text>Resources Management</Text> */}
          <View className="w-full absolute -bottom-10 items-center justify-center">
            <Image className="" source={resource} />
          </View>
        </View>
        <View className="h-1/2 px-16 mt-16">
          <Text className="text-2xl font-semibold pb-5">
            Resources Management
          </Text>
          {/* <Text className="text-stone-700 text-md">
            Manage your materials, Crew and finance in one single place.
          </Text> */}
          <View className="gap-2">
            <View className="flex-row gap-2 items-center">
              <View className="bg-purple-300 p-2 rounded">
                <Feather name="truck" size={24} color="black" />
              </View>
              <Text>Manage your materials</Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <View className="bg-purple-300 p-2 rounded">
                <MaterialCommunityIcons
                  name="account-cog-outline"
                  size={24}
                  color="black"
                />
              </View>

              <Text>Manage your Crew</Text>
            </View>

            <View className="flex-row gap-2 items-center">
              <View className="bg-purple-300 p-2 rounded">
                <MaterialCommunityIcons
                  className="bg-purple-300 p-2"
                  name="credit-card-check-outline"
                  size={24}
                  color="black"
                />
              </View>
              <Text>Manage your finance</Text>
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
          onPress={() => navigation.navigate("Onboarding2")}
          className={OnboardingFilledBtn}
        >
          <Text className="text-white text-md font-semibold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding1;
