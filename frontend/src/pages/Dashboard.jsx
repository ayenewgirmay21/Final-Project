// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import PatientDashboard from './PatientDashboard';
import DoctorDashboard from './DoctorDashboard';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:5001/api/users/me', {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(r => r.json())
      .then(setUser)
      .catch(console.error);
  }, []);

  if (!user) return <p>Please login to continue.</p>;

  if (user.role === 'doctor') {
    return <DoctorDashboard user={user} />;
  } else {
    return <PatientDashboard user={user} />;
  }
}
