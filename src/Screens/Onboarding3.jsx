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
import task from "../../assets/task.png";
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
          <Image className="absolute -bottom-10 left-20" source={task} />
        </View>
        <View className="h-1/2 px-16 py-16">
          <Text className="text-2xl font-semibold pb-5">Task Management</Text>
          <View className="gap-2">
            <View className="flex-row gap-2 items-center">
              <View className="bg-purple-300 p-2 rounded">
                <MaterialIcons name="add-task" size={24} color="black" />
              </View>
              <Text>Create and manage tasks</Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <View className="bg-purple-300 p-2 rounded">
                <MaterialCommunityIcons
                  name="view-split-horizontal"
                  size={24}
                  color="black"
                />
              </View>

              <Text>Distribute tasks effortlessly</Text>
            </View>

            <View className="flex-row gap-2 items-center">
              <View className="bg-purple-300 p-2 rounded">
                <MaterialCommunityIcons
                  name="file-check-outline"
                  size={24}
                  color="black"
                />
              </View>
              <Text>Get task done in time</Text>
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
          onPress={() => navigation.navigate("Onboarding4")}
          className={OnboardingFilledBtn}
        >
          <Text className="text-white text-md font-semibold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding1;
