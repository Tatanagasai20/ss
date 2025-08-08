import React from 'react';
import { Navigate } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedRoute from './components/RoleBasedRoute';

import LoginPage from './modules/auth/LoginPage';

// Admin
import AdminDashboard from './modules/admin/AdminDashboard';
import AttendanceManagement from './modules/admin/AttendanceManagement';
import LeaveManagement from './modules/admin/LeaveManagement';
import UserManagement from './modules/admin/UserManagement';
import Reports from './modules/admin/Reports';

// Employee
import EmployeeDashboard from './modules/employee/EmployeeDashboard';
import AttendancePage from './modules/employee/AttendancePage';
import LeaveRequestPage from './modules/employee/LeaveRequestPage';
import MyLeaves from './modules/employee/MyLeaves';

const routes = [
  { path: '/', element: <LoginPage /> },

  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute role="admin">
          <AdminDashboard />
        </RoleBasedRoute>
      </ProtectedRoute>
    )
  },
  {
    path: '/admin/attendance',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute role="admin">
          <AttendanceManagement />
        </RoleBasedRoute>
      </ProtectedRoute>
    )
  },
  {
    path: '/admin/leaves',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute role="admin">
          <LeaveManagement />
        </RoleBasedRoute>
      </ProtectedRoute>
    )
  },
  {
    path: '/admin/users',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute role="admin">
          <UserManagement />
        </RoleBasedRoute>
      </ProtectedRoute>
    )
  },
  {
    path: '/admin/reports',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute role="admin">
          <Reports />
        </RoleBasedRoute>
      </ProtectedRoute>
    )
  },

  {
    path: '/employee/dashboard',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute role="employee">
          <EmployeeDashboard />
        </RoleBasedRoute>
      </ProtectedRoute>
    )
  },
  {
    path: '/employee/attendance',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute role="employee">
          <AttendancePage />
        </RoleBasedRoute>
      </ProtectedRoute>
    )
  },
  {
    path: '/employee/leave-request',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute role="employee">
          <LeaveRequestPage />
        </RoleBasedRoute>
      </ProtectedRoute>
    )
  },
  {
    path: '/employee/my-leaves',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute role="employee">
          <MyLeaves />
        </RoleBasedRoute>
      </ProtectedRoute>
    )
  },

  { path: '*', element: <Navigate to="/" replace /> }
];

export default routes;
