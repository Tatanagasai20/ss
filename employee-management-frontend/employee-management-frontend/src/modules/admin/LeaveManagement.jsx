import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';

const LeaveManagement = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('/admin/leaves').then((res) => {
      setRequests(res.data);
    });
  }, []);

  const handleDecision = (id, status) => {
    axios.patch(`/admin/leaves/${id}`, { status }).then(() => {
      setRequests((prev) => prev.filter((r) => r.id !== id));
    });
  };

  return (
    <div>
      <h2>Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Dates</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.employeeName}</td>
              <td>{req.startDate} to {req.endDate}</td>
              <td>{req.reason}</td>
              <td>
                <button onClick={() => handleDecision(req.id, 'approved')}>Approve</button>
                <button onClick={() => handleDecision(req.id, 'rejected')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveManagement;
