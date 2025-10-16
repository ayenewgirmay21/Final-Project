import React, { useState, useEffect } from 'react';
import '../styles.css';

export default function Payments(){
  const [form, setForm] = useState({ amount:0, method:'cash', items:[] });
  const [payments, setPayments] = useState([]);

  useEffect(()=> {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('http://localhost:5001/api/payments', { headers: { Authorization: 'Bearer '+token } })
      .then(r=>r.json()).then(data=>{
        if (Array.isArray(data)) setPayments(data);
      }).catch(()=>{});
  }, []);

  async function handlePay(e){
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('login first');
    const res = await fetch('http://localhost:5001/api/payments', {
      method:'POST',
      headers: { 'Content-Type':'application/json', Authorization: 'Bearer '+token },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok) {
      setPayments(prev=>[data,...prev]);
      alert('Payment created (status: pending)');
    } else {
      alert(data.msg || 'Error creating payment');
    }
  }

  return (
    <div>
      <h2>Payments</h2>
      <div className='card'>
        <h3>Make a Payment</h3>
        <form onSubmit={handlePay}>
          <input type='number' required placeholder='Amount' value={form.amount} onChange={e=>setForm({...form,amount: Number(e.target.value)})} /><br/>
          <label>Method:
            <select value={form.method} onChange={e=>setForm({...form,method:e.target.value})}>
              <option value='cash'>Cash</option>
              <option value='card'>Card</option>
              <option value='mobile_money'>Mobile Money</option>
              <option value='insurance'>Insurance</option>
            </select>
          </label><br/>
          <button type='submit'>Create Payment</button>
        </form>
      </div>

      <div className='card'>
        <h3>Your Payments</h3>
        <ul>
          {payments.map(p=>(
            <li key={p._id}>{p.amount} — {p.method} — {p.status}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
