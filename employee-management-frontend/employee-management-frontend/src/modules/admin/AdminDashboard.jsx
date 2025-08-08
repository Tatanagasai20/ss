import React from 'react';
import './admin.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Welcome, Admin</h1>
      <div className="dashboard-cards">
        <div className="card">Total Employees: 120</div>
        <div className="card">Today's Attendance: 85</div>
        <div className="card">Pending Leaves: 5</div>
        <div className="card">Monthly Reports</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
