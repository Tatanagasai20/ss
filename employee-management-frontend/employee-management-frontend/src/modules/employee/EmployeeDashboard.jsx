import React from 'react';
import './employee.css';

const EmployeeDashboard = () => {
  return (
    <div className="employee-dashboard">
      <h1>Welcome, Employee</h1>
      <div className="dashboard-cards">
        <div className="card">My Attendance</div>
        <div className="card">Request Leave</div>
        <div className="card">My Leave History</div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
