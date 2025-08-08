import React from 'react';
import { NavLink } from 'react-router-dom';
// import './sidebar.css';

const Sidebar = () => {
  const role = localStorage.getItem('role');

  return (
    <aside className="sidebar">
      <ul>
        {role === 'admin' && (
          <>
            <li><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/admin/users">User Management</NavLink></li>
            <li><NavLink to="/admin/attendance">Attendance</NavLink></li>
            <li><NavLink to="/admin/leaves">Leave Management</NavLink></li>
            <li><NavLink to="/admin/reports">Reports</NavLink></li>
          </>
        )}

        {role === 'employee' && (
          <>
            <li><NavLink to="/employee/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/employee/attendance">Attendance</NavLink></li>
            <li><NavLink to="/employee/leave-request">Request Leave</NavLink></li>
            <li><NavLink to="/employee/my-leaves">My Leaves</NavLink></li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
