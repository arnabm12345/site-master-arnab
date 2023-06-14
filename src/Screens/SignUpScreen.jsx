import {
  View,
  Text,
  // TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import * as Location from "expo-location";
import { Octicons } from "@expo/vector-icons";
import BASE_URL from "../utils/constant";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Passwords must match"),
});

const SignupScreen = ({ navigation }) => {
  const [Loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] =
    useState(true);

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

  //Location service end

  //signup start

  function signUp(email, password) {
    setLoading(true);
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
      "http://sitemasterdevelopment.centralindia.cloudapp.azure.com:8000/auth/signup/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result?.status) {
          navigation.navigate("VerifyOtpScreen", {
            email: email.toLowerCase(),
          });
        } else {
          if (result?.message?.includes("email already exists")) {
            Alert.alert("Account exists!!", result.message, [
              { text: "Cancel", onPress: () => console.log("OK Pressed") },
              {
                text: "Go to Login",
                onPress: () =>
                  navigation.navigate("LoginScreen", {
                    email: email.toLowerCase(),
                  }),
              },
            ]);
          }
        }

        console.log(result);
      })
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(false));
  }

  //sighup end

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
            validationSchema={loginValidationSchema}
            initialValues={{
              email: "",
              password: "",
              passwordConfirmation: "",
            }}
            onSubmit={(values) => {
              console.log(values);
              signUp(values.email, values.password);
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
                    Register with Email id
                  </Text>
                  <Text className="py-3 text-gray-600">Email ID</Text>
                  <TextInput
                    // label="email"
                    mode="outlined"
                    className="bg-gray-200 rounded  "
                    name="email"
                    placeholder="Enter your email Address"
                    //   style={styles.textInput}
                    outlineColor={
                      touched.email && errors.email ? "red" : "rgb(243,244,246)"
                    }
                    activeOutlineColor={
                      touched.email && errors.email ? "red" : "purple"
                    }
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  {touched.email && errors.email && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.email}
                    </Text>
                  )}
                  <Text className="py-3 text-gray-600">Password</Text>
                  <TextInput
                    name="password"
                    mode="outlined"
                    className=" bg-gray-200 rounded "
                    placeholder="Password"
                    //   style={styles.textInput}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    outlineColor={
                      touched.password && errors.password
                        ? "red"
                        : "rgb(243,244,246)"
                    }
                    activeOutlineColor={
                      touched.password && errors.password ? "red" : "purple"
                    }
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
                  <Text className="py-3 text-gray-600">
                    Password Confirmation
                  </Text>
                  <TextInput
                    mode="outlined"
                    name="passwordConfirmation"
                    className=" bg-gray-200 rounded "
                    placeholder="Password"
                    //   style={styles.textInput}
                    onChangeText={handleChange("passwordConfirmation")}
                    onBlur={handleBlur("passwordConfirmation")}
                    outlineColor={
                      touched.passwordConfirmation &&
                      errors.passwordConfirmation
                        ? "red"
                        : "rgb(243,244,246)"
                    }
                    activeOutlineColor={
                      touched.passwordConfirmation &&
                      errors.passwordConfirmation
                        ? "red"
                        : "purple"
                    }
                    value={values.passwordConfirmation}
                    secureTextEntry={passwordConfirmationVisible}
                    right={
                      <TextInput.Icon
                        icon={passwordConfirmationVisible ? "eye" : "eye-off"}
                        onPress={() =>
                          setPasswordConfirmationVisible(
                            !passwordConfirmationVisible
                          )
                        }
                      />
                    }
                  />
                  {touched.passwordConfirmation &&
                    errors.passwordConfirmation && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.passwordConfirmation}
                      </Text>
                    )}
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("LoginScreen");
                    }}
                  >
                    <Text className="py-5">
                      Already Have a Account?{" "}
                      <Text className="font-extrabold">Log in</Text>
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
                  <Text className="text-white font-bold">Get OTP</Text>
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
    </SafeAreaView>
  );
};

export default SignupScreen;
