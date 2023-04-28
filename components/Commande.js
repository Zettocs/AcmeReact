import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function Commande() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    fetch("http://146.59.196.129/AcmeSymfonyAPI/public/index.php/api/produits")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProduits(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  function handleQuantiteChange(index, value) {
    const newProduits = [...produits];
    newProduits[index].quantite = value;
    setProduits(newProduits);
  }

  function handleClick() {
    produits.forEach((produit, index) => {
      const quantite = parseInt(produit.quantite);
      const idProduit = parseInt(produit.IdProduit_);
      const formData = new FormData();
      formData.append("idProduit", idProduit);
      formData.append("quantite", quantite);
      fetch(
        "http://146.59.196.129/AcmeSymfonyAPI/public/index.php/api/modifier-stock",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Data received:", data);
        })
        .catch((error) => console.error("Error sending data:", error));
    });
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.header]}>Nom</Text>
            <Text style={[styles.cell, styles.header]} numberOfLines={1}>
              Reference
            </Text>
            <Text style={[styles.cell, styles.header]}>Stock</Text>
            <Text style={[styles.cell, styles.header]}>Prix</Text>
            <Text style={[styles.cell, styles.header]} numberOfLines={2}>
              Quantite a commander
            </Text>
          </View>
          {produits.map((produit, index) => (
            <View style={styles.row} key={index}>
              <Text style={styles.cell}>{produit.Nom}</Text>
              <Text style={styles.cell}>{produit.Reference}</Text>
              <Text style={styles.cell}>{produit.Stock}</Text>
              <Text style={styles.cell}>{produit.Prix}€</Text>
              <TextInput
                style={styles.cellInput}
                keyboardType="numeric"
                defaultValue="0"
                onChangeText={(text) =>
                  handleQuantiteChange(index, parseInt(text))
                }
              />
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Text style={styles.buttonText}>Commander</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
    backgroundColor: "#92bddb",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    backgroundColor: "white",
    textAlign: "center",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  header: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
    fontSize: 11,
    textAlign: "center",
  },
  cellInput: {
    backgroundColor: "white",
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#27476e",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
