import { useEffect, useState } from 'react';
import './App.css';
import { useDebounce } from './hooks/useDebounce';

const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://dummyjson.com/products/search?q=${debouncedSearch || ''}`
      ).then((res) => res.json());
      setProducts(data.products);
    };

    if (debouncedSearch) {
      fetchData();
    }
  }, [debouncedSearch]);

  return (
    <div className='App'>
      <h2>Search for Products!</h2>
      <input
        type='text'
        placeholder='Search...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <br />
      <br />
      {products.map((product) => {
        return (
          <div key={product.id} style={{ border: '1px solid black' }}>
            <p>Title: {product.title}</p>
            <p>Description: {product.description}</p>
            <p>Rating: {product.rating}</p>
            <img
              src={product.thumbnail}
              alt={product.title}
              width={100}
              height={100}
            />
          </div>
        );
      })}
    </div>
  );
};

export default App;
