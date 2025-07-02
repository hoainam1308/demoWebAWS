// src/components/PaymentForm.js
import React, { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
  const [amount, setAmount] = useState(10000);
  const [bankCode, setBankCode] = useState("");
  const [language, setLanguage] = useState("vn");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/vnpay/create_payment_url",
        {
          amount,
          bankCode,
          language,
        },
        {
          withCredentials: false,
        }
      );

      // Nếu backend trả về 302 redirect, axios không xử lý, nên ta cần redirect thủ công
        if (res.data?.code === "00" && res.data.data) {
            window.location.href = res.data.data;
        }
        else {
            console.error("VNPay trả về lỗi:", res.data);
        }
    } catch (err) {
      console.error("Lỗi tạo thanh toán:", err);
    }
  };

  return (
    <div>
      <h2>Demo Thanh Toán VNPay</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Số tiền: </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Ngân hàng: </label>
          <input
            type="text"
            placeholder="VCB, NCB, ..."
            value={bankCode}
            onChange={(e) => setBankCode(e.target.value)}
          />
        </div>
        <div>
          <label>Ngôn ngữ: </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="vn">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </div>
        <button type="submit">Thanh Toán</button>
      </form>
    </div>
  );
};

export default PaymentForm;
