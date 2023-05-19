import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function HomeScreen() {

  const Accueil = ({ navigation }) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
      const getUserData = async () => {
        try {
          const value = await AsyncStorage.getItem("user");
          setUser(JSON.parse(value));
        } catch (error) {
          console.log("Erreur lors de la récupération des données utilisateur :", error);
        }
      };
      getUserData();
    }, []);
  
    const handleLogout = async () => {
      try {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        setIsLoggedIn(false);
      } catch (error) {
        console.log("Erreur lors de la déconnexion :", error);
      }
    };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Bienvenue sur l'application Acme !</Text>
    {user && <Text style={styles.user}>Connecté en tant que {user.email}</Text>}
    <Button title="Se déconnecter" onPress={handleLogout} />
    <Tab.Navigator>
      <Tab.Screen
        name="Commande"
        component={Commande}
        options={{
          tabBarVisible: shouldDisplayCommandeTab,
        }}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
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

}
