import React, { useState } from 'react';
import axios from '../../api/axiosInstance';

const LeaveRequestPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const submitRequest = (e) => {
    e.preventDefault();
    axios
      .post('/employee/leaves', { startDate, endDate, reason })
      .then((res) => {
        setMessage(res.data.message);
        setStartDate('');
        setEndDate('');
        setReason('');
      });
  };

  return (
    <div>
      <h2>Request Leave</h2>
      {message && <p>{message}</p>}
      <form onSubmit={submitRequest}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <textarea
          value={reason}
          placeholder="Reason for leave"
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LeaveRequestPage;
