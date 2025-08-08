import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/admin/users').then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Emp. ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.employeeId}</td>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
