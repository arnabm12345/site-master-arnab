import { View, Text } from "react-native";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import SitesDashboard from "../Screens/Sites/SitesDashboard";
import CreateSite from "../Screens/Sites/CreateSite";
import AddSiteAddress from "../Screens/Sites/AddSiteAddress";
import AddConstructionStatus from "../Screens/Sites/AddConstructionStatus";
import AddSiteCategory from "../Screens/Sites/AddSiteCategory";
import SingleSiteStack from "./SingleSiteStack";
import SiteMaterialStack from "./SiteMaterialStack";
const Stack = createStackNavigator();

const SiteStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="SitesDashboard"
        component={SitesDashboard}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CreateSite"
        component={CreateSite}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddSiteAddress"
        component={AddSiteAddress}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddConstructionStatus"
        component={AddConstructionStatus}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddSiteCategory"
        component={AddSiteCategory}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SingleSiteStack"
        component={SingleSiteStack}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SiteMaterialStack"
        component={SiteMaterialStack}
      />
    </Stack.Navigator>
  );
};

export default SiteStack;
