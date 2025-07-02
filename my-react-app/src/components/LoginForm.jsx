import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google'; // Thêm import GoogleLogin nếu cần

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auths/login', {
        password,
        email,
      }, { withCredentials: true }); // quan trọng nếu dùng cookie

      // const token = res.data.token;
      // localStorage.setItem('token', token);
      
      alert('Login successful');
      onLogin(res.data.data); // Gửi user lên App
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

const handleGoogleLogin = async (credentialResponse) => {
  try {
    const res = await axios.post('http://localhost:3000/auths/google-login', {
      token: credentialResponse.credential,
    }, { withCredentials: true });

    alert('Google login successful');
    onLogin(res.data.data); // Gửi user lên App
  }
  catch (err) {
    console.error(err);
    alert('Google login failed');
  }
}

const handleGoogleFailure = (error) => {
  console.error('Google login failed:', error);
  alert('Google login failed');
};

return (
  <div>
      <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
    <div style={{ marginTop: '20px' }}>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={handleGoogleFailure}
        logo_alignment="left"
        style={{ marginTop: '10px' }}
        buttonText="Login with Google"
      />
    </div>
  </div>
  );
};

export default LoginForm;
