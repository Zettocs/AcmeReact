import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar} />
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/Images/logo.png")}
          style={styles.logo}
        />
        <Image
          source={require("../assets/Images/tracker.png")}
          style={styles.tracker}
        />
        <Image
          source={require("../assets/Images/en-stock.png")}
          style={styles.icon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#27476e",
  },
  topBar: {
    backgroundColor: "#92bddb",
    height: 100,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tracker: {
    height: 50,
    width: 180,
  },
  logo: {
    marginTop: "-60%",
    width: 250,
  },
  icon: {
    top: "20%",
    width: 150,
    height: 150,
  },
});
