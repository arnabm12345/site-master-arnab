import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { FlashList } from "@shopify/flash-list";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageSelectionScreen = ({ navigation }) => {
  const DATA = [
    {
      title: "English",
      icon: "A",
      id: "en",
      active: true,
    },
    {
      title: "বাংলা",
      icon: "অ",
      id: "bn",
      active: false,
    },
    {
      title: "हिंदी",
      icon: "अ",
      id: "hn",
      active: false,
    },
  ];

  const [SelectedLanguage, setSelectedLanguage] = useState("en");

  return (
    <>
      <SafeAreaView className=" bh-white flex-1 items-center justify-around">
        <View className="flex-1 w-full px-10 pt-10">
          <Text className="text-left w-full text-xl font-semibold">
            Select Your Language
          </Text>
          <View className="w-full h-full py-5">
            <FlashList
              className="flex justify-center items-center p-5"
              data={DATA}
              numColumns={2}
              renderItem={({ item }) => (
                <>
                  {!item.active ? (
                    <View className=" absolute  w-full h-full items-center justify-center">
                      <Text className=" text-base font-bold text-center">
                        Coming Soon
                      </Text>
                    </View>
                  ) : null}
                  <TouchableOpacity
                    disabled={!item.active}
                    onPress={async () => {
                      setSelectedLanguage(item.id);
                      AsyncStorage.setItem("lang", item.id);
                    }}
                    className={
                      "w-11/12 m-1 mb-2 justify-center items-center p-5 bg-gray-200 rounded-lg   " +
                      (SelectedLanguage === item.id
                        ? "border-purple-800 border-4 "
                        : "border-gray-500 border ") +
                      (item.active ? " " : " opacity-10")
                    }
                  >
                    <Text className="text-5xl font-bold text-center">
                      {item.icon}
                    </Text>

                    <Text className="text-xl  text-center">{item.title}</Text>
                  </TouchableOpacity>
                </>
              )}
              estimatedItemSize={20}
            />
          </View>
        </View>
        <View className="mx-10 w-full px-10 flex-row justify-between bottom-5  ">
          <TouchableOpacity
            onPress={() => navigation.navigate("Onboarding1")}
            className="bg-purple-800 items-center py-3 px-8 rounded-lg w-full"
          >
            <Text className="text-white text-lg font-semibold">Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default LanguageSelectionScreen;
