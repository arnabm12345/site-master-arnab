import { View, Text, Pressable,TouchableOpacity } from "react-native";
import React from "react";
import CustomHeader from "../../../../Components/CustomHeader";
import CustomSafeAreaView from "../../../../utils/CustomSafeAreaView";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCard from "../../../../Components/MaterialCard";
import {
  AntDesign,
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  Feather,
  FontAwesome,
  EvilIcons,
  Ionicons 
} from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
const SiteMaterialScreenWithInformation = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View className="px-8 py-6">
        <View className="flex flex-row justify-between">
          <View className="flex flex-row items-center">
            <AntDesign name="arrowleft" size={23} color="black" />
            <View className="flex flex-column px-2">
              <Text className="text-sm font-medium">Project Site Name</Text>
              <Text className="text-xs font-normal">Site Address With Pin</Text>
            </View>
          </View>
          <View className="flex flex-row justify-between ">
            <View className="mr-3">
              <FontAwesome5 name="bell" size={20} color="black" />
            </View>
            <Entypo name="dots-three-vertical" size={20} color="black" />
          </View>
        </View>

        <View className="mt-4 flex flex-row justify-between">
          <View className="flex flex-row">
            <MaterialCommunityIcons
              name="truck-delivery-outline"
              size={24}
              color="black"
            />
            <Text className="ml-1 font-medium text-sm">Deliveries</Text>
          </View>
          <TouchableOpacity onPress={()=>{navigation.navigate("Deliveries")}}>
          <AntDesign name="arrowright" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View className="mt-3 flex flex-row items-center justify-between">
          <View className="opacity-40">
            <MaterialIcons name="keyboard-arrow-left" size={26} color="black" />
          </View>
          <View className="h-24 w-64 bg-purple-100 rounded-lg flex flex-column justify-evenly px-3">
            <View className="flex flex-row justify-between ">
              <Text className="text-base font-medium">Cement</Text>
              <AntDesign name="arrowright" size={20} color="black" />
            </View>
            <View className="flex flex-row items-center">
            <AntDesign name="calendar" size={17} color="black" />
            <Text className="text-xs"> 12 Jun 2023</Text>
            <View className="bg-purple-400 rounded ml-1 w-12 h-4 items-center">
                <Text className="text-xs">Today</Text>
            </View>
            </View>
            <View className="flex flex-row items-center">
            <MaterialIcons name="inventory" size={18} color="rgba(122, 122, 122, 1)" />
            <Text className="text-xs"> 200 Bags</Text>
            </View>
            <View className="flex flex-row">
            <Ionicons name="cash-outline" size={17} color="black" />
            <Text className="text-xs"> ₹ 50,000</Text>
            </View>
          </View>
          <View className="">
            <MaterialIcons
              name="keyboard-arrow-right"
              size={26}
              color="black"
            />
          </View>
        </View>

        <View className="flex flex-row justify-between mt-7">
          <Pressable className="flex flex-row items-center">
          <Entypo name="box" size={20} color="black" />
            <Text className="ml-1 text-sm font-medium">Inventory</Text>
          </Pressable>
          <AntDesign name="arrowright" size={22} color="black" />
        </View>

        <View className="mt-3 flex flex-row justify-between h-10">
          <View className="w-6/12 flex flex-row bg-gray-200 rounded-xl items-center justify-evenly">
            <FontAwesome name="search" size={15} color="black" />
            <TextInput placeholder="Search Materials"></TextInput>
          </View>

          <TouchableOpacity className="w-10 bg-gray-200 rounded-lg items-center flex flex-row justify-evenly"> 
          <MaterialIcons name="sort-by-alpha" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 bg-gray-200 rounded-lg items-center flex flex-row justify-evenly">
          <MaterialIcons name="sort" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10  rounded-lg items-center flex flex-row justify-evenly"
           style={{backgroundColor: 'rgba(200, 160, 233, 1)'}}
                    onPress={() => navigation.navigate("AddMaterial1")}>
          <AntDesign name="plus" size={18} color="black" />
          </TouchableOpacity>
        </View>
      
      <MaterialCard
      title="Cement"
      quantity="150 Bags"
      />
       <MaterialCard
      title="Bricks"
      quantity="150 Bags"
      />
       <MaterialCard
      title="Sand"
      quantity="150 Bags"
      />
       <MaterialCard
      title="Paint"
      quantity="150 Bags"
      />
       <MaterialCard
      title="Bamboo"
      quantity="150 Bags"
      />
       <MaterialCard
      title="Timber"
      quantity="150 Bags"
      />
       <MaterialCard
      title="Rod"
      quantity="150 Bags"
      />
   

      </View>
    </SafeAreaView>
  );
};

export default SiteMaterialScreenWithInformation;
