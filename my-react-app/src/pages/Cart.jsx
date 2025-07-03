import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VnpayPaymentButton from '../components/VnpayPaymentButton.jsx'; // Import VnpayPaymentButton if needed

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return alert('Vui lòng đăng nhập trước.');

    try {
      const orderPayload = {
        userId,
        items: cartItems.map(item => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        paymentMethod
      };

      const response = await axios.post('http://localhost:3000/orders/create', orderPayload, {
        withCredentials: true
      });

      const order = response.data.data;
      if (paymentMethod === 'vnpay') {
        const payRes = await axios.post('http://localhost:3000/vnpay/create_payment_url', {
          amount: totalAmount,
          orderId: order._id
        });
        window.location.href = payRes.data.url;
      } else {
        alert('Đặt hàng thành công!');
        localStorage.removeItem('cart');
        navigate('/');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Có lỗi xảy ra khi thanh toán.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <p>Không có sản phẩm trong giỏ hàng.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center border p-4">
                <div>
                  <h3 className="font-semibold">{item.productName}</h3>
                  <p>Số lượng: {item.quantity}</p>
                </div>
                <div>{(item.price * item.quantity).toLocaleString()}₫</div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p className="text-lg font-medium">Tổng cộng: {totalAmount.toLocaleString()}₫</p>
          </div>

          <div className="mt-4">
            <label className="mr-4">Phương thức thanh toán:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border px-2 py-1"
            >
              <option value="cod">Thanh toán khi nhận hàng (COD)</option>
              <option value="vnpay">Thanh toán qua VNPAY</option>
            </select>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Thanh toán
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
