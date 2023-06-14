import React from "react";
import {
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  Text,
} from "react-native";
import Animated from "react-native-reanimated";

export default (props) => (
  <Animated.View className="bg-white pt-4">
    <SafeAreaView style={styles.AndroidSafeArea} {...props}>
      {props.children}
    </SafeAreaView>
  </Animated.View>
);

const styles = StyleSheet.create({
  AndroidSafeArea: {
    // paddingTop: 20,
  },
});
