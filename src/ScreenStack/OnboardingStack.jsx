import { View, Text } from "react-native";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "../Screens/LandingScreen";
import Onboarding1 from "../Screens/Onboarding1";
import Onboarding2 from "../Screens/Onboarding2";
import Onboarding3 from "../Screens/Onboarding3";
import Onboarding4 from "../Screens/Onboarding4";
import LanguageSelectionScreen from "../Screens/LanguageSelectionScreen";

const Stack = createStackNavigator();

// function MyStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="Notifications" component={Notifications} />
//       <Stack.Screen name="Profile" component={Profile} />
//       <Stack.Screen name="Settings" component={Settings} />
//     </Stack.Navigator>
//   );
// }

const OnboardingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Landing Page"
        component={LandingScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Onboarding1"
        component={Onboarding1}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Onboarding2"
        component={Onboarding2}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Onboarding3"
        component={Onboarding3}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Onboarding4"
        component={Onboarding4}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="LanguageSelectionScreen"
        component={LanguageSelectionScreen}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
