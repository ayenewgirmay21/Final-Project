// src/pages/DoctorDashboard.jsx
import React, { useEffect, useState } from 'react';

export default function DoctorDashboard({ user }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5001/api/appointments/doctor', {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(r => r.json())
      .then(setAppointments)
      .catch(console.error);
  }, []);

  async function handleStatusChange(id, status) {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5001/api/appointments/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({ status })
    });

    if (res.ok) {
      setAppointments(prev =>
        prev.map(a => (a._id === id ? { ...a, status } : a))
      );
    }
  }

  return (
    <div>
      <h2>Welcome, Dr. {user.name}</h2>
      <div className="card">
        <h3>My Appointments</h3>
        {appointments.length === 0 && <p>No appointments yet.</p>}
        <ul>
          {appointments.map(a => (
            <li key={a._id}>
              <strong>{new Date(a.date).toLocaleString()}</strong> — Patient: {a.patientName} — Status: {a.status}
              {a.status === 'pending' && (
                <>
                  <button onClick={() => handleStatusChange(a._id, 'confirmed')}>Confirm</button>
                  <button onClick={() => handleStatusChange(a._id, 'rejected')}>Reject</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
