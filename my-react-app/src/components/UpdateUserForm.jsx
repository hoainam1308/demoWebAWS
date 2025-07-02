import React, { useState } from 'react';
import axios from 'axios';

const UpdateUserForm = ({ user }) => {
  const [username, setUsername] = useState(user.username || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3000/api/users/${user._id}`, {
        username,
        email,
        password: password || undefined,
      }, { withCredentials: true });

      alert('User updated!');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Update User</h2>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="New Password (optional)" />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateUserForm;
