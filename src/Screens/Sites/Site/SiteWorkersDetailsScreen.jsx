import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
} from "react-native";

import React, { useState, useEffect } from "react";
import CustomHeader from "../../../Components/CustomHeader";
import CustomSafeAreaView from "../../../utils/CustomSafeAreaView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AntDesign,
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Surface, Divider } from "react-native-paper";
import nodata from "../../../../assets/nodata.png";

const ActiveTab =
  "  flex-auto ml-5 px-5 py-2 flex-row  items-center border-b-2  border-black";
const InActiveTab =
  "  flex-auto ml-5 px-5 py-2 flex-row  items-center border-b-2  border-white";

const SiteWorkersDetailsScreen = ({ navigation }) => {
  const [IsWorkerActive, setIsWorkerActive] = useState(false);
  const [SiteData, setSiteData] = useState({});
  async function SetSiteData() {
    let siteData = await AsyncStorage.getItem("site");
    console.log("worker", siteData);
    setSiteData(JSON.parse(siteData));
  }

  useEffect(() => {
    SetSiteData();
  }, []);

  return (
    <CustomSafeAreaView>
      <View className="h-full">
        <CustomHeader
          navigation={navigation}
          title={SiteData?.site_name}
          subtitle={`${SiteData?.city}, ${SiteData?.pincode}`}
          isMenuAvailable={true}
        />

        <View className="p-5 px-10 flex-auto">
          <Surface
            elevation={0}
            className="bg-purple-200 min-h-[100px]  w-full rounded-xl p-4"
          >
            <View className="flex-row justify-between items-center ">
              <View className="flex-row justify-center items-center">
                <AntDesign name="idcard" size={16} color="black" />
                <Text className="ml-2 font-medium">Today’s Attendance</Text>
              </View>
              <AntDesign name="arrowright" size={16} color="rgba(0,0,0,0.7)" />
            </View>
            <View className="justify-center items-center p-2">
              <View className="flex-row">
                <View className="items-center">
                  <View className="flex-row items-center">
                    <Ionicons name="people-sharp" size={16} color="black" />
                    <Text>Person</Text>
                  </View>

                  <View>
                    <Text>79</Text>
                  </View>
                </View>
                <View className=" border-l border-gray-400 pl-6 ml-6 items-center">
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons
                      name="account-off-outline"
                      size={16}
                      color="black"
                    />
                    <Text>Person</Text>
                  </View>
                  <View>
                    <Text>79</Text>
                  </View>
                </View>
              </View>
            </View>
            <View className="bg-gray-800 h-[0.3px]"></View>
            <View className="py-1">
              <Text className="italic text-gray-600">
                ** mark your workers attendance **
              </Text>
            </View>
          </Surface>

          <View className="py-6 flex-row justify-between">
            <TouchableOpacity className="flex-auto bg-purple-400 rounded-lg flex-row items-center justify-around px-5 py-3">
              <Text className="text-xs font-bold">New Crew</Text>
              <MaterialIcons name="group-add" size={16} color="black" />
            </TouchableOpacity>

            <TouchableOpacity className="ml-5 flex-auto bg-purple-400 rounded-lg flex-row items-center justify-around px-5 py-3">
              <Text className="text-xs font-bold">New Worker</Text>
              <Entypo name="plus" size={16} color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center">
            <View
              className={
                "flex-auto flex-row items-center  bg-gray-200 rounded-xl " +
                (Platform.OS === "ios" ? "py-3" : "py-2")
              }
            >
              <View className="pl-4">
                <AntDesign name="search1" size={16} color="black" />
              </View>

              <TextInput
                placeholder="Search Worker, Crew"
                className="text-xs pl-2 bg-gray-200 rounded-xl "
                outlineColor="rgb(229,231,235)"
                // activeOutlineColor="rgb(229,231,235)"
                mode="outlined"
              />
            </View>
            <TouchableOpacity className="mx-2 p-3 bg-gray-200 rounded-xl">
              <AntDesign name="filter" size={16} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="p-3 bg-gray-200 rounded-xl">
              <MaterialCommunityIcons name="tune" size={16} color="black" />
            </TouchableOpacity>
          </View>

          {/* workers tab */}
          <View className="flex-row py-5 ">
            {/* Crew tab */}
            <TouchableOpacity
              onPress={() => setIsWorkerActive(false)}
              className={IsWorkerActive ? InActiveTab : ActiveTab}
            >
              <MaterialIcons
                name="groups"
                size={16}
                color={IsWorkerActive ? "gray" : "black"}
              />
              <Text
                className={`ml-2 font-bold ${
                  IsWorkerActive ? "text-gray-600" : "text-black"
                }`}
              >
                Crew
              </Text>
            </TouchableOpacity>

            {/* worker tab */}
            <TouchableOpacity
              onPress={() => setIsWorkerActive(true)}
              className={IsWorkerActive ? ActiveTab : InActiveTab}
            >
              <MaterialIcons
                name="person"
                size={16}
                color={IsWorkerActive ? "black" : "gray"}
              />
              <Text
                className={`ml-2 font-bold ${
                  IsWorkerActive ? "text-black" : "text-gray-600"
                }`}
              >
                Workers
              </Text>
            </TouchableOpacity>
          </View>
          {/* list view of workers and Crew */}
          <View className="justify-center items-center ">
            <Image source={nodata} />
            <Text className="italic mt-2 text-gray-600">No Data Available</Text>
          </View>
        </View>
      </View>
    </CustomSafeAreaView>
  );
};

export default SiteWorkersDetailsScreen;
