import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your backend API call
    const response = await fakeLogin(form); // Replace this with real API
    login(response);
    navigate(`/${response.role}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
