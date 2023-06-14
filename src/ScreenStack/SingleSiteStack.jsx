import { View, Text, TouchableOpacity, Platform } from "react-native";
import React from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { TouchableRipple } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SiteHomeScreen from "../Screens/Sites/Site/SiteHomeScreen";
import SiteMaterialDetailsScreen from "../Screens/Sites/Site/SiteMaterialsScreens/SiteMaterialDetailsScreen";
import SiteWorkersDetailsScreen from "../Screens/Sites/Site/SiteWorkersDetailsScreen";
import SiteMaterialStack from "./SiteMaterialStack";
const Tab = createBottomTabNavigator();

const tabsInfo = {
  SiteHomeScreen: {
    name: "Home",
    icon: ({ color, size }) => (
      <Ionicons name="home-outline" size={size} color={color} />
    ),
  },
  SiteMaterialDetailsScreen: {
    name: "Materials",
    icon: ({ color, size }) => (
      <MaterialCommunityIcons name="truck-outline" size={size} color={color} />
    ),
  },
  SiteWorkersDetailsScreen: {
    name: "Workers",
    icon: ({ color, size }) => (
      <MaterialIcons name="people" size={size} color={color} />
    ),
  },
};

const SingleSiteStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let IconName = tabsInfo[route.name].icon;

          //   if (route.name === "Home") {
          //     iconName = focused
          //       ? "ios-information-circle"
          //       : "ios-information-circle-outline";
          //   } else if (route.name === "Settings") {
          //     iconName = focused ? "ios-list" : "ios-list-outline";
          //   }

          // You can return any component that you like here!
          //   return <Ionicons name={iconName} size={size} color={color} />;
          return (
            <View className="justify-center items-center">
              <IconName
                size={size}
                color={focused ? "rgb(126,34,206)" : "gray"}
              />
              <Text
                className={`text-xs  ${
                  focused ? " text-purple-700" : "text-gray-700"
                } ${Platform.OS === "ios" ? " font-semibold" : "font-black"}
                  `}
              >
                {tabsInfo[route.name].name}
              </Text>
              
            </View>
          );
        },

        tabBarLabel: () => {
          return;
        },
        tabBarStyle: {
          height: 60,
          padding: 0,
        },
        tabBarLabelStyle: { fontWeight: "800" },
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="SiteHomeScreen"
        component={SiteHomeScreen}
      />

      <Tab.Screen
        options={{ headerShown: false }}
        name="SiteWorkersDetailsScreen"
        component={SiteWorkersDetailsScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="SiteMaterialDetailsScreen"
        component={SiteMaterialDetailsScreen}
      />
    </Tab.Navigator>
  );
};

export default SingleSiteStack;
