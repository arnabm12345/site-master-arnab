import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomSafeAreaView from "../../utils/CustomSafeAreaView";
import { TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import CustomHeader from "../../Components/CustomHeader";
import * as Location from "expo-location";

const adminTypeBtnActive =
  "flex-auto bg-purple-200 border-[1px] border-purple-700  flex-row justify-between items-center p-3 px-5 rounded-lg";
const adminTypeBtnInactive =
  "flex-auto bg-gray-200  flex-row justify-between items-center p-3 px-5 rounded-lg";
const MUNICIPALITY = 2;
const PANCHAYET = 3;

const createSiteAddressSchema = yup.object().shape({
  administrativeBodyType: yup.string().required("Site Name is Required"),
  administrativeBodyName: yup
    .string("Please input numeric value")
    .required("This is required"),
  siteAddress: yup.string().required("Address is Required"),
  sitePin: yup.string().max(6).min(6).required("pin is required"),
  siteCity: yup.string().required("City is required"),
  siteState: yup.string().required("State is required"),
  siteLat: yup.string().required("latitude is required"),
  siteLong: yup.string().required("longitude is required"),
});

const AddSiteAddress = ({ navigation, route }) => {
  const { data } = route.params;
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");
  const [LocationAccess, setLocationAccess] = useState(false);

  //Map is initializes when arriving at this screen
  useEffect(() => {
    mapInitialization();
  }, []);

  //location permission function
  const mapInitialization = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setLocationAccess(status === "granted");
    setStatus(status);
  };

  //Opens settings and runs the mapinitialization() to update the latest state
  const locationAccessPrompt = () => {
    Linking.openSettings();
    mapInitialization();
  };

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
            <Formik
              validationSchema={createSiteAddressSchema}
              initialValues={{
                //   email: route.params?.email ?? "",
                administrativeBodyName: "",
                administrativeBodyType: 2,
                siteAddress: "",
                sitePin: "",
                siteCity: "",
                siteState: "",
                siteLat: location?.latitude ?? "0",
                siteLong: location?.longitude ?? "0",
              }}
              onSubmit={(values) => {
                console.log(values);
                navigation.navigate("AddSiteCategory", {
                  data: { ...data, ...values },
                });
                //   logIn(values.email, values.password);
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
              }) => {
                const activeBtn =
                  values.administrativeBodyType === MUNICIPALITY ? true : false;
                const [Disabled, setDisabled] = useState(true);
                const [IsPinLoading, setIsPinLoading] = useState(false);

                useEffect(() => {
                  if (values.sitePin.length === 6) {
                    console.log("start");
                    setIsPinLoading(true);
                    fetch(
                      "https://api.postalpincode.in/pincode/" + values.sitePin
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        console.log("data", data);
                        if (!data?.[0]?.PostOffice?.[0]) {
                          setDisabled(false);
                        }
                        console.log(data?.[0]?.PostOffice?.[0]);
                        setFieldValue(
                          "siteCity",
                          data?.[0]?.PostOffice?.[0]?.Block || ""
                        );
                        setFieldValue(
                          "siteState",
                          data?.[0]?.PostOffice?.[0]?.State || ""
                        );
                      })
                      .catch((err) => {
                        console.log("error", err);
                        setDisabled(false);
                      })
                      .finally(() => {
                        setIsPinLoading(false);
                      });
                  }
                }, [values.sitePin]);
                useEffect(() => {
                  async function fetchLocation() {
                    let loc = await Location.getCurrentPositionAsync({});
                    setLocation(loc.coords);
                    setFieldValue("siteLat", loc.coords.latitude.toString());
                    setFieldValue("siteLong", loc.coords.longitude.toString());
                  }
                  fetchLocation();
                }, []);

                return (
                  <>
                    <View className="flex-auto">
                      <ScrollView className="">
                        <Text className="text-2xl font-semibold">
                          Site Address details
                        </Text>
                        <Text className="text-xs font-light">
                          add your site address, and local administrative body
                        </Text>

                        <View className="flex-row justify-between py-2">
                          <TouchableOpacity
                            onPress={() =>
                              setFieldValue(
                                "administrativeBodyType",
                                MUNICIPALITY
                              )
                            }
                            className={
                              activeBtn
                                ? adminTypeBtnActive
                                : adminTypeBtnInactive
                            }
                          >
                            <Text>Municipality</Text>
                            <Fontisto
                              name={
                                activeBtn
                                  ? "checkbox-active"
                                  : "checkbox-passive"
                              }
                              size={16}
                              color={activeBtn ? "purple" : "black"}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              setFieldValue("administrativeBodyType", PANCHAYET)
                            }
                            className={
                              "ml-3 " +
                              (activeBtn
                                ? adminTypeBtnInactive
                                : adminTypeBtnActive)
                            }
                          >
                            <Text>Panchayet</Text>
                            <Fontisto
                              name={
                                activeBtn
                                  ? "checkbox-passive"
                                  : "checkbox-active"
                              }
                              size={16}
                              color={activeBtn ? "black" : "purple"}
                            />
                          </TouchableOpacity>
                        </View>

                        <Text className="pt-3 py-1 text-gray-600">
                          Local Administrative Body Name
                        </Text>
                        <TextInput
                          mode="outlined"
                          className="bg-gray-200 rounded-2xl"
                          outlineColor={
                            touched.administrativeBodyName &&
                            errors.administrativeBodyName
                              ? "red"
                              : "rgb(243,244,246)"
                          }
                          activeOutlineColor={
                            touched.administrativeBodyName &&
                            errors.administrativeBodyName
                              ? "red"
                              : "purple"
                          }
                          name="administrativeBodyName"
                          placeholder="Enter Municipality name"
                          //   style={styles.textInput}
                          onChangeText={handleChange("administrativeBodyName")}
                          onBlur={handleBlur("administrativeBodyName")}
                          value={values.administrativeBodyName}
                          // keyboardType="email-address"
                        />
                        {touched.administrativeBodyName &&
                          errors.administrativeBodyName && (
                            <Text
                              className="text-xs text-red-700 py-1"
                              // style={{ fontSize: 10, color: "red" }}
                            >
                              {errors.administrativeBodyName}
                            </Text>
                          )}

                        <Text className="mt-5 py-1 text-gray-600">
                          Site Address
                        </Text>
                        <TextInput
                          mode="outlined"
                          className="bg-gray-200 rounded-2xl"
                          outlineColor={
                            touched.siteAddress && errors.siteAddress
                              ? "red"
                              : "rgb(243,244,246)"
                          }
                          activeOutlineColor={
                            touched.siteAddress && errors.siteAddress
                              ? "red"
                              : "purple"
                          }
                          name="siteAddress"
                          placeholder="Enter Here"
                          //   style={styles.textInput}
                          onChangeText={handleChange("siteAddress")}
                          onBlur={handleBlur("siteAddress")}
                          value={values.siteAddress}
                          // keyboardType="number-pad"
                        />
                        {touched.siteAddress && errors.siteAddress && (
                          <Text
                            className="text-xs text-red-700 py-1"
                            // style={{ fontSize: 10, color: "red" }}
                          >
                            {errors.siteAddress}
                          </Text>
                        )}
                        <View className="flex-row justify-between">
                          <View className="w-24">
                            <Text className="mt-5 py-1 text-gray-600">Pin</Text>
                            <TextInput
                              mode="outlined"
                              className="bg-gray-200 rounded-2xl"
                              outlineColor={
                                touched.sitePin && errors.sitePin
                                  ? "red"
                                  : "rgb(243,244,246)"
                              }
                              activeOutlineColor={
                                touched.sitePin && errors.sitePin
                                  ? "red"
                                  : "purple"
                              }
                              name="sitePin"
                              placeholder="Enter Here"
                              //   style={styles.textInput}
                              onChangeText={handleChange("sitePin")}
                              // onChange={handleChange("sitePin")}
                              onBlur={handleBlur("sitePin")}
                              value={values.sitePin}
                              keyboardType="number-pad"
                            />
                            {touched.sitePin && errors.sitePin && (
                              <Text
                                className="text-xs text-red-700 py-1"
                                // style={{ fontSize: 10, color: "red" }}
                              >
                                {errors.sitePin}
                              </Text>
                            )}
                          </View>
                          <View className="ml-5 flex-auto ">
                            <Text className="mt-5 py-1 text-gray-600">
                              City/Town
                            </Text>
                            <TextInput
                              disabled={Disabled}
                              mode="outlined"
                              className="bg-gray-200 rounded-2xl"
                              outlineColor={
                                touched.siteCity && errors.siteCity
                                  ? "red"
                                  : "rgb(243,244,246)"
                              }
                              activeOutlineColor={
                                touched.siteCity && errors.siteCity
                                  ? "red"
                                  : "purple"
                              }
                              name="siteCity"
                              placeholder="Enter Here"
                              //   style={styles.textInput}
                              onChangeText={handleChange("siteCity")}
                              onBlur={handleBlur("siteCity")}
                              value={values.siteCity}
                              // keyboardType="number-pad"
                            />
                            {touched.siteArea && errors.siteArea && (
                              <Text
                                className="text-xs text-red-700 py-1"
                                // style={{ fontSize: 10, color: "red" }}
                              >
                                {errors.siteArea}
                              </Text>
                            )}
                          </View>
                        </View>
                        <Text className="mt-5  py-1 text-gray-600">State</Text>
                        <TextInput
                          disabled={Disabled}
                          mode="outlined"
                          className="bg-gray-200 rounded-2xl z-9"
                          outlineColor={
                            touched.siteState && errors.siteState
                              ? "red"
                              : "rgb(243,244,246)"
                          }
                          activeOutlineColor={
                            touched.siteState && errors.siteState
                              ? "red"
                              : "purple"
                          }
                          name="siteState"
                          placeholder="Enter State"
                          //   style={styles.textInput}
                          onChangeText={handleChange("siteState")}
                          onBlur={handleBlur("siteState")}
                          value={values.siteState}
                          // keyboardType="email-address"
                        />
                        {touched.siteState && errors.siteState && (
                          <Text
                            className="text-xs text-red-700 py-1"
                            // style={{ fontSize: 10, color: "red" }}
                          >
                            {errors.siteState}
                          </Text>
                        )}
                        <View className="flex-row">
                          <View className="flex-auto">
                            <Text className="mt-5  py-1 text-gray-600">
                              Latitude
                            </Text>
                            <TextInput
                              disabled={LocationAccess}
                              mode="outlined"
                              className="bg-gray-200 rounded-2xl z-9"
                              outlineColor={
                                touched.siteLat && errors.siteLat
                                  ? "red"
                                  : "rgb(243,244,246)"
                              }
                              activeOutlineColor={
                                touched.siteLat && errors.siteLat
                                  ? "red"
                                  : "purple"
                              }
                              name="siteLat"
                              placeholder="Enter Latitude"
                              //   style={styles.textInput}
                              onChangeText={handleChange("siteLat")}
                              onBlur={handleBlur("siteLat")}
                              value={values.siteLat}
                              // keyboardType="email-address"
                            />
                            {touched.siteLat && errors.siteLat && (
                              <Text
                                className="text-xs text-red-700 py-1"
                                // style={{ fontSize: 10, color: "red" }}
                              >
                                {errors.siteLat}
                              </Text>
                            )}
                          </View>
                          <View className="flex-auto ml-4">
                            <Text className="mt-5  py-1 text-gray-600">
                              Longitude
                            </Text>
                            <TextInput
                              disabled={LocationAccess}
                              mode="outlined"
                              className="bg-gray-200 rounded-2xl z-9"
                              outlineColor={
                                touched.siteLong && errors.siteLong
                                  ? "red"
                                  : "rgb(243,244,246)"
                              }
                              activeOutlineColor={
                                touched.siteLong && errors.siteLong
                                  ? "red"
                                  : "purple"
                              }
                              name="siteState"
                              placeholder="Enter longitude"
                              //   style={styles.textInput}
                              onChangeText={handleChange("siteLong")}
                              onBlur={handleBlur("siteLong")}
                              value={values.siteLong}
                              // keyboardType="email-address"
                            />
                            {touched.siteLong && errors.siteLong && (
                              <Text
                                className="text-xs text-red-700 py-1"
                                // style={{ fontSize: 10, color: "red" }}
                              >
                                {errors.siteLong}
                              </Text>
                            )}
                          </View>
                          <View className="items-center justify-end">
                            <TouchableOpacity
                              className="p-4 bg-blue-100 ml-4 rounded"
                              onPress={async () => {
                                status === "granted"
                                  ? null
                                  : locationAccessPrompt();
                                if (status === "granted") {
                                  let loc =
                                    await Location.getCurrentPositionAsync({});
                                  setLocation(loc.coords);
                                  setFieldValue(
                                    "siteLat",
                                    loc.coords.latitude.toString()
                                  );
                                  setFieldValue(
                                    "siteLong",
                                    loc.coords.longitude.toString()
                                  );
                                }
                              }}
                            >
                              <Text>
                                {/* {status === "granted"
                                ? "Locate Me"
                                : "Ask Location Permission"} */}
                                <FontAwesome
                                  name="location-arrow"
                                  size={16}
                                  color="black"
                                />
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View className="h-32"></View>
                      </ScrollView>
                      <TouchableOpacity
                        className={
                          "absolute bottom-0  items-center py-5 px-8 rounded-lg w-full " +
                          (isValid ? "bg-purple-800" : "bg-gray-400")
                        }
                        onPress={handleSubmit}
                        disabled={!isValid}
                      >
                        <Text className="text-white font-bold">Next</Text>
                      </TouchableOpacity>
                    </View>
                    {IsPinLoading ? (
                      <View className="absolute w-11/12 h-full items-center justify-center">
                        <ActivityIndicator
                          className=""
                          size={"large"}
                          color={"purple"}
                        />
                      </View>
                    ) : null}
                  </>
                );
              }}
            </Formik>
          </View>
        </View>
      </View>
    </CustomSafeAreaView>
  );
};

export default AddSiteAddress;
