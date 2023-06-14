import {
  View,
  Text,
  // TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  Touchable,
} from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import * as Location from "expo-location";
import { Ionicons, Octicons, Feather } from "@expo/vector-icons";

import { SelectList } from "react-native-dropdown-select-list";
import { AntDesign } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ScrollView } from "react-native";

const formValidationSchema = yup.object().shape({
  material: yup.string().required("Material is Required"),
  site_area: yup.string().required("Site area is Required"),
  unit: yup.string().required("Site area unit is Required"),
  organization: yup.string().required("organization is Required"),
  sub_cat: yup.string(),
  specification: yup.string(),
  curr_stock: yup.string().required("Current Stock is Required"),
});

const AddMaterial1 = ({ navigation }) => {
  const [Loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);

  const data = [
    { key: "Bricks", value: "Bricks" },
    { key: "Cement", value: "Cement" },
    { key: "Sand", value: "Sand" },
    {key: "Gravel" , value: "Gravel"},
    {key: "Crushed stone" , value: "Crushed stone"},
    {key: "Steel Rebar" , value: "Steel Rebar"},
    {key: "Steel Mesh" , value: "Steel Mesh"},
    {key: "Concrete Blocks" , value: "Concrete Blocks"},
    {key: "Gravel" , value: "Gravel"},
  ];

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-4 py-4">
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 600 }}>Add Material</Text>
            <TouchableOpacity>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View className=" px-5 ">
            <Formik
              validationSchema={formValidationSchema}
              initialValues={{
                material: "",
                sub_cat: "",
                unit: "",
                specification: "",
                curr_stock: "",
              }}
              onSubmit={(values) => {
                console.log(values);
                navigation.navigate("CreateSite2", {
                  name: values.name,
                  site_area: values.site_area,
                  organization: values.organization,
                  unit: values.unit,
                });
                //signUp(values.email, values.password);
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
                <View className="flex flex-auto justify-evenly h-max">
                  <View className="py-4">
                    <Text className="  font-medium text-sm">
                      Select Material From Library
                    </Text>
                    <SelectList
                      name="material"
                      mode="outlined"
                      className="bg-purple-200  rounded"
                      dropdownItemStyles={{}}
                      dropdownTextStyles={{}}
                      placeholder="Select Material"
                      setSelected={handleChange("material")}
                      onBlur={handleBlur("material")}
                      value={values.material}
                      boxStyles={{ backgroundColor: "rgb(229, 231, 235)", marginTop: 6,borderColor:'rgba(245, 40, 145, 0.01)' }}
                      data={data}
                    />
                    {touched.material && errors.material && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.material}
                      </Text>
                    )}
                  </View>

                  <View className="py-3">
                    <BouncyCheckbox
                      isChecked={selected}
                      onPress={() => {
                        setSelected(!selected);
                      }}
                      size={24}
                      fillColor="rgba(113, 26, 167, 1)"
                      text="Sub Category"
                      unfillColor="white"
                      textStyle={{
                        color: "black",
                        textDecorationLine: "none",
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    />

                    {selected && (
                      <View>
                        <TextInput
                          name="sub_cat"
                          mode="outlined"
                          className="bg-gray-200 h-11 "
                         outlineStyle={{borderRadius:8,borderColor:'rgba(245, 40, 145, 0.01)'}}
                         //contentStyle={{backgroundColor:'rgba(243, 244, 246, 1)'}}
                          placeholder="Enter Here"
                          onChangeText={handleChange("sub_cat")}
                          onBlur={handleBlur("sub_cat")}
                          value={values.sub_cat}
                        />
                        {touched.sub_cat && values.sub_cat == "" && (
                          <Text style={{ fontSize: 10, color: "red" }}>
                            sub catergory required
                          </Text>
                        )}
                      </View>
                    )}
                  </View>

                  <View className="py-3">
                    <Text className=" font-medium text-sm">
                      Specification (Optional)
                    </Text>

                    <TextInput
                      name="specification"
                      mode="outlined"
                      multiline
                      numberOfLines={2}
                      outlineStyle={{borderRadius:8,borderColor:'rgba(245, 40, 145, 0.01)'}}
                      className="bg-gray-200 rounded-lg h-20 "
                      placeholder="Enter Here"
                      onChangeText={handleChange("specification")}
                      onBlur={handleBlur("specification")}
                      value={values.specification}
                    />
                  </View>

                  <View className="py-3">
                    <Text className=" font-medium text-sm">
                      Unit of Measurement
                    </Text>
                    <SelectList
                      name="unit"
                      mode="outlined"
                      className="bg-gray-200 rounded"
                      placeholder="Select unit"
                      setSelected={handleChange("unit")}
                      onBlur={handleBlur("unit")}
                      value={values.material}
                      boxStyles={{ backgroundColor: "rgb(229, 231, 235)", marginTop: 6,borderColor:'rgba(245, 40, 145, 0.01)' }}
                      data={data}
                    />
                  </View>

                  <View className="">
                    <Text className="mt-5 font-medium text-sm">
                      Add Current Stock
                    </Text>

                    <TextInput
                      name="curr_stock"
                      mode="outlined"
                      className="bg-gray-200 rounded-lg h-11 "
                      outlineStyle={{borderRadius:8,borderColor:'rgba(245, 40, 145, 0.01)'}}
                      placeholder="Enter Here"
                      onChangeText={handleChange("curr_stock")}
                      onBlur={handleBlur("curr_stock")}
                      value={values.curr_stock}
                      keyboardType="number-pad"
                    />
                    {touched.curr_stock && errors.curr_stock && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.curr_stock}
                      </Text>
                    )}
                  </View>

                  <TouchableOpacity
                    className={
                      "mt-32  items-center py-5 px-8 rounded-lg w-full " +
                      (isValid ? "bg-purple-800" : "bg-gray-400")
                    }
                    onPress={handleSubmit}
                    disabled={!isValid}
                  >
                    <View className="flex flex-row ">
                      <Text className="text-white font-bold mr-3">Save</Text>
                      <AntDesign name="check" size={20} color="white" />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
        {Loading ? (
          <View className="absolute w-full h-full items-center justify-center z-10">
            <ActivityIndicator color={"purple"} size={"large"} />
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddMaterial1;
