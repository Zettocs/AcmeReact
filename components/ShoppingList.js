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

function Shoe(props) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [quantity, setQuantity] = useState("");
  const imageUrl = props.photo;

  return (
    <View style={styles.produitWrapper}>
      <View style={styles.test}>
        <Image source={{ uri: imageUrl }} style={styles.chaussures} />
      </View>
      <Text style={styles.nom}>{props.name}</Text>
      <Text style={styles.reference}>Référence : {props.reference}</Text>
      <Text style={styles.prix}>{props.prix}€</Text>
      <Text style={styles.stock}>{props.stock} en stock</Text>
      <Text style={styles.alerte}>
        {props.stock < 25 && (
          <Text style={{ color: "red" }}>Attention feur soon!</Text>
        )}
      </Text>
      <View style={styles.addFormWrapper}>
        <TextInput
          keyboardType="numeric"
          placeholder="Quantité"
          onChangeText={(text) => setQuantity(text)}
          value={quantity}
          style={styles.quantityInput}
        />
      </View>
    </View>
  );
}

function ShoppingList() {
  const [produits, setShoeData] = useState([]);

  useEffect(() => {
    fetch("http://146.59.196.129/AcmeSymfonyAPI/public/index.php/api/produits")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setShoeData(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  function handleClick() {
    produits.forEach((produit, index) => {
      const quantite = parseInt(produit.quantity);
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

  function handleQuantiteChange(index, value) {
    const newProduits = [...produits];
    newProduits[index].quantite = value;
    setShoeData(newProduits);
  }

  const shoeComponents = produits.map((produit, index) => (
    <Shoe
      key={produit.IdProduit_}
      id={produit.IdProduit_}
      name={produit.Nom}
      prix={produit.Prix}
      reference={produit.Reference}
      photo={
        "http://146.59.196.129/AcmeSymfonyAPI/public/images/produits/" +
        produit.Photo
      }
      stock={produit.Stock}
      quantite={produit.Quantite}
      onQuantiteChange={(value) => handleQuantiteChange(index, value)}
    />
  ));

  return (
    <ScrollView>
      <View style={styles.shoesList}>{shoeComponents}</View>
      <TouchableOpacity onPress={handleClick} style={styles.commanderButton}>
        <Text style={styles.commanderText}>Commander</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  produitWrapper: {
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  test: {
    alignItems: "center",
  },
  chaussures: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  nom: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  reference: {
    marginTop: 5,
  },
  prix: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  stock: {
    marginTop: 5,
  },
  alerte: {
    marginTop: 5,
  },
  afficherArticle: {
    marginTop: 10,
    backgroundColor: "lightblue",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
  },
  shoesList: {
    flex: 1,
    padding: 10,
  },
});

ShoppingList.navigationOptions = {
  title: "Stock",
  headerStyle: {
    backgroundColor: "#000000", // Couleur du fond de l'en-tête
  },
  headerTintColor: "#FFFFFF", // Couleur du texte de l'en-tête
  tabBarIcon: ({ color, size }) => (
    <Icon name="list" color={color} size={size} />
  ),
};

export default ShoppingList;
