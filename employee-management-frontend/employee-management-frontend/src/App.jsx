import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from './routes';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import './App.css'; // Optional styling

const AppLayout = () => {
  const element = useRoutes(routes);
  const token = localStorage.getItem('token');

  return (
    <div className="app-container">
      {token && <Navbar />}
      <div className="main-content">
        {token && <Sidebar />}
        <div className="page-content">{element}</div>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
