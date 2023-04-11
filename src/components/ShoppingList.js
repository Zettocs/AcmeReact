import { useState, useEffect } from 'react';
import '../css/ShoppingList.css';

function Shoe(props) {
  const imageUrl = process.env.PUBLIC_URL + "/Images/" + props.photo;
  return (
    <div className="produit-wrapper">
      <div className="test">
      <img src={imageUrl} alt="" className="chaussures" />
      </div>
      <h2 className="nom">{props.name}</h2>
      <p className="reference">Référence : {props.reference}</p>
      <p className="prix">{props.prix}€</p>
      <p className="stock">{props.stock} en stock</p>
      <p className='alerte'>{props.stock < 25 && <span style={{color: "red"}}>Attention rupture soon!</span>}</p>
      <button className="afficher-article">Feur</button>
    </div>
  );
}

function ShoppingList() {
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

  const shoeComponents = produits.map((produits) => (
    <Shoe
      key={produits.IdProduit_}
      id={produits.IdProduit_}
      name={produits.Nom}
      prix={produits.Prix}
      reference={produits.Reference}
      photo={produits.Photo}
      stock={produits.Stock}
    />
  ));

  return <div className="shoes-list">{shoeComponents}</div>;
}

export default ShoppingList;
