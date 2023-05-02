import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Connexion = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://146.59.196.129/AcmeSymfonyAPI/public/index.php/api/connexion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      console.log("Réponse de l'API:", response);

      if (response.ok) {
        const data = await response.json();
        console.log("Données renvoyées par l'API:", data);

        // Exemple pour stocker le token JWT
        if (data.token) {
          await AsyncStorage.setItem("jwt_token", data.token);
        }

        // Stockez les données utilisateur dans le AsyncStorage
        const userData = {
          email: data.user.email,
          //firstname: data.user.firstname, // Modifiez cette ligne pour extraire l'email correctement
          // Ajoutez d'autres champs si nécessaire
        };
        await AsyncStorage.setItem("user", JSON.stringify(userData));

        // Déplacez setIsLoggedIn(true) ici, après avoir stocké les données utilisateur
        setIsLoggedIn(true);
      } else {
        // Gérez les erreurs de connexion
        console.error("Erreur lors de la connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>C o n n e x i o n</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

export default Connexion;