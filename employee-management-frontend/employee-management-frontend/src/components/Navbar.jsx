import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h2>Employee Management</h2>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
