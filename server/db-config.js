const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '146.59.196.129', // L'adresse IP de votre serveur MySQL
  user: 'accme', // Le nom d'utilisateur pour la connexion à la base de données
  password: '(14SCOval$', // Le mot de passe pour la connexion à la base de données
  database: 'acme', // Le nom de la base de données à laquelle vous souhaitez vous connecter
  port: '3306'
});

module.exports = connection;