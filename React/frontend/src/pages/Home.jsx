import React from 'react';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <marquee>Welcome to the Employee Attendance Management System</marquee>
      <main className="container">
        <section className="card">
          <h2>Welcome</h2>
          <p>A smart and secure platform for seamless employee attendance management.
It enables quick check-ins/check-outs with camera verification, easy leave requests, and real-time tracking.
Admins can monitor records, manage employee data, and generate instant reports, ensuring accuracy, transparency, and productivity.</p>
        </section>
      </main>
    </>
  );
}






