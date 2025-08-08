import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';

const AttendanceManagement = () => {
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    axios.get('/admin/attendance').then((res) => {
      setAttendanceList(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.map((entry, idx) => (
            <tr key={idx}>
              <td>{entry.employeeName}</td>
              <td>{entry.date}</td>
              <td>{entry.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceManagement;
