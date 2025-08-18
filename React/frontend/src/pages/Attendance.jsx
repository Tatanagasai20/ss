import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import WebcamCapture from '../components/WebcamCapture';
import api from '../services/axiosInstance';
import { useAuth } from '../context/AuthContext';

export default function Attendance() {
  const { user } = useAuth();
  const [photo, setPhoto] = useState(null);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const doAction = async (type) => {
    if (!photo) return setError('Please capture a photo first');
    setError('');
    setMsg('');
    setLoading(true);
    try {
      const endpoint = type === 'checkin' ? `/employee/${user.empId}/checkin` : `/employee/${user.empId}/checkout`;
      await api.post(endpoint, { photo });
      setMsg(`Successfully ${type === 'checkin' ? 'checked in' : 'checked out'}`);
      setPhoto(null);
    // in Attendance.jsx, inside doAction try/catch:
    } catch (err) {
      const apiMsg = err?.response?.data?.message;
      const score = err?.response?.data?.score;
      setError(score != null ? `${apiMsg} (score: ${Math.round(score*100)}%)` : (apiMsg || 'Failed to submit'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container">
        <section className="card">
          <h2>Attendance – Check In / Check Out</h2>
          <WebcamCapture onCapture={setPhoto} />
          <div className="actions">
            <button className="btn" onClick={() => doAction('checkin')} disabled={loading}>Check In</button>
            <button className="btn btn-secondary" onClick={() => doAction('checkout')} disabled={loading}>Check Out</button>
          </div>
          {msg && <div className="success">{msg}</div>}
          {error && <div className="error">{error}</div>}
        </section>
      </main>
    </>
  );
}
