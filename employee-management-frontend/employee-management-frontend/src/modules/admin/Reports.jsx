import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';

const Reports = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    axios.get('/admin/reports/summary').then((res) => {
      setReport(res.data);
    });
  }, []);

  return (
    <div>
      <h2>System Report</h2>
      {report ? (
        <ul>
          <li>Total Employees: {report.totalEmployees}</li>
          <li>Total Leaves This Month: {report.totalLeaves}</li>
          <li>Total Attendance Entries: {report.attendanceCount}</li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Reports;
