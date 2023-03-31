const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dbConfig = require('./db-config.js');

const app = express();

app.use(cors({ origin: '*' }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
      return res.status(200).json({});
    }
    next();
  });

const connection = mysql.createConnection(dbConfig);

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
    return;
  }
  console.log('Connected to MySQL database!');
});

app.get('/produit', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  const sql = 'SELECT * FROM produit';
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).send('Error querying database');
      return;
    }
    res.json(results);
  });
});

app.listen(80, () => {
  console.log('Server listening on port 80');
});