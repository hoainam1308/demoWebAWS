// src/components/AuthTest.jsx
import React, { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:3000"; // Cổng backend của bạn

const AuthTest = ({ user }) => {
  const [loginStatus, setLoginStatus] = useState("");
  const [protectedData, setProtectedData] = useState("");
  const token = localStorage.getItem("token");
  const testAuth = async () => {
    try {
      const res = await axios.get(`${API_BASE}/test`, {
        withCredentials: true
      }); // cần để gửi cookie

      // const res = await axios.get(`${API_BASE}/test`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      
      setLoginStatus("✅ Đăng nhập thành công!");
      console.log("Token:", res.data.token);
    } catch (err) {
      setLoginStatus("❌ Đăng nhập thất bại.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={testAuth}>TEST Auth</button>
    </div>
  );
};

export default AuthTest;
