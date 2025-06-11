// pages/Signup.js

import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/signup', form);
      alert('Signup successful!');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error signing up');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
