import { View, Text } from "react-native";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "../Screens/SignUpScreen";
import LoginScreen from "../Screens/LoginScreen";
import VerifyOtpScreen from "../Screens/VerifyOtpScreen";
import AddDetails from "../Screens/AddDetails";
import AddPersonalDetails from "../Screens/AddPersonalDetails";
import AddMorePersonalDetails from "../Screens/AddMorePersonalDetails";
import WelcomeScreen from "../Screens/WelcomeScreen";
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignupScreen"
        component={SignupScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="VerifyOtpScreen"
        component={VerifyOtpScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddDetails"
        component={AddDetails}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddPersonalDetails"
        component={AddPersonalDetails}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddMorePersonalDetails"
        component={AddMorePersonalDetails}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="WelcomeScreen"
        component={WelcomeScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
