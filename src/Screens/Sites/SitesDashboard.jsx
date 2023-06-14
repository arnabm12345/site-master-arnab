import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomSafeAreaView from "../../utils/CustomSafeAreaView";
import { TextInput } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal, Portal, PaperProvider } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { Avatar } from "react-native-paper";

import site_placeholder from "../../../assets/site_placeholder.png";

const siteTypes = [
  {
    name: "All Projects",
    id: "ap",
    icon: ({ btnActive }) => (
      <MaterialCommunityIcons
        name="city-variant-outline"
        size={20}
        color={btnActive === "ap" ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.5)"}
      />
    ),
  },
  {
    name: "Ongoing ",
    id: "op",
    icon: ({ btnActive }) => (
      <MaterialIcons
        name="foundation"
        size={20}
        color={btnActive === "op" ? "black" : "rgba(0,0,0,0.5)"}
      />
    ),
  },
  {
    name: "Upcoming",
    id: "up",
    icon: ({ btnActive }) => (
      <MaterialIcons
        name="architecture"
        size={20}
        color={btnActive === "up" ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.5)"}
      />
    ),
  },
  {
    name: "Completed",
    id: "cp",
    icon: ({ btnActive }) => (
      <MaterialCommunityIcons
        name="home-city-outline"
        size={20}
        color={btnActive === "cp" ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.5)"}
      />
    ),
  },
];

function SiteCard({ site, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => {
        AsyncStorage.setItem("site", JSON.stringify(site));
        navigation.navigate("SingleSiteStack");
      }}
      className=" p-2 my-2 border-[0.5px] border-gray-400 rounded-2xl flex-row justify-between items-center"
    >
      <View className="w-[30vw] h-[30vw] bg-purple-100 rounded-xl items-center justify-center">
        <Image
          style={{
            objectFit: "contain",
          }}
          className="object-contain"
          source={site_placeholder}
        />
      </View>
      <View className="h-full mx-4 flex-auto">
        <View>
          <View className="flex-row justify-between items-center">
            <Text numberOfLines={1} className="font-semibold text-ellipsis">
              {site.site_name}
            </Text>
            <TouchableOpacity className="py-2">
              <Entypo name="dots-three-vertical" size={16} color="black" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="office-building-marker-outline"
              size={12}
              color="black"
            />
            <Text className="ml-2 text-[10px]" numberOfLines={1}>
              {site.city}, {site.pincode}
            </Text>
          </View>
        </View>

        <View className="mt-4 bg-gray-300 p-1 rounded-full px-3">
          <View className="flex-row flex-auto justify-between">
            <Text numberOfLines={1} className="mr-2  font-bold text-xs">
              Status
            </Text>
            <Text className="font-semibold text-xs" numberOfLines={1}>
              {site.constructionStage}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center ">
          <View>
            <TouchableOpacity className="my-1 border-2  rounded-full">
              <Avatar.Image size={20} source={site_placeholder} />
            </TouchableOpacity>
          </View>
          <Text
            numberOfLines={1}
            className=" text-xs px-2 text-ellipsis flex-auto"
          >
            add more team members
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const SitesDashboard = ({ navigation }) => {
  const [btnActive, setbtnActive] = useState("ap");
  const [sites, setSites] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  async function getSites() {
    SecureStore.getItemAsync("access")
      .then((accessToken) => {
        if (accessToken) {
          fetch(
            "http://sitemasterdevelopment.centralindia.cloudapp.azure.com:8000/sites/list-users-sites/",
            {
              method: "GET",
              headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.status) {
                setSites(data.data);
              } else {
                throw new Error({ message: data.message });
              }
              //  console.log("sites from api", data);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        console.log(err);
        navigation.navigate("LoginScreen");
      })
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      getSites();
      // console.log("SiteBaseshboard is now focused");
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    console.log("ref");
    getSites();
  }, []);

  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={showLogoutModal}
          onDismiss={() => setShowLogoutModal(false)}
          contentContainerStyle={{
            backgroundColor: "white",
            marginHorizontal: 100,
            padding: 25,
            borderRadius: 10,
          }}
        >
          <Text className="py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            vitae ad saepe ipsam quis autem dolore natus vel minima neque nobis,
            fugit voluptatum nihil quibusdam modi ex quam dignissimos quos?
          </Text>
          <TouchableOpacity
            onPress={() => {
              SecureStore.deleteItemAsync("access");
              navigation.navigate("AuthStack", { screen: "LoginScreen" });
            }}
            className="bg-purple-600 items-center p-2 rounded-lg"
          >
            <Text className="text-white font-semibold text-xl">Logout</Text>
          </TouchableOpacity>
        </Modal>
      </Portal>
      <CustomSafeAreaView>
        <View className="h-full w-full py-5 px-10">
          <View className="flex-row gap-10">
            <View className="flex-auto pr-5">
              <Text className="text-2xl font-bold">Your Site</Text>
              <Text className="">Create, Join, Manage your project sites</Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowLogoutModal(true)}
              className="flex-auto"
            >
              <View className="bg-purple-400 w-20 h-20 rounded-2xl"></View>
            </TouchableOpacity>
          </View>
          <View className="pt-5">
            <TextInput
              left={
                <TextInput.Icon
                  icon={() => (
                    <Entypo name="magnifying-glass" size={24} color="black" />
                  )}
                />
              }
              placeholder={`Search Your Site`}
              outlineStyle={{ borderRadius: 13 }}
              mode="outlined"
            />
          </View>
          <View className="flex-row justify-between pt-5">
            {/* <TouchableOpacity className="w-5/12 flex-row bg-purple-300 justify-center items-center py-4 rounded-xl">
              <FontAwesome5 name="laptop-medical" size={20} color="black" />
              <Text className="pl-3 text-md font-bold">Join</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CreateSite");
              }}
              className="w-full flex-row bg-purple-800 justify-center items-center py-4 rounded-xl"
            >
              <Text className="pr-3 text-md font-bold text-white">
                Create Site
              </Text>
              <MaterialCommunityIcons
                name="domain-plus"
                size={25}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-between pt-5">
            {siteTypes.map((item, index) => {
              const CIcons = item.icon;
              const isActive = item.id === btnActive;
              return (
                <TouchableOpacity
                  className={`items-center  p-1  ${
                    isActive ? " border-b-2 border-black" : ""
                  }`}
                  onPress={() => setbtnActive(item.id)}
                  key={index}
                >
                  <CIcons btnActive={btnActive} />
                  <Text className={isActive ? "font-medium" : ""}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {Loading && <Text>{"Loading..."}</Text>}
          <ScrollView className="pt-2">
            {sites.map((site, id) => {
              return <SiteCard key={id} navigation={navigation} site={site} />;
            })}
          </ScrollView>
        </View>
      </CustomSafeAreaView>
    </PaperProvider>
  );
};

export default SitesDashboard;
