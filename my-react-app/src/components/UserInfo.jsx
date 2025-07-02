import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:3000/users/me', {
        withCredentials: true // Gửi cookie JWT nếu bạn dùng cookie
        // Nếu dùng Bearer token thì thêm headers ở đây
        // headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
      setError('Không thể tải thông tin người dùng.');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Đang tải...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>👤 Thông tin người dùng</h2>
      <ul>
        <li><strong>Username:</strong> {user.username}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Vai trò:</strong> {user.role?.roleName || user.role}</li>
        <li><strong>ID:</strong> {user._id}</li>
      </ul>
    </div>
  );
};

export default UserInfo;
