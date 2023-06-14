import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

import React, { useState, useEffect } from "react";
import ownerActive from "../../assets/selected/owner.png";
import contractorActive from "../../assets/selected/contractor.png";
import supervisorActive from "../../assets/selected/supervisor.png";
import managerActive from "../../assets/selected/manager.png";
import architectEngineerActive from "../../assets/selected/architect_engineer.png";
import othersActive from "../../assets/selected/others.png";

import ownerInactive from "../../assets/notSelected/owner_ns.png";
import contractorInactive from "../../assets/notSelected/contractor_ns.png";
import supervisorInactive from "../../assets/notSelected/supervisor_ns.png";
import managerInactive from "../../assets/notSelected/manager_ns.png";
import architectEngineerInactive from "../../assets/notSelected/architect_engineer_ns.png";
import othersInactive from "../../assets/notSelected/others_ns.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Data = {
  owner: {
    title: "Owner",
    activeIcon: ownerActive,
    inactiveIcon: ownerInactive,
  },
  contractor: {
    title: "contractor",
    activeIcon: contractorActive,
    inactiveIcon: contractorInactive,
  },
  supervisor: {
    title: "Supervisor",
    activeIcon: supervisorActive,
    inactiveIcon: supervisorInactive,
  },
  manager: {
    title: "Manager",
    activeIcon: managerActive,
    inactiveIcon: managerInactive,
  },
  architectEngineer: {
    title: "Architect/Engineer",
    activeIcon: architectEngineerActive,
    inactiveIcon: architectEngineerInactive,
  },
  others: {
    title: "Other",
    activeIcon: othersActive,
    inactiveIcon: othersInactive,
  },
};

const Card = ({ data, name, active, setProfession }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setProfession(name);
      }}
      className="w-1/2 p-10"
    >
      <View className="  h-36 justify-center items-center rounded-lg">
        <View
          className={
            "border-purple-800 rounded-[18px] " +
            (active ? "border-4" : "border-0")
          }
        >
          <Image
            source={active ? data.activeIcon : data.inactiveIcon}
            className={"h-full w-full object-contain aspect-square "}
          />
        </View>

        <Text
          className={
            " text-purple-950 py-4  text-md " +
            (active ? "font-extrabold" : " ")
          }
        >
          {data.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const AddDetails = ({ navigation }) => {
  const [Profession, setProfession] = useState("owner");

  return (
    <SafeAreaView>
      <View className="pt-10 px-5 h-full">
        <Text className="font-bold text-lg  pb-4">Select Your Profession</Text>
        <View className="flex-row flex-wrap ">
          {Object.keys(Data).map((it, i) => (
            <Card
              key={i}
              data={Data[it]}
              active={Profession === it}
              name={it}
              setProfession={setProfession}
            />
          ))}
        </View>
      </View>
      <TouchableOpacity
        className="absolute bottom-10 mx-10 bg-purple-800 items-center py-5 px-8 rounded-lg w-10/12"
        onPress={() => {
          navigation.navigate("AddPersonalDetails", { profession: Profession });
        }}
        // disabled={!isValid}
      >
        <Text className="text-white font-bold">Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddDetails;
