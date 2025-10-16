# MediServe - MERN Starter

## What you got
- Backend: Express, MongoDB, JWT auth
- Frontend: React (Vite), simple pages: Register, Login, Dashboard
- Basic models: User, Appointment, Record
- Sample endpoints:
  - POST /api/auth/register
  - POST /api/auth/login
  - GET /api/users/me
  - POST /api/appointments/book
  - GET /api/appointments
  - PATCH /api/appointments/:id/status
  - POST /api/records/:patientId
  - GET /api/records/:patientId

## Run locally

### Backend
1. cd backend
2. npm install
3. copy .env.sample to .env and set MONGO_URI & JWT_SECRET
4. npm run dev

### Frontend
1. cd frontend
2. npm install
3. npm run dev

Backend runs by default on http://localhost:5000 and frontend on http://localhost:5173

This is a starter; expand UI, validation, error handling, and production deployment as needed.

## Added features
- Departments (Pharmacy, Laboratory, Emergency, Medical Ward, Surgical Ward) via /api/departments
- Basic Payments system via /api/payments (create, list, update status)

Note: Department entries should be created by an admin user. Payments are created by patients; gateway integration is left as next step.
