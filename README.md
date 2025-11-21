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
* [Screenshots](#screenshots)
* [API Endpoints](#api-endpoints)
* [Contributing](#contributing)

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

Built ❤️ by ***Ayenew Girmay*** and ***Mulusew Desale***
