import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import App from './pages/App'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Pharmacy from './pages/Pharmacy'
import Laboratory from './pages/Laboratory'
import Payments from './pages/Payments'
import Departments from './pages/Departments'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
                <Route path='/departments' element={<Departments/>} />
                <Route path='/pharmacy' element={<Pharmacy/>} />
                <Route path='/laboratory' element={<Laboratory/>} />
                <Route path='/payments' element={<Payments/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
