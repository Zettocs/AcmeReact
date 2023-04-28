import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";


export default function HistoriqueCommande() {
    const [commandesAvecUtilisateurs, setCommandeData] = useState([]);

    useEffect(() => {
        fetch('http://146.59.196.129/AcmeSymfonyAPI/public/index.php/api/historique_commande')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
        .then(data => {
            const commandesAvecUtilisateurs = [];
            data.forEach(commande => {
            fetch("http://146.59.196.129/AcmeSymfonyAPI/public/index.php/api/utilisateur/${commandesAvecUtilisateurs.utilisateur_id}")
            
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
            })

        .then(utilisateur => {
            const commandeAvecUtilisateur = {
                id: commande.id,
                date_commande: commande.date_commande.date,
                nom_utilisateur: utilisateur.nom,
                email_utilisateur: utilisateur.email,
                prix_total: commande.prix_total,
            };
        commandesAvecUtilisateurs.push(commandeAvecUtilisateur);
        setCommandeData(commandesAvecUtilisateurs);
        })
            .catch(error => console.error('Error fetching utilisateur:', error));
            });
            })
            .catch(error => console.error('Error fetching commandes:', error));
            }, []);
      

      return (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={[styles.cell, styles.header]}>Nom</Text>

                <Text style={[styles.cell, styles.header]}>Stock</Text>
                <Text style={[styles.cell, styles.header]}>Prix</Text>
                <Text style={[styles.cell, styles.header]} numberOfLines={2}>
                  Quantite a commander
                </Text>
              </View>
              {commandesAvecUtilisateurs.map((commande, index) => (
                <View style={styles.row} key={index}>
                  <Text style={styles.cell}>{commande.id}</Text>
                  <Text style={styles.cell}>{commande.date_commande}</Text>
                  <Text style={styles.cell}>{commande.nom_utilisateur}</Text>
                  <Text style={styles.cell}>{commande.email_utilisateur}€</Text>
                  <Text style={styles.cell}>{commande.prix_total}€</Text>
                </View>
              ))}
            </View>
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
