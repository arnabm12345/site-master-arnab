import { View, Text } from "react-native";
import React from "react";
import Lottie from "lottie-react-native";

const LoadingComponent = () => {
  return (
    <View className="flex-row absolute top-0 left-0 w-full h-full items-center justify-center p-5">
      <View className="bg-white rounded-xl p-4">
        <Lottie
          className="w-80"
          style={{
            width: 300,
          }}
          source={require("../../assets/animated/city_loader.json")}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

export default LoadingComponent;
