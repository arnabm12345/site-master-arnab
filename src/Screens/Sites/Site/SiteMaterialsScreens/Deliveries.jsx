import { View, Text, Pressable,TouchableOpacity,Image } from "react-native";
import React from "react";
import CustomHeader from "../../../../Components/CustomHeader";
import CustomSafeAreaView from "../../../../utils/CustomSafeAreaView";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCard from "../../../../Components/MaterialCard";
import { useState } from "react";
import {
  AntDesign,
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import nodata from "../../../../../assets/nodata.png";

const Deliveries =  ({ navigation }) => {
    const ActiveTab ='w-2/5 items-center border-b-2 py-1';
    const InActiveTab='w-2/5 items-center  py-1 opacity-50';
    const [IsDeliver, setIsDeliver] = useState(false);


return(
<SafeAreaView>
<View className="py-4 px-4">
<View className="flex flex-row justify-between items-center">
          <View className="flex flex-row items-center">
            <AntDesign name="arrowleft" size={23} color="black" />
            <View className="flex flex-column px-3">
              <Text className="text-xl font-semibold">Deliveries</Text>
              <Text className="text-xs font-medium">Project Site Name</Text>
            </View>
          </View>
          <View className="flex flex-row justify-between ">
            <Entypo name="dots-three-vertical" size={20} color="black" />
          </View>
        </View>

    <View className="px-5">
     
        <View className="mt-6 flex flex-row justify-between h-10 ">
          <TouchableOpacity className="w-11 bg-gray-200 rounded-lg items-center flex flex-row justify-evenly"> 
          <MaterialIcons name="sort-by-alpha" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="w-11 bg-gray-200 rounded-lg items-center flex flex-row justify-evenly">
          <MaterialIcons name="sort" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="w-11  rounded-lg items-center flex flex-row justify-evenly bg-gray-200" >
          <AntDesign name="search1" size={18} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="w-6/12 flex flex-row  rounded-xl items-center justify-center" style={{backgroundColor: 'rgba(198, 163, 220, 1)'}}
          onPress={()=>{navigation.navigate("AddDeliveries")}}
          >
            <Text className="text-xs font-medium  ">New Delivery</Text>
            <View className="p-1 mt-1">
            <MaterialIcons name="playlist-add" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row justify-between py-4">
         <TouchableOpacity  onPress={() => setIsDeliver(true)}
              className={IsDeliver ? ActiveTab : InActiveTab}>
           
           <View className="flex flex-row w-4/5 items-center justify-center ">
           <MaterialCommunityIcons name="truck-outline" size={22} color="black" />
           <Text className="font-medium text-xs px-2">Upcoming</Text>
           </View>

         </TouchableOpacity>

         <TouchableOpacity  onPress={() => setIsDeliver(false)}
              className={IsDeliver ? InActiveTab : ActiveTab}>
           
           <View className="flex flex-row w-4/5 items-center justify-center ">
           <MaterialCommunityIcons name="truck-check-outline" size={22} color="black" />
           <Text className="font-medium text-xs px-2 text-gray-700">Delivered</Text>
           </View>

         </TouchableOpacity>
        </View>

        <View className="justify-center items-center mt-2">
            <Image source={nodata} />
            <Text className="italic mt-2 text-gray-600">No Data Available</Text>
          </View>
        
</View>
</View>
</SafeAreaView>

);

};

export default Deliveries;