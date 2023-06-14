import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
const MaterialCard = ({  title, quantity}) => {
 
  return (
   
      <View className="mt-4 flex flex-row justify-between items-center">
        <View className="flex flex-row">
        <View className='w-10 h-10 bg-gray-200 rounded-lg items-center flex flex-row justify-evenly'>
        <Entypo name="box" size={24} color="gray" />
        </View>
        <View className="flex flex-column ml-2">
          <Text className="text-sm font-medium">{title}</Text>
          <View className="flex flex-row ">
            <Text className="text-xs">In Stock</Text>
          <Text className="text-xs font-medium px-2">{quantity} </Text>
          </View>
        </View>
        </View>
      
        <View className="flex flex-row">
            <TouchableOpacity className="w-16 h-8 bg-gray-200 rounded-md items-center flex flex-row justify-evenly mr-3">
             <Text className="text-xs font-medium">Update</Text>
            </TouchableOpacity>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </View>
      </View>

  );
};

export default MaterialCard;
