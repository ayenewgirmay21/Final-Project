const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Book appointment (patient)
router.post('/book', auth, async (req, res) => {
  try {
    const { doctorId, date, reason } = req.body;
    if (!doctorId || !date) return res.status(400).json({ msg: 'doctorId and date are required' });
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') return res.status(400).json({ msg: 'Invalid doctor' });

    const appointment = new Appointment({
      patient: req.user.id,
      doctor: doctorId,
      date,
      reason
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get appointments for current user (patient or doctor)
router.get('/', auth, async (req, res) => {
  try {
    const user = req.currentUser;
    const filter = (user.role === 'doctor') ? { doctor: user._id } : { patient: user._id };
    const appts = await Appointment.find(filter).populate('doctor','name specialization').populate('patient','name email');
    res.json(appts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update appointment status (doctor/admin)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const appt = await Appointment.findById(id);
    if (!appt) return res.status(404).json({ msg: 'Appointment not found' });
    const user = req.currentUser;
    if (user.role === 'patient') return res.status(403).json({ msg: 'Forbidden' });
    // doctors can only update their own appointments
    if (user.role === 'doctor' && String(appt.doctor) !== String(user._id)) return res.status(403).json({ msg: 'Forbidden' });
    appt.status = status;
    await appt.save();
    res.json(appt);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
