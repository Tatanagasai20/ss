import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios.get('/employee/leaves').then((res) => {
      setLeaves(res.data);
    });
  }, []);

  return (
    <div>
      <h2>My Leave History</h2>
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, i) => (
            <tr key={i}>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyLeaves;
