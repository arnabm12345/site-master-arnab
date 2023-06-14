import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import CustomHeader from "../../../Components/CustomHeader";
import CustomSafeAreaView from "../../../utils/CustomSafeAreaView";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SiteHomeScreen = ({ navigation }) => {
  const [SiteData, setSiteData] = useState({});
  async function SetSiteData() {
    let siteData = await AsyncStorage.getItem("site");
    // console.log(siteData);
    setSiteData(JSON.parse(siteData));
  }
  useEffect(() => {
    SetSiteData();
  }, []);

  return (
    <CustomSafeAreaView>
      <View className="h-full">
       { <CustomHeader
          navigation={navigation}
          title={SiteData?.site_name}
          isMenuAvailable={true}
        />
  }
        <View className="p-5 flex-auto justify-center items-center">
          <Text className="text-4xl font-black">Coming Soon</Text>
        </View>
      </View>
    </CustomSafeAreaView>
  );
};

export default SiteHomeScreen;
