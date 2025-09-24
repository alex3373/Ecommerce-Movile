import React, { useState } from 'react';
import {
  altFetchWooProducts,
  WooProduct,
  WooCredentials
} from '../../services/apiOfertasimperdibles';

const PruebaMulti: React.FC = () => {
  const [credentials, setCredentials] = useState<WooCredentials>({
    store_url: '',
    consumer_key: '',
    consumer_secret: ''
  });

  const [productos, setProductos] = useState<WooProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const productos = await altFetchWooProducts(credentials, 20);
      setProductos(productos);
    } catch (err: any) {
      setError(err.message);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Conectar a WooCommerce</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>URL de la tienda:</label>
          <input
            type="text"
            name="store_url"
            value={credentials.store_url}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Consumer Key:</label>
          <input
            type="text"
            name="consumer_key"
            value={credentials.consumer_key}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Consumer Secret:</label>
          <input
            type="text"
            name="consumer_secret"
            value={credentials.consumer_secret}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Conectar'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {productos.length > 0 && (
        <div>
          <h3>Productos:</h3>
          <ul>
            {productos.map((prod) => (
              <li key={prod.id}>
                <strong>{prod.name}</strong> - ${prod.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PruebaMulti;
