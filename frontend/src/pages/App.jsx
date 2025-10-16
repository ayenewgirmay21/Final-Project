import React from 'react'
import { Link } from 'react-router-dom'
import '../styles.css'

export default function App(){
  return (
    <div>
      <h1>MediServe</h1>
      <p>Hospital Management & Appointment System</p>
      <div style={{display:'flex', gap:12}}>
        <Link to='/login'><button>Login</button></Link>
        <Link to='/register'><button>Register</button></Link>
        <Link to='/dashboard'><button>Dashboard</button></Link>
                <Link to='/departments'><button>Departments</button></Link>
                <Link to='/pharmacy'><button>Pharmacy</button></Link>
                <Link to='/laboratory'><button>Laboratory</button></Link>
                <Link to='/payments'><button>Payments</button></Link>
      </div>
    </div>
  )
}
