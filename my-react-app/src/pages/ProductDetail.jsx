import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.product._id === product._id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <img
        src={`http://localhost:3000${product.images}`}
        alt={product.productName}
        className="w-full max-h-[400px] object-contain mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{product.productName}</h2>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-xl text-red-600 font-semibold mb-4">
        {product.price.toLocaleString()} đ
      </p>
      <div className="flex items-center gap-4 mb-4">
        <label>Số lượng:</label>
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="border p-2 w-20"
        />
      </div>
      <button
        onClick={addToCart}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Thêm vào giỏ hàng
      </button>
    </div>
  );
};

export default ProductDetail;
