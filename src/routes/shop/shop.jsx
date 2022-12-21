import { useContext } from 'react';
import { ProductsContext } from '../../contexts/products.context';

const Shop = () => {
  const { products, test } = useContext(ProductsContext);
  console.log('products', products);
  console.log('test', test);

  return (
    <div>
      {products.map(({id, name}) => (
        <div key={id}>
          <h1>{name}</h1>
        </div>
      ))}
    </div>
  );
}

export default Shop;