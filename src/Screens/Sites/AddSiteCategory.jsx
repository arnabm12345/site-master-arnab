import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomSafeAreaView from "../../utils/CustomSafeAreaView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import CustomHeader from "../../Components/CustomHeader";

const ActiveCategoryContainer =
  "flex-row border border-purple-700 mb-6 rounded-md bg-purple-100";
const InactiveCategoryContainer =
  "flex-row border-[1px] border-gray-700 mb-6 rounded-md bg-gray-100";

const buildingCategory = [
  {
    type: "Residential Building",
    description: "Apartments, Single-family home... ",
    id: 2,
  },
  {
    type: "Commercial Building",
    description: "Office, Retail, Hotel, Industrial... ",
    id: 3,
  },
  {
    type: "Institutional Building",
    description: "Medical, Educational, Government",
    id: 4,
  },
  {
    type: "Mixed Use Building",
    description: "more than one use or purpose",
    id: 5,
  },
];
const AddSiteCategory = ({ navigation, route }) => {
  const [Category, setCategory] = useState(2);
  const { data } = route.params;

  function BuildingCategoryCard({ type, description, active = false }) {
    return (
      <View
        className={active ? ActiveCategoryContainer : InactiveCategoryContainer}
      >
        <View
          className={`p-3 ${
            active ? "bg-purple-300" : "bg-gray-300"
          } m-3 rounded-lg `}
        >
          <MaterialIcons
            className="p-10"
            name="apartment"
            size={30}
            color={active ? "purple" : "black"}
          />
        </View>

        <View className="justify-center">
          <Text className="text-start text-lg  font-medium">{type}</Text>
          <Text className="text-start text-xs">{description}</Text>
        </View>
      </View>
    );
  }

  return (
    <CustomSafeAreaView>
      <View className="w-full h-full ">
        <CustomHeader
          navigation={navigation}
          title={"Create New Site"}
          rightBtnNavigationRoute={"SitesDashboard"}
        />
        <View className="p-5 px-10 flex-auto">
          <View className="pt-5 flex-auto">
            <Text className="text-2xl font-semibold mb-2">
              Building Category
            </Text>
            <Text className="font-light">Select your building category</Text>
            <View className="mt-10">
              {buildingCategory.map((item, id) => {
                return (
                  <TouchableOpacity
                    key={id}
                    onPress={() => setCategory(item.id)}
                  >
                    <BuildingCategoryCard
                      active={Category === item.id}
                      {...item}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddConstructionStatus", {
                data: { ...data, siteCategory: Category },
              });
            }}
            className="items-center py-5 px-8 rounded-lg w-full bg-purple-800"
          >
            <Text className="text-white font-bold">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomSafeAreaView>
  );
};

export default AddSiteCategory;
