import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosInstance';

const AttendancePage = () => {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('/employee/attendance').then((res) => {
      setHistory(res.data);
    });
  }, []);

  const markAttendance = (type) => {
    axios.post('/employee/attendance', { status: type }).then((res) => {
      setMessage(res.data.message);
      setStatus(type);
      setHistory((prev) => [...prev, { date: new Date().toISOString().split('T')[0], status: type }]);
    });
  };

  return (
    <div>
      <h2>Attendance</h2>
      {message && <p>{message}</p>}
      <button onClick={() => markAttendance('present')}>Mark Present</button>
      <button onClick={() => markAttendance('absent')}>Mark Absent</button>

      <h3>History</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, i) => (
            <tr key={i}>
              <td>{entry.date}</td>
              <td>{entry.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancePage;
