import React, { useState } from 'react';
import axios from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import WebcamCapture from './WebcamCapture';
import './auth.css';

const LoginPage = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/auth/login', {
        employeeId,
        password
      });

      const { token, role } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'employee') {
        navigate('/employee/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error-text">{error}</p>}

        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Optional: webcam feature for security/attendance */}
        <WebcamCapture />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
