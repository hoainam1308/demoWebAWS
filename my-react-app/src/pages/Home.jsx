import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(res => setProducts(res.data.data))
      .catch(err => console.error('Failed to load products:', err));
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Danh sách sản phẩm</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product._id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
            <img
              src={`http://localhost:3000${product.images}`}
              alt={product.productName}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2">{product.productName}</h2>
            <p className="text-gray-700 font-medium">{product.price.toLocaleString()}₫</p>
            <Link
              to={`/product/${product._id}`}
              className="mt-3 inline-block text-blue-600 hover:underline"
            >
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
