// pages/Login.js

import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
