import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import axios from 'axios';
import PaymentForm from "./components/PaymentForm";
import OrderList from './components/OrderList';

const App = () => {
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true); // để tránh nháy form login

  // // Khi load trang, kiểm tra user hiện tại từ cookie
  // useEffect(() => {
  //   const checkUser = async () => {
  //     try {
  //       const res = await axios.get('http://localhost:3000/users/me', {
  //         withCredentials: true // để gửi cookie JWT
  //       });
  //       setUser(res.data.user); // ✅ nếu xác thực thành công
  //     } catch (err) {
  //       console.log('Chưa đăng nhập hoặc lỗi xác thực');
  //     } finally {
  //       setLoading(false); // xong rồi, dù thành công hay thất bại
  //     }
  //   };
  //   checkUser();
  // }, []);

  // if (loading) return <p>Đang tải...</p>;

  return (
    // <div style={{ padding: '20px' }}>
    //   <h1>🏠 Trang chính</h1>
    //   {!user ? (
    //     <LoginForm onLogin={setUser} />
    //   ) : (
    //     <UserInfo user={user} />
    //   )}
    // </div>
    <div className="App">
      <OrderList />
    </div>
  );
};

export default App;
