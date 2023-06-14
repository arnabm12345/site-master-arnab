import {
  View,
  Text,
  // TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import * as Location from "expo-location";
import { Octicons } from "@expo/vector-icons";
import BASE_URL from "../utils/constant";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const AddPersonalDetailsSchema = yup.object().shape({
  firstName: yup
    .string("Please enter valid name")
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(40)
    .required("Please enter a Valid Name"),
  lastName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(40)
    .required(),
  phone: yup
    .string()
    .matches(/^\d{1,10}$/, "Please enter valid Number")
    .min(10)
    .max(10)
    .required(),
});

const AddPersonalDetails = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phone, setphone] = useState("");

  //Location service start

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  async function AddUserDetails(firstName, lastName, phone) {
    const lang = (await AsyncStorage.getItem("lang")) || "English";
    let accessToken = await SecureStore.getItemAsync("access");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    var raw = JSON.stringify({
      contact_number: phone,
      first_name: firstName,
      last_name: lastName,
      language: lang,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (accessToken) {
      fetch(
        "http://sitemasterdevelopment.centralindia.cloudapp.azure.com:8000/auth/create-userdetails/",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          if (result?.status) {
            navigation.navigate("AddMorePersonalDetails");
          } else {
            console.log(result);
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      navigation.navigate("LoginScreen");
    }
  }

  return (
    <SafeAreaView>
      <View className="px-10 py-5">
        {/* <View className="flex-row w-full justify-around pt-3">
            <TouchableOpacity className="py-3 rounded-lg w-6/12 justify-center">
              <Text className="text-center font-bold">Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-3 rounded-lg bg-gray-300 w-6/12 justify-center">
              <Text className="text-center font-bold">Email</Text>
            </TouchableOpacity>
          </View> */}
        <View className="mt-5">
          {/* <Text>{text}</Text> */}
          <Formik
            validationSchema={AddPersonalDetailsSchema}
            initialValues={{
              firstName: "",
              lastName: "",
              phone: "",
            }}
            onSubmit={(values) => {
              console.log(values);
              AddUserDetails(values.firstName, values.lastName, values.phone);
              //
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              touched,
            }) => (
              <View className="flex flex-col justify-between h-full">
                <View className="pt-10">
                  <View>
                    <Text className="pb-1 text-2xl font-semibold">
                      Personal Details
                    </Text>
                  </View>

                  <View className="flex-row items-center pt-6">
                    <MaterialIcons
                      name="person-outline"
                      size={16}
                      color="black"
                    />
                    <Text className="ml-2 text-gray-600">Your First Name</Text>
                  </View>

                  <TextInput
                    // label="email"
                    mode="outlined"
                    className="bg-gray-200 rounded  "
                    name="firstName"
                    placeholder="Enter your first name"
                    //   style={styles.textInput}
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    value={values.firstName}
                    outlineColor={
                      touched.firstName && errors.firstName
                        ? "red"
                        : "rgb(243,244,246)"
                    }
                    activeOutlineColor={
                      touched.firstName && errors.firstName
                        ? "red"
                        : "rgb(243,244,246)"
                    }
                    // keyboardType="email-address"
                  />
                  {errors.firstName && (
                    <Text
                      className="py-1"
                      style={{ fontSize: 10, color: "red" }}
                    >
                      {errors.firstName}
                    </Text>
                  )}
                  <View className="flex-row items-center pt-5">
                    <MaterialIcons
                      name="person-outline"
                      size={16}
                      color="black"
                    />
                    <Text className="ml-2 text-gray-600">Your Last Name</Text>
                  </View>
                  <TextInput
                    // label="email"
                    mode="outlined"
                    className="bg-gray-200 rounded  "
                    name="lastName"
                    placeholder="Enter your last name"
                    //   style={styles.textInput}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    value={values.lastName}
                    outlineColor={
                      touched.lastName && errors.lastName
                        ? "red"
                        : "rgb(243,244,246)"
                    }
                    // keyboardType="email-address"
                  />
                  {errors.lastName && (
                    <Text
                      className="py-1"
                      style={{ fontSize: 10, color: "red" }}
                    >
                      {errors.lastName}
                    </Text>
                  )}

                  <View className="flex-row items-center pt-5">
                    <Ionicons name="logo-whatsapp" size={16} color="black" />
                    <Text className="ml-2 text-gray-600">
                      Your Whatsapp Number
                    </Text>
                  </View>

                  <TextInput
                    mode="outlined"
                    name="phone"
                    keyboardType={"phone-pad"}
                    maxLength={10}
                    className=" bg-gray-200 border-0"
                    placeholder="enter your phone number"
                    //   style={styles.textInput}
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    value={values.phone}
                    outlineColor={"rgb(243,244,246)"}
                  />

                  {errors.phone && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.phone}
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  className={
                    "absolute bottom-0  items-center py-5 px-8 rounded-lg w-full transition-all " +
                    (isValid ? "bg-purple-800" : "bg-gray-400")
                  }
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  <Text className="text-white font-bold">Save</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddPersonalDetails;
