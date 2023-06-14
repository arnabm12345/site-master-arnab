import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomSafeAreaView from "../../utils/CustomSafeAreaView";
import { TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import CustomHeader from "../../Components/CustomHeader";

const createSiteValidationSchema = yup.object().shape({
  siteName: yup.string().required("Site Name is Required"),
  siteArea: yup
    .number("Please input numeric value")
    .required("Area is required")
    .typeError("Please input numeric value")
    .positive("Area can only be positive"),
  siteAreaUnit: yup.string().required("Area"),
  organization: yup.string().required("Organization is required"),
});

const CreateSite = ({ navigation }) => {
  const [selected, setSelected] = React.useState("");

  const data = [
    { key: "m_sq", value: "m_sq" },
    { key: "acre", value: "acre" },
    { key: "sqft", value: "sqft" },
  ];

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
              validationSchema={createSiteValidationSchema}
              initialValues={{
                siteName: "",
                siteArea: "0",
                siteAreaUnit: "m_sq",
                organization: "",
              }}
              onSubmit={(values) => {
                navigation.navigate("AddSiteAddress", { data: values });
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
                <View className="flex-auto">
                  <View className="">
                    <Text className="pt-3 py-1 text-gray-600">Site Name</Text>
                    <TextInput
                      mode="outlined"
                      className="bg-gray-200 rounded-2xl"
                      outlineColor={
                        touched.siteName && errors.siteName
                          ? "red"
                          : "rgb(243,244,246)"
                      }
                      activeOutlineColor={
                        touched.siteName && errors.siteName ? "red" : "purple"
                      }
                      name="Site Name"
                      placeholder="Enter Site Name"
                      //   style={styles.textInput}
                      onChangeText={handleChange("siteName")}
                      onBlur={handleBlur("siteName")}
                      value={values.siteName}
                      // keyboardType="email-address"
                    />
                    {touched.siteName && errors.siteName && (
                      <Text
                        className="text-xs text-red-700 py-1"
                        // style={{ fontSize: 10, color: "red" }}
                      >
                        {errors.siteName}
                      </Text>
                    )}
                    <View className="flex-row justify-between">
                      <View className="flex-auto">
                        <Text className="mt-5 py-1 text-gray-600">
                          Site Area
                        </Text>
                        <TextInput
                          mode="outlined"
                          className="bg-gray-200 rounded-2xl"
                          outlineColor={
                            touched.siteArea && errors.siteArea
                              ? "red"
                              : "rgb(243,244,246)"
                          }
                          activeOutlineColor={
                            touched.siteArea && errors.siteArea
                              ? "red"
                              : "purple"
                          }
                          name="Site Area"
                          placeholder="Enter Site Area"
                          //   style={styles.textInput}
                          onChangeText={handleChange("siteArea")}
                          onBlur={handleBlur("siteArea")}
                          value={values.siteArea}
                          keyboardType="number-pad"
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
                      <View className="ml-5 z-50 ">
                        <Text className="mt-5 py-1 text-gray-600"> </Text>

                        <SelectList
                          boxStyles={{
                            width: 150,
                            marginTop: 8,
                            borderRadius: 4,
                            borderWidth: 0,
                            backgroundColor: "rgb(229,231,235)",
                            paddingVertical: 15,
                            paddingBottom: 13,
                          }}
                          inputStyles={{
                            fontSize: 16,
                            color: "rgb(75,85,99)",
                          }}
                          dropdownStyles={{
                            width: 150,
                            borderRadius: 4,
                            borderWidth: 0,
                            backgroundColor: "rgb(229,231,235)",
                          }}
                          search={false}
                          setSelected={(val) => {
                            setSelected(val);
                            setFieldValue("siteAreaUnit", val);
                          }}
                          data={data}
                          save="value"
                          defaultOption={{ key: "m_sq", value: "m_sq" }}
                        />

                        {/* <TextInput
                        onPress={() => {
                          console.log("Press");
                        }}
                        // disabled
                        editable={false}
                        mode="outlined"
                        className="bg-gray-200 rounded-2xl w-20"
                        outlineColor={
                          touched.siteAreaUnit && errors.siteAreaUnit
                            ? "red"
                            : "rgb(243,244,246)"
                        }
                        activeOutlineColor={
                          touched.siteAreaUnit && errors.siteAreaUnit
                            ? "red"
                            : "purple"
                        }
                        name="siteAreaUnit"
                        placeholder="Unit"
                        //   style={styles.textInput}
                        onChangeText={handleChange("siteAreaUnit")}
                        onBlur={handleBlur("siteAreaUnit")}
                        value={values.siteAreaUnit}
                        keyboardType="number-pad"
                      /> */}
                        {/* {touched.siteArea && errors.siteArea && (
                        <Text
                          className="text-xs text-red-700 py-1"
                          // style={{ fontSize: 10, color: "red" }}
                        >
                          {errors.siteArea}
                        </Text>
                      )} */}
                      </View>
                    </View>
                    <Text className="mt-5  py-1 text-gray-600">
                      Select Organization
                    </Text>
                    <TextInput
                      mode="outlined"
                      className="bg-gray-200 rounded-2xl z-9"
                      outlineColor={
                        touched.organization && errors.organization
                          ? "red"
                          : "rgb(243,244,246)"
                      }
                      activeOutlineColor={
                        touched.organization && errors.organization
                          ? "red"
                          : "purple"
                      }
                      name="Select Organization"
                      placeholder="Enter Organization name"
                      //   style={styles.textInput}
                      onChangeText={handleChange("organization")}
                      onBlur={handleBlur("organization")}
                      value={values.organization}
                      // keyboardType="email-address"
                    />
                    {touched.organization && errors.organization && (
                      <Text
                        className="text-xs text-red-700 py-1"
                        // style={{ fontSize: 10, color: "red" }}
                      >
                        {errors.organization}
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
                    <Text className="text-white font-bold">Next</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </CustomSafeAreaView>
  );
};

export default CreateSite;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    marginTop: 8,
    width: 150,
    height: 50,
    backgroundColor: "rgb(229,231,235)",
    borderColor: "gray",
    // borderWidth: 0.5,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  //   label: {
  //     position: "absolute",
  //     backgroundColor: "white",
  //     left: 22,
  //     top: 8,
  //     zIndex: 999,
  //     paddingHorizontal: 8,
  //     fontSize: 14,
  //   },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
