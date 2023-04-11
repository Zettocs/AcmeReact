import { useState, useEffect } from 'react';

function ShoeCommande(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.reference}</td>
      <td>{props.stock}</td>
      <td>{props.prix}€</td>
      <td><input type="number" min="0" defaultValue="0" id={`quantite-${props.index}`} /></td>
    </tr>
  );
}

function Commande() {
  const [produits, setShoeData] = useState([]);

  useEffect(() => {
    fetch('http://146.59.196.129/AcmeSymfonyAPI/public/index.php/api/produits')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setShoeData(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const shoeCommandeComponents = produits.map((produit, index) => (
    <ShoeCommande
      key={produit.IdProduit_}
      name={produit.Nom}
      prix={produit.Prix}
      reference={produit.Reference}
      stock={produit.Stock}
      index={index}
    />
  ));

  function handleClick() {
    produits.forEach((produit, index) => {
      const quantite = parseInt(document.getElementById(`quantite-${index}`).value);
      const idProduit = parseInt(produit.IdProduit_);
      const formData = new FormData();
      formData.append('idProduit', idProduit);
      formData.append('quantite', quantite);
      fetch('http://146.59.196.129/AcmeSymfonyAPI/public/index.php/api/modifier-stock', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Data received:', data);
        })
        .catch((error) => console.error('Error sending data:', error));
    });
  }

  return (
    <div>
      <h1 className="title">Commande</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Référence</th>
            <th>Stock</th>
            <th>Prix</th> 
            <th>Quantité à commander</th>
          </tr>
        </thead>
        <tbody>
          {shoeCommandeComponents}
        </tbody>
      </table>
      <button onClick={handleClick}>Commander</button>
    </div>
  );
}

export default Commande;
