// pages/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/protected', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        alert('Unauthorized. Please login again.');
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>Loading or unauthorized...</p>;

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <p>Your email: {user.email}</p>
    </div>
  );
};

export default Dashboard;
