import { createContext, useState } from "react";
import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
  products: [1, 2, 3],
  test: 'test'
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products, test: '123' };
  console.log('value', value);

  return (
    <div key={2}>
      {children}
    </div>
  )
}