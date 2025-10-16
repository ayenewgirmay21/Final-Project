import React, { useEffect, useState } from 'react';
import '../styles.css';

export default function Departments(){
  const [depts, setDepts] = useState([]);
  useEffect(()=> {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('http://localhost:5001/api/departments', { headers: { Authorization: 'Bearer '+token } })
      .then(r=>r.json()).then(data=>{
        if (Array.isArray(data)) setDepts(data);
      }).catch(()=>{});
  }, []);
  return (
    <div>
      <h2>Departments</h2>
      <div className='card'>
        <ul>
          {depts.map(d=> <li key={d._id}><strong>{d.name}</strong> — {d.location} — {d.contactPhone}</li>)}
        </ul>
      </div>
    </div>
  );
}
