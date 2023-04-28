import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

const ProfilScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>Benito</Text>
        <Text style={styles.infoText}>Valentin.contre@epsi.lille</Text>
      </View>
      <View style={styles.profileImageContainer}>
        <Image
          style={styles.profileImage}
          resizeMode="contain"
          source={require("../assets/Images/smileval.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#92bddb",
  },

  profileImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    height: 400,
  },
  infoContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 500,
    height: 300,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
  },
});

export default ProfilScreen;
