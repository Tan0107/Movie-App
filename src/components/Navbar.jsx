// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import '../index.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🎬 MovieApp</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>

        {user ? (
          <>
            <span className="navbar-user">Hi, {user.email}</span>
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user?.isAdmin && <Link to="/admin">Admin</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
