import { useState, useEffect } from 'react';
import '../css/ShoppingList.css';

function Shoe(props) {
  return (
    <div className="produit-wrapper">
      <div className="test">
        <img className="chaussures">{props.Photo}</img>
      </div>
      <h2 className="nom">{props.name}</h2>
      <p className="reference">Référence : {props.reference}</p>
      <p className="prix">{props.prix}€</p>
      <button className="afficher-article"></button>
    </div>
  );
}

function ShoppingList() {
  const [produits, setShoeData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/produits')
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

  const shoeComponents = produits.map((produits) => (
    <Shoe
      key={produits.IdProduit_}
      id={produits.IdProduit_}
      name={produits.Nom}
      prix={produits.Prix}
      reference={produits.Reference}
      photo={produits.Photo}
    />
  ));

  return <div className="shoes-list">{shoeComponents}</div>;
}

export default ShoppingList;
