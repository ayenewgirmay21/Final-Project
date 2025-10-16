// src/pages/PatientDashboard.jsx
import React, { useEffect, useState } from 'react';
import DepartmentSelect from '../components/DepartmentSelect';
import DoctorSelect from '../components/DoctorSelect';

export default function PatientDashboard({ user }) {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ departmentId: '', doctorId: '', date: '', reason: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    // Load doctors
    fetch('http://localhost:5001/api/users', {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(r => r.json())
      .then(data => setDoctors(data.filter(u => u.role === 'doctor')))
      .catch(console.error);

    // Load patient appointments
    fetch('http://localhost:5001/api/appointments/my', {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(r => r.json())
      .then(setAppointments)
      .catch(console.error);
  }, []);

  async function handleBook(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:5001/api/appointments/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (res.ok) {
      setAppointments(prev => [data, ...prev]);
      alert('Appointment booked successfully');
      setForm({ departmentId: '', doctorId: '', date: '', reason: '' });
    } else {
      alert(data.msg || 'Booking failed');
    }
  }

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <div className="card">
        <h3>Book Appointment</h3>
        <form onSubmit={handleBook}>
          <DepartmentSelect
            value={form.departmentId}
            onChange={e => setForm({ ...form, departmentId: e.target.value })}
          /><br />
          <DoctorSelect
            doctors={doctors}
            value={form.doctorId}
            onChange={e => setForm({ ...form, doctorId: e.target.value })}
          /><br />
          <input
            required
            type="datetime-local"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
          /><br />
          <input
            placeholder="Reason"
            value={form.reason}
            onChange={e => setForm({ ...form, reason: e.target.value })}
          /><br />
          <button type="submit">Book</button>
        </form>
      </div>

      <div className="card">
        <h3>Your Appointments</h3>
        {appointments.length === 0 && <p>No appointments yet.</p>}
        <ul>
          {appointments.map(a => (
            <li key={a._id}>
              <strong>{new Date(a.date).toLocaleString()}</strong> — Dr. {a.doctorName} — Status: {a.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
