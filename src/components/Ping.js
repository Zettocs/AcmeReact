import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Test() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('146.59.196.129/api',
     { timeout: 5000, 
        withCredentials: true })
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error retrieving products:', error);
      });
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - {product.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default Test;