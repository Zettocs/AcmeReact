import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';

import ShoppingList from "./components/ShoppingList";
import Commande from "./components/Commande";
import ProfilScreen from "./components/ProfilScreen";
import Accueil from "./components/Accueil";
import Connexion from "./components/Connexion";
import HistoriqueCommande from "./components/HistoriqueCommande";

const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAccueil, setShowAccueil] = useState(true);
  const [userRoles, setUserRoles] = useState([]);



  useEffect(() => {
    setTimeout(() => {
      setShowAccueil(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const roles = await AsyncStorage.getItem('userRoles');
        if (roles) {
          setUserRoles(JSON.parse(roles));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des rôles:", error);
      }
    };
  
    fetchUserRoles();
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
                <Tab.Screen
                  name="Commande"
                  component={Commande}
                  options={({ route }) => ({
                    tabBarIcon: ({ color, size }) => (
                      <Icon name="shopping-cart" color={color} size={size} />
                    ),
                    tabBarVisible: userRoles && userRoles.includes("ROLE_ADMIN"), // Affiche l'onglet seulement si l'utilisateur a le rôle "ROLE_ADMIN"
                  })}
                />
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
