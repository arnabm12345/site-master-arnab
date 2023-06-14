import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  SafeAreaView,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import * as yup from "yup";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import DefaultImage from "../../assets/selected/owner.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const AddMorePersonalDetailsSchema = yup.object().shape({
  gender: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(40)
    .required(),
  address: yup
    .string()
    // .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    // .max(40)
    .required(),
  city: yup
    .string()
    // .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    // .max(40)
    .required(),
  pin: yup
    .string()
    .matches(/^\d{1,10}$/, "Please enter valid Number")
    .min(6)
    .max(6)
    .required(),
});
const InactiveBtnStyle =
  " flex-auto px-4 py-3 border-[1px] rounded-lg text-center items-center";
const ActiveBtnStyle =
  "flex-auto px-4 py-3 border-[2px] rounded-lg border-purple-600 text-center items-center";
export default function AddMorePersonalDetails({ navigation }) {
  const [image, setImage] = useState(null);
  const [Gender, setGender] = useState("male");
  const [Loading, setLoading] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  async function saveAddressDetails(address, city, pin) {
    setLoading(true);
    let accessToken = await SecureStore.getItemAsync("access");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    var raw = JSON.stringify({
      street_address: address,
      city: city,
      country: "India",
      state: "West Bengal",
      pincode: pin,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    if (accessToken) {
      fetch(
        "http://sitemasterdevelopment.centralindia.cloudapp.azure.com:8000/auth/create-address/",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status) {
            navigation.navigate("WelcomeScreen");
          } else {
            console.log(result.message);
          }
        })
        .catch((error) => console.log("error", error))
        .finally(() => setLoading(false));
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
            validationSchema={AddMorePersonalDetailsSchema}
            initialValues={{
              gender: "male",
              address: "",
              city: "",
              pin: "",
            }}
            onSubmit={(values) => {
              console.log(values);
              saveAddressDetails(values.address, values.city, values.pin);
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
                <View className="">
                  <View>
                    <Text className="py-5 text-2xl font-semibold">
                      Personal Details
                    </Text>
                  </View>
                  {/* <View>
                    <View className=" relative items-center w-full">
                      <Text className="py-2 font-semibold">Profile Photo</Text>
                      <View>
                        <Image
                          className="rounded-lg"
                          source={image ? { uri: image } : DefaultImage}
                          style={{ width: 100, height: 100 }}
                        ></Image>
                        <TouchableOpacity
                          onPress={pickImage}
                          className="absolute bottom-0 right-0 p-2 bg-gray-600 rounded-lg"
                        >
                          <MaterialIcons name="edit" size={16} color="white" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View> */}
                  {/* <View className="flex-row items-center">
                    <MaterialIcons
                      name="person-outline"
                      size={16}
                      color="black"
                    />
                    <Text className="ml-2 py-3 text-gray-600">Your Gender</Text>
                  </View>
                  <View className="flex-row gap-4">
                    <TouchableOpacity
                      onPress={() => {
                        setGender("male");
                      }}
                      className={
                        Gender === "male" ? ActiveBtnStyle : InactiveBtnStyle
                      }
                    >
                      <Text>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setGender("female");
                      }}
                      className={
                        Gender === "female" ? ActiveBtnStyle : InactiveBtnStyle
                      }
                    >
                      <Text>Female</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setGender("others");
                      }}
                      className={
                        Gender === "others" ? ActiveBtnStyle : InactiveBtnStyle
                      }
                    >
                      <Text>Others</Text>
                    </TouchableOpacity>
                  </View> */}
                  <View className="flex-row items-center">
                    <MaterialIcons
                      name="person-outline"
                      size={16}
                      color="black"
                    />
                    <Text className="ml-2 py-3 text-gray-600">
                      Your Address
                    </Text>
                  </View>
                  <TextInput
                    // label="email"
                    mode="outlined"
                    className="bg-gray-200 rounded  "
                    name="address"
                    placeholder="Enter your first name"
                    //   style={styles.textInput}
                    onChangeText={handleChange("address")}
                    onBlur={handleBlur("firstName")}
                    value={values.address}
                    outlineColor={"rgb(243,244,246)"}
                    // keyboardType="email-address"
                  />
                  {errors.address && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.address}
                    </Text>
                  )}
                  <View className="flex-row items-center">
                    <MaterialIcons
                      name="person-outline"
                      size={16}
                      color="black"
                    />
                    <Text className="ml-2 py-3 text-gray-600">Your city</Text>
                  </View>
                  <TextInput
                    // label="email"
                    mode="outlined"
                    className="bg-gray-200 rounded  "
                    name="city"
                    placeholder="Enter your last name"
                    //   style={styles.textInput}
                    onChangeText={handleChange("city")}
                    onBlur={handleBlur("city")}
                    value={values.city}
                    outlineColor={"rgb(243,244,246)"}
                    // keyboardType="email-address"
                  />
                  {errors.city && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.city}
                    </Text>
                  )}
                  <View className="flex-row items-center">
                    <Ionicons name="logo-whatsapp" size={16} color="black" />
                    <Text className="ml-2 py-3 text-gray-600">Your pin</Text>
                  </View>
                  <TextInput
                    mode="outlined"
                    name="pin"
                    keyboardType={"phone-pad"}
                    maxLength={10}
                    className=" bg-gray-200 border-0"
                    placeholder="enter pin  number"
                    //   style={styles.textInput}
                    onChangeText={handleChange("pin")}
                    onBlur={handleBlur("pin")}
                    value={values.pin}
                    outlineColor={"rgb(243,244,246)"}
                  />
                  {errors.pin && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.pin}
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
}
