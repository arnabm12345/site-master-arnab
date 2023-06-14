import { View, Text } from "react-native";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import SiteMaterialDetailsScreen from "../Screens/Sites/Site/SiteMaterialsScreens/SiteMaterialDetailsScreen";
import SiteMaterialScreenWithInformation from "../Screens/Sites/Site/SiteMaterialsScreens/SiteMaterialScreenWithInformation";
import AddMaterial1 from "../Screens/Sites/Site/SiteMaterialsScreens/AddMaterial1";
import Deliveries from "../Screens/Sites/Site/SiteMaterialsScreens/Deliveries";
import AddDeliveries from "../Screens/Sites/Site/SiteMaterialsScreens/AddDelivery";
const Stack = createStackNavigator();
const SiteMaterialStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
      
        <Stack.Screen
          options={{ headerShown: false }}
          name="SiteMaterialScreenWithInformation"
          component={SiteMaterialScreenWithInformation}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AddMaterial1"
          component={AddMaterial1}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Deliveries"
          component={Deliveries}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AddDeliveries"
          component={AddDeliveries}
        /> 
      </Stack.Navigator>
    );
  };
  
  export default SiteMaterialStack;
  