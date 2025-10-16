import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'patient', specialization:'', phone:'' });
  const nav = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    const res = await fetch('http://localhost:5001/api/auth/register', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      nav('/dashboard');
    } else {
      alert(data.msg || 'Error');
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className='card'>
        <input required placeholder='Name' value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /><br/>
        <input required placeholder='Email' value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /><br/>
        <input required placeholder='Password' type='password' value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /><br/>
        <label>Role:
          <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
            <option value='patient'>Patient</option>
            <option value='doctor'>Doctor</option>    
          </select>
        </label><br/>
        {form.role==='doctor' && <input placeholder='Specialization' value={form.specialization} onChange={e=>setForm({...form,specialization:e.target.value})} />}
        <br/>
        <input placeholder='Phone' value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /><br/>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}
