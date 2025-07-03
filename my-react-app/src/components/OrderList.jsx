import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:3000';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_BASE}/orders`, {
          withCredentials: true,
        });
        setOrders(res.data.data); // giả sử backend trả về { orders: [...] }
      } catch (err) {
        console.error("Lỗi khi lấy đơn hàng:", err);
      }
    };

    fetchOrders();
  }, []);

  const handlePayment = async (orderId, amount) => {
    try {
      const res = await axios.post(`${API_BASE}/vnpay/create_payment_url`, {
        orderId,
        amount,
      }, {
        withCredentials: true,
      });
      window.location.href = res.data.data; // redirect đến VNPay
    } catch (err) {
      console.error("Lỗi khi tạo link thanh toán:", err);
      alert('Không thể tạo thanh toán');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📦 Danh sách đơn hàng</h2>
      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào.</p>
      ) : (
        <table border="1" cellPadding={10}>
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Giá trị</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.totalPrice.toLocaleString()} VND</td>
                <td>{order.status}</td>
                <td>
                  {order.status === 'pending' ? (
                    <button onClick={() => handlePayment(order._id, order.totalPrice)}>
                      Thanh toán
                    </button>
                  ) : (
                    <span>✅</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;
