import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import CustomSafeAreaView from "../../utils/CustomSafeAreaView";
import { TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import moment from "moment";
import {
  MaterialCommunityIcons,
  AntDesign,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../Components/CustomHeader";
import * as SecureStore from "expo-secure-store";


const ConstructionValidationSchema = yup.object().shape({
  constructionStartingDate: yup.string().required("date is Required"),
  constructionStage: yup.string().required("Construction stage is required"),
});

const AddConstructionStatus = ({ navigation, route }) => {
  const { data } = route.params;
  const [CalendarOpen, setCalendarOpen] = useState(false);

  return (
    <CustomSafeAreaView>
      <View className="w-full h-full">
        <CustomHeader
          navigation={navigation}
          title={"Create New Site"}
          rightBtnNavigationRoute={"SitesDashboard"}
        />
        <View className=" p-5 px-10 flex-auto">
          <Formik
            validationSchema={ConstructionValidationSchema}
            initialValues={{
              constructionStartingDate: moment().format("YYYY-MM-DD"),
              constructionStage: "",
            }}
            onSubmit={async (values) => {
              let savedData = { ...values, ...data };
              console.log("savedData", savedData.siteAreaUnit);
              let accessToken = await SecureStore.getItemAsync("access");

              var requestOptions = {
                method: "POST",
                headers: new Headers({
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
                }),
                body: JSON.stringify({
                  site_name: savedData.siteName,
                  site_area: savedData.siteArea,
                  uom: savedData.siteAreaUnit,
                  address: savedData.siteAddress,
                  city: savedData.siteCity,
                  pincode: savedData.sitePin,
                  start_date: savedData.constructionStartingDate,
                  constructionStage: savedData.constructionStage,
                  latitude: savedData.siteLat,
                  longitude: savedData.siteLong,
                  state: savedData.siteState,
                  organization: savedData.organization,
                  local_admin_body_name: savedData.administrativeBodyName,
                  site_catagory_id: savedData.siteCategory,
                  local_admin_body_id: savedData.administrativeBodyType,
                }),
                redirect: "follow",
              };
              if (accessToken) {
                fetch(
                  "http://sitemasterdevelopment.centralindia.cloudapp.azure.com:8000/sites/create-sites/",
                  requestOptions
                )
                  .then((response) => response.json())
                  .then((result) => {
                    if (result.status) {
                      navigation.navigate("SitesDashboard");
                    }
                    console.log("success", JSON.stringify(result));
                  })
                  .catch((error) => console.log("error", error));
              }
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
              setFieldValue,
            }) => (
              <View className="flex flex-col justify-between h-full">
                <View className="">
                  <Text className="text-2xl font-semibold mb-2">
                    Construction Status
                  </Text>

                  <Text className="font-light pb-10">
                    add your current construction details
                  </Text>

                  <Text className="pt-3 py-1 text-gray-600">Starting Date</Text>
                  {/* <TextInput
                    // label="email"
                    mode="outlined"
                    className="bg-gray-200 rounded-2xl"
                    outlineColor={
                      touched.email && errors.email ? "red" : "rgb(243,244,246)"
                    }
                    activeOutlineColor={
                      touched.email && errors.email ? "red" : "purple"
                    }
                    name="email"
                    placeholder="Enter your email Address"
                    //   style={styles.textInput}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                  /> */}

                  <TouchableOpacity
                    onPress={() => {
                      setCalendarOpen(true);
                    }}
                    className="p-4 bg-gray-200 rounded flex-row justify-between items-center"
                  >
                    <Text>{values.constructionStartingDate}</Text>
                    <Ionicons
                      name="md-calendar-outline"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                  {errors.constructionStartingDate && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.constructionStartingDate}
                    </Text>
                  )}
                  <Text className="mt-3 py-1 text-gray-600">
                    Construction Stage
                  </Text>
                  <TextInput
                    name="constructionStage"
                    mode="outlined"
                    className=" bg-gray-200 rounded "
                    outlineColor={
                      touched.constructionStage && errors.constructionStage
                        ? "red"
                        : "rgb(243,244,246)"
                    }
                    activeOutlineColor={
                      touched.constructionStage && errors.constructionStage
                        ? "red"
                        : "purple"
                    }
                    placeholder="enter construction stage"
                    //   style={styles.textInput}
                    onChangeText={handleChange("constructionStage")}
                    onBlur={handleBlur("constructionStage")}
                    value={values.constructionStage}
                  />
                  {touched.constructionStage && errors.constructionStage && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.constructionStage}
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  className={
                    "absolute bottom-0  items-center py-5 px-8 rounded-lg w-full " +
                    (isValid ? "bg-purple-800" : "bg-gray-400")
                  }
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  <Text className="text-white font-bold">Create Site</Text>
                </TouchableOpacity>
                {CalendarOpen && (
                  <View
                    onPress={() => setCalendarOpen(false)}
                    className="absolute backdrop-blur-2xl h-4/5 w-full items-center justify-center"
                  >
                    <View></View>
                    <View className="bg-white p-2 border rounded">
                      <CalendarPicker
                        width={350}
                        height={400}
                        onDateChange={(date) => {
                          setCalendarOpen(false);
                          setFieldValue(
                            "constructionStartingDate",
                            moment(date).format("YYYY-MM-DD")
                          );
                        }}
                      />
                    </View>
                  </View>
                )}
              </View>
            )}
          </Formik>
        </View>
      </View>
    </CustomSafeAreaView>
  );
};

export default AddConstructionStatus;
