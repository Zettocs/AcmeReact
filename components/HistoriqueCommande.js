import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";



export default function HistoriqueCommande() {
  const [commandesAvecUtilisateurs, setCommandeData] = useState([]);
  const [selectedCommande, setSelectedCommande] = useState(null);
  const [selectedCommandeLignes, setSelectedCommandeLignes] = useState([]);



  const sendCommandeIdToSymfony = async (commandeId) => {
    try {
      const response = await fetch(
        `http://146.59.196.129/AcmeSymfonyAPI/public/index.php/api/ligne_commande/${commandeId}`
      );
      const data = await response.json();

      setCommandeData((prevCommandes) =>
        prevCommandes.map((commande) =>
          commande.id === commandeId
            ? { ...commande, selected: true, lignes: data.lignes_commande }
            : { ...commande, selected: false }
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch(
      "http://146.59.196.129/AcmeSymfonyAPI/public/index.php/api/historique_commande"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const commandesAvecUtilisateurs = [];
        const promises = [];
        data.forEach((commande) => {
          const promise = fetch(
            `http://146.59.196.129/AcmeSymfonyAPI/public/index.php/api/utilisateur/${commande.utilisateur_id}`
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })

            .then((utilisateur) => {
              const commandeAvecUtilisateur = {
                id: commande.id,
                date_commande: commande.date_commande.date,
                nom_utilisateur: utilisateur.nom,
                email_utilisateur: utilisateur.email,
                prix_total: commande.prix_total,
                etat_commande: commande.etat_commande,
              };
              commandesAvecUtilisateurs.push(commandeAvecUtilisateur);
            })
            .catch((error) =>
              console.error("Error fetching utilisateur:", error)
            );
          promises.push(promise);
        });
        Promise.all(promises).then(() => {
          setCommandeData(commandesAvecUtilisateurs);
        });
      })
      .catch((error) => console.error("Error fetching commandes:", error));
  }, []);

  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Rapport d'historique des commandes</h1>
          <table>
            <tr>
              <th>Id Commande</th>
              <th>Date</th>
              <th>Client</th>
              <th>Adresse mail</th>
              <th>Prix total</th>
              <th>État commande</th>
            </tr>
            ${commandesAvecUtilisateurs
              .map(
                (commande) => `
              <tr>
                <td>${commande.id}</td>
                <td>${commande.date_commande}</td>
                <td>${commande.nom_utilisateur}</td>
                <td>${commande.email_utilisateur}</td>
                <td>${commande.prix_total}€</td>
                <td>${commande.etat_commande}</td>
              </tr>
            `
              )
              .join("")}
          </table>
        </body>
      </html>
    `;


    const options = {
      html: htmlContent,
      fileName: 'rapport_historique_commandes',
      directory: 'Documents',
    };
  
    try {
      const pdf = await RNHTMLtoPDF.generate(options);
      console.log('Rapport généré : ', pdf.filePath);
    } catch (error) {
      console.error('Erreur lors de la génération du rapport : ', error);
    }
  };


 


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.header]}>Id Commande</Text>
            <Text style={[styles.cell, styles.header]}>Date</Text>
            <Text style={[styles.cell, styles.header]}>Client</Text>
            <Text style={[styles.cell, styles.header]}>Adresse mail</Text>
            <Text style={[styles.cell, styles.header]} numberOfLines={2}>
              Prix total
            </Text>
          </View>
          {commandesAvecUtilisateurs.map((commande, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() => sendCommandeIdToSymfony(commande.id)}
              >
                <View style={styles.row}>
                  <Text style={styles.cell}>{commande.id}</Text>
                  <Text style={styles.cell}>{commande.date_commande}</Text>
                  <Text style={styles.cell}>{commande.nom_utilisateur}</Text>
                  <Text style={styles.cell}>{commande.email_utilisateur}</Text>
                  <Text style={styles.cell}>{commande.prix_total}€</Text>
                  <Text style={styles.cell}>{commande.etat_commande}</Text>
                </View>
              </TouchableOpacity>
              {commande.selected && commande.lignes && (
                <View style={styles.detailContainer}>
                  <Text style={styles.centeredText}>
                    Commande ID: {commande.id}
                    Statut commande: {commande.etat_commande}
                  </Text>
                  <View style={styles.row}>
                    <Text style={[styles.cell, styles.header, styles.darkCell]}>
                      Produit
                    </Text>
                    <Text style={[styles.cell, styles.header, styles.darkCell]}>
                      Prix
                    </Text>
                  </View>
                  {commande.lignes.map((ligne, index) => (
                    <View key={index} style={styles.row}>
                      <Text style={styles.cell}>{ligne.produit_id}</Text>
                      <Text style={styles.cell}>{ligne.prix}€</Text>
                    </View>
                  ))}
                  <View style={styles.row}>
                    <Text style={[styles.cell, styles.header, styles.darkCell]}>
                      Prix Total
                    </Text>
                    <Text style={[styles.cell, styles.header, styles.darkCell]}>
                      {commande.prix_total}€
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
        <TouchableOpacity onPress={generatePDF} style={styles.button}>
        <Text style={styles.buttonText}>Générer le rapport PDF</Text>
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
  detailContainer: {
    backgroundColor: "#daebe9",
    padding: 10,
    borderRadius: 5,
  },
  centeredText: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  darkCell: {
    backgroundColor: "#27476e",
    color: "#fff",
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