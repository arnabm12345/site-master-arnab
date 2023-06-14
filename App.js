import {
  StyleSheet,
  View,
  Image,
  Button,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingStack from "./src/ScreenStack/OnboardingStack";
import AuthStack from "./src/ScreenStack/AuthStack";
import SiteStack from "./src/ScreenStack/SiteStack";
import { Ionicons } from "@expo/vector-icons";

// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// function MainStack() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === "Home") {
//             iconName = focused
//               ? "ios-information-circle"
//               : "ios-information-circle-outline";
//           } else if (route.name === "Settings") {
//             iconName = focused ? "ios-list" : "ios-list-outline";
//           }

//           // You can return any component that you like here!
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "tomato",
//         tabBarInactiveTintColor: "gray",
//       })}
//     >
//       <Tab.Screen
//         options={{ headerShown: false, tabBarStyle: { display: "none" } }}
//         name="SiteStack"
//         component={SiteStack}
//       />
//     </Tab.Navigator>
//   );
// }

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false, tabBarStyle: { display: "none" } }}
          name="Onboarding"
          component={OnboardingStack}
        />
        <Stack.Screen
          options={{ headerShown: false, tabBarStyle: { display: "none" } }}
          name="AuthStack"
          component={AuthStack}
        />
        <Stack.Screen
          options={{ headerShown: false, tabBarStyle: { display: "none" } }}
          name="MainStack"
          component={SiteStack}
        />
      </Stack.Navigator>
      <StatusBar
        // animated={true}
        backgroundColor="rgb(147,51,234)"
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
    </NavigationContainer>
  );
}
