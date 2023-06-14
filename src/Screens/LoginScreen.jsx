import {
  View,
  Text,
  // TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import * as Location from "expo-location";
import { Octicons } from "@expo/vector-icons";
import BASE_URL from "../utils/constant";
import * as SecureStore from "expo-secure-store";
import LoadingComponent from "../Components/LoadingComponent";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

const LoginScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [Loading, setLoading] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(true);

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

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  //Location service start

  //signup start
  function resendOtp(email) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    var raw = JSON.stringify({
      email: email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BASE_URL}/auth/resendotp/`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  function logIn(email, password) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    var raw = JSON.stringify({
      email: email.toLowerCase(),
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "http://sitemasterdevelopment.centralindia.cloudapp.azure.com:8000/auth/login/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result?.status && result.data?.access) {
          navigation.navigate("WelcomeScreen");
          save("access", result.data?.access);
          save("refresh", result.data?.refresh);
        } else {
          if (result.message?.toLowerCase().includes("not verified")) {
            resendOtp(email.toLowerCase());
            console.log("resend");
            navigation.navigate("VerifyOtpScreen", {
              email: email.toLowerCase(),
            });
          } else {
            Alert.alert(result.message, "Please Enter Correct Credentials", [
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
          }
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(false));
  }

  //sighup end

  return (
    <SafeAreaView>
      <View className="px-10 py-5">
        <View className="mt-5">
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{
              email: route.params?.email ?? "",
              password: "",
            }}
            onSubmit={(values) => {
              setLoading(true);
              Keyboard.dismiss();
              setTimeout(() => {
                logIn(values.email, values.password);
              }, 4000);
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
                  <Text className="py-5 text-2xl font-semibold">
                    Login with Email id
                  </Text>
                  <Text className="pt-3 py-1 text-gray-600">Email ID</Text>
                  <TextInput
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
                  />
                  {touched.email && errors.email && (
                    <Text
                      className="text-xs text-red-700 py-1"
                      // style={{ fontSize: 10, color: "red" }}
                    >
                      {errors.email}
                    </Text>
                  )}
                  <Text className="pt-3 py-1 text-gray-600">Password</Text>
                  <TextInput
                    name="password"
                    mode="outlined"
                    className=" bg-gray-200 rounded "
                    outlineColor={
                      touched.password && errors.password
                        ? "red"
                        : "rgb(243,244,246)"
                    }
                    activeOutlineColor={
                      touched.password && errors.password ? "red" : "purple"
                    }
                    placeholder="Password"
                    //   style={styles.textInput}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={passwordVisible}
                    right={
                      <TextInput.Icon
                        icon={passwordVisible ? "eye" : "eye-off"}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                      />
                    }
                  />
                  {touched.password && errors.password && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.password}
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("SignupScreen");
                    }}
                  >
                    <Text className="py-5">
                      Don't Have a Account ?{" "}
                      <Text className="font-bold">Sign Up</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  className={
                    "absolute bottom-0  items-center py-5 px-8 rounded-lg w-full " +
                    (isValid ? "bg-purple-800" : "bg-gray-400")
                  }
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  <Text className="text-white font-bold">Log In</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </View>
      {Loading && <LoadingComponent />}
    </SafeAreaView>
  );
};

export default LoginScreen;
