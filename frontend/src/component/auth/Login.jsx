import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', loginData, {
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      console.log('Login successful:', response.data);

    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      console.error('Error logging in:', err.response?.data);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>

  );
};

export default Login;
