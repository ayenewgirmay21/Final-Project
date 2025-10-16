import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const [isHuman, setIsHuman] = useState(false);
  const nav = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();

    if (!isHuman) {
      alert("Please confirm you're not a robot!");
      return;
    }

    const res = await fetch('http://localhost:5001/api/auth/login', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      nav('/dashboard');
    } else {
      alert(data.msg || 'Login failed');
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='card'>
        <input 
          required 
          placeholder='Email' 
          value={form.email} 
          onChange={e=>setForm({...form,email:e.target.value})} 
        /><br/>

        <input 
          required 
          placeholder='Password' 
          type='password' 
          value={form.password} 
          onChange={e=>setForm({...form,password:e.target.value})} 
        /><br/>

        <label>
          <input 
            type="checkbox" 
            checked={isHuman} 
            onChange={e => setIsHuman(e.target.checked)} 
          /> I’m not a robot
        </label><br/>

        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
