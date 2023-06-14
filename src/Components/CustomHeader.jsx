import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import React from "react";
import { useRoute } from "@react-navigation/native";

function CustomHeader({
  navigation,
  title = null,
  subtitle = null,
  isMenuAvailable = false,
  rightBtnNavigationRoute,
}) {
  const route = useRoute();
  return (
    <View className="flex-row justify-between p-5 items-center bg-white border-b-[0.2px] border-purple-300">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <View className="flex-grow items-center justify-center">
        <Text className="text-xl font-medium">{title ?? route.name}</Text>
        {subtitle && <Text className="text-md font-medium">{subtitle}</Text>}
      </View>
      {isMenuAvailable ? (
        <Entypo name="dots-three-vertical" size={24} color="black" />
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate(rightBtnNavigationRoute)}
        >
          <MaterialCommunityIcons name="close" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default CustomHeader;
