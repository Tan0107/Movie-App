// src/pages/Register.jsx
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import API from '../api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Register
      await API.post('/users/register', { email, password });

      // 2. Immediately login
      const loginRes = await API.post('/users/login', { email, password });
      const token = loginRes.data.access;

      // 3. Persist and fetch profile
      localStorage.setItem('token', token);
      const profileRes = await API.get('/users/details');
      login(profileRes.data.user, token);

      // 4. Redirect
      navigate('/movies');
    } catch (err) {
      console.error('Registration/login failed:', err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          'Registration failed'
      );
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 8 chars)"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
