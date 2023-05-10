import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShoppingList from "./components/ShoppingList";
import Commande from "./components/Commande";
import ProfilScreen from "./components/ProfilScreen";
import { StatusBar } from "react-native";
import Accueil from "./components/Accueil";
import Connexion from "./components/Connexion";
import Icon from "react-native-vector-icons/FontAwesome";
import HistoriqueCommande from "./components/HistoriqueCommande";

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAccueil, setShowAccueil] = useState(true);

  const userRoles = ['["ROLE_ADMIN"], ["ROLE_USER"]'];

  const shouldDisplayCommandeTab = userRoles.includes('["ROLE_ADMIN"]');

  useEffect(() => {
    setTimeout(() => {
      setShowAccueil(false);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      {showAccueil ? (
        <Accueil />
      ) : (
        <View style={{ flex: 1 }}>
          {isLoggedIn ? (
            <View style={{ flex: 1 }}>
              <View
                style={{
                  height: 50,
                  backgroundColor: "#007bff",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></View>
              <Tab.Navigator>
                <Tab.Screen
                  name="Stock"
                  component={ShoppingList}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <Icon name="list" color={color} size={size} />
                    ),
                  }}
                />
                {shouldDisplayCommandeTab && (
                <Tab.Screen
                  name="Commande"
                  component={Commande}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <Icon name="shopping-cart" color={color} size={size} />
                    ),
                  }}
                />
                )}
                <Tab.Screen
                  name="Profil"
                  component={ProfilScreen}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <Icon name="user" color={color} size={size} />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Commandes"
                  component={HistoriqueCommande}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <Icon name="user" color={color} size={size} />
                    ),
                  }}
                />
              </Tab.Navigator>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <View style={styles.fondu}></View>
              <Connexion setIsLoggedIn={setIsLoggedIn} />
            </View>
          )}
        </View>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  fondu: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0,9)", // Augmenter la valeur d'opacité pour un fondu plus prononcé
  },
});
