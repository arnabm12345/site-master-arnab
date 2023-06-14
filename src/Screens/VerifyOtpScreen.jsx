import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Button,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import OTPTextInput from "react-native-otp-textinput";
import CustomSafeAreaView from "../utils/CustomSafeAreaView";
import * as SecureStore from "expo-secure-store";

const VerifyOtpScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [Loading, setLoading] = useState(false);
  const [Otp, setOtp] = useState("");
  const [Countdown, setCountdown] = useState(60);

  useEffect(() => {
    setInterval(() => {
      // if (Countdown > -230) {
      setCountdown((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        return prev;
      });
      // }
    }, 1000);
  }, []);
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  function verifyOtp() {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    var raw = JSON.stringify({
      email: email.toLowerCase(),
      otp: Otp,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "http://sitemasterdevelopment.centralindia.cloudapp.azure.com:8000/auth/verify/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // navigation.navigate("AddDetails");
        let res = JSON.parse(JSON.stringify(result));

        console.log(res.status);
        if (res?.status && res?.data?.access) {
          save("access", res.data?.access);
          save("refresh", res.data?.refresh);
          navigation.navigate("AddDetails");
        } else {
          Alert.alert("Error", result.message, [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(false));
  }
  function resendOtp() {
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

    fetch(
      "http://sitemasterdevelopment.centralindia.cloudapp.azure.com:8000/auth/resendotp/",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  return (
    <CustomSafeAreaView>
      <KeyboardAvoidingView>
        <View className=" h-full  pb-5 px-10 justify-between">
          <View>
            <Text className="text-2xl font-semibold pb-5">Enter OTP</Text>
            <Text className="text-gray-500">
              Enter the 4 digit otp to phone/email
            </Text>
            <View className="flex-row py-4 my-2 bg-gray-200 px-4 rounded-lg">
              <View className="grow">
                <Text className="text-gray-600 text-xs">
                  Verification code sent to
                </Text>
                <Text className=" lowercase text-base font-semibold">
                  {email}
                </Text>
              </View>
              <View className="">{/* <Text>Edit</Text> */}</View>
            </View>
            <View className="py-2 ">
              <View className="pb-4">
                <OTPTextInput
                  textInputStyle={{
                    borderWidth: 2,
                    borderRadius: 5,
                  }}
                  tintColor="purple"
                  ref={(e) => (otpInput = e)}
                  handleTextChange={(text) => setOtp(text)}
                />
              </View>

              <Text>Did not recieve OTP?</Text>
              <TouchableOpacity
                onPress={() => {
                  if (Countdown === 0) {
                    resendOtp();
                    setCountdown(60);
                  }
                }}
              >
                {Countdown > 0 ? (
                  <Text className="text-gray-900 pt-1">
                    Resend OTP in{" "}
                    <Text className="font-semibold">{Countdown}s</Text>
                  </Text>
                ) : (
                  <Text className="text-purple-900 pt-1">Resend</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setLoading();

              verifyOtp();
            }}
            className="bg-purple-800 items-center py-3 px-8 rounded-lg w-full"
          >
            <Text className="text-white text-lg font-semibold">Verify</Text>
          </TouchableOpacity>
        </View>
        {Loading ? (
          <View className="absolute w-full h-full items-center justify-center z-10">
            <ActivityIndicator color={"purple"} size={"large"} />
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
};

export default VerifyOtpScreen;
