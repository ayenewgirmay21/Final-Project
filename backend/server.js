require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// DB
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mediserve';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err.message));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/records', require('./routes/records'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/payments', require('./routes/payments'));

app.get('/', (req, res) => res.send({ message: 'MediServe backend running' }));

app.listen(port, () => console.log(`Server running on port ${port}`));
