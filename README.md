# MediServe Hospital Management & Appointment System

![MediServe Logo](https://github.com/ayenewgirmay21/Final-Project/blob/a632570ecef50fda35410eb7a526ea0a90b2c041/frontend/public/logo.png)

**Live Demo:** [https://mediserve-frontend-final-project.vercel.app](https://mediserve-frontend-final-project.vercel.app/)

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Installation & Setup](#installation--setup)
* [Usage](#usage)
* [API Endpoints](#api-endpoints)

---

## Overview

**MediServe** is a full-stack Hospital Management and Appointment System built with the **MERN stack**.
This platform allows hospital staff, doctors, and patients to efficiently manage appointments, doctor availability, and patient records in a secure and organized manner.

The system is **live** and accessible via vercel at: [https://mediserve-frontend-final-project.vercel.app](https://mediserve-frontend-final-project.vercel.app/)
---

The system Admin Dashboard is **live** and accessible via vercel at: [https://mediserve-dashboard-final-project.vercel.app](https://mediserve-dashboard-final-project.vercel.app/)
---

## Features

* **Patient Management**: Register, view, and update patient profiles.
* **Doctor Management**: Add, edit, or remove doctors from the system.
* **Appointment Scheduling**: Patients can book appointments online.
* **Admin Dashboard**: Centralized view for managing doctors, patients, and appointments.
* **Messaging System**: Communication between doctors and patients.
* **Authentication**: Secure login and registration for different user roles (Admin, Doctor, Patient).
* **Responsive Design**: Works on desktop, tablet, and mobile.

---

## Technologies Used

* **Frontend**: React.js, React Router, Tailwind CSS (or CSS/Bootstrap)
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Authentication**: JWT (JSON Web Tokens), Cookies
* **Deployment**: Render (Frontend & Backend hosted on Render)
* **API Testing**: Postman

---

## Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/ayenewgirmay21/Final-Project.git
cd Final-Project
```

2. **Install dependencies for backend**

```bash
cd backend
npm install
```

3. **Install dependencies for frontend**

```bash
cd ../frontend
npm install
```

4. **Environment Variables**

Create a `.env` file in both backend and frontend as required:

**Backend `.env`**

```
PORT=5000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
```

**Frontend `.env`**

```
VITE_SERVER_URL=https://mern-mediserve.onrender.com/api/v1
```

5. **Run the Application**

```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run dev
```
## Usage

Once the application is running or when accessing the live deployed version, here is how to use MediServe:

🔹 1. Visit the Platform

Open
👉[https://mediserve-frontend-final-project.vercel.app](https://mediserve-frontend-final-project.vercel.app/)

🔹 2. Register / Login

Users can create accounts based on role:

Patient

Admin

(Doctors are added by the Admin.)

🔹 3. Patient Features

Book appointments with available doctors

View appointment history

Send messages to doctors

Update profile information

🔹 4. Admin Features

Add, edit, and delete doctors

View all patient accounts

View and manage all appointments

Access full dashboard analytics

🔹 5. Doctor Features

View their schedule

Manage appointment statuses

Communicate with patients

Update profile details

🔹 6. Navigation

The UI includes:

Top navigation bar

Role-based dashboard

Appointment booking form

Doctor management pages

Message center

🔹 7. Mobile-Friendly

MediServe is fully responsive and works smoothly on:

Smartphones
Tablets
Desktops

---

## API Endpoints

POST /api/v1/auth/register – Register user

POST /api/v1/auth/login – Login user

GET /api/v1/doctors – Fetch all doctors

POST /api/v1/appointments – Create new appointment

GET /api/v1/patients – Fetch all patients (Admin only)

For full API documentation, use Postman or Swagger.
---
Built ❤️ by ***Ayenew Girmay*** and ***Mulusew Desale***






