import { shoesList } from "../datas/shoesList"
import '../css/ShoppingList.css'



function Shoe(props) {
  return (
    <div className="produit-wrapper">


				<div className="test">
					<img className="chaussures"></img>
				</div>
				<h2 className="nom">{props.name}</h2>

				<p className="reference">Référence :
					{ props.référence }</p>

				<p className="prix">{ props.prix }€</p>

				<button className="afficher-article">
					
				</button>


			</div>




     
      
    
  );
}

function ShoppingList() {
  const shoeComponents = shoesList.map((shoe) => (
    <Shoe
      key={shoe.id}
      id={shoe.id}
      name={shoe.name}
      price={shoe.prix}
      // Add more properties as needed
    />
  ));

  return <div className="shoes-list">{shoeComponents}</div>;
}

export default ShoppingList
