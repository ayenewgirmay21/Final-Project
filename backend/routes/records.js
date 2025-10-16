const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Record = require('../models/Record');
const User = require('../models/User');

// Doctor creates a medical record for a patient
router.post('/:patientId', auth, async (req, res) => {
  try {
    if (req.currentUser.role !== 'doctor') return res.status(403).json({ msg: 'Forbidden' });
    const { patientId } = req.params;
    const { diagnosis, prescription, notes } = req.body;
    const record = new Record({
      patient: patientId,
      doctor: req.currentUser._id,
      diagnosis, prescription, notes
    });
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get patient records (patient or doctor)
router.get('/:patientId', auth, async (req, res) => {
  try {
    const { patientId } = req.params;
    const user = req.currentUser;
    if (user.role === 'patient' && String(user._id) !== String(patientId)) return res.status(403).json({ msg: 'Forbidden' });
    // doctors can view any patient
    const records = await Record.find({ patient: patientId }).populate('doctor','name');
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
